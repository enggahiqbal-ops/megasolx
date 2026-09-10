/**
 * Builds the homepage showreel from a handful of free stock video clips
 * (Pexels — free for commercial use), stitched with cross-dissolves, then
 * uploads the result to Sanity and sets siteSettings.showreelVideo.
 *
 * Usage: npm run showreel   (needs SANITY_API_WRITE_TOKEN; ffmpeg from ffmpeg-static)
 */
import { execFile } from "node:child_process";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

import { createClient } from "@sanity/client";
import ffmpegPath from "ffmpeg-static";

const run = promisify(execFile);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID / SANITY_API_WRITE_TOKEN");
  process.exit(1);
}
if (!ffmpegPath) {
  console.error("ffmpeg-static binary not found — run `npm i`");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const CLIP = 4.2; // seconds shown per source clip
const XF = 0.8; // cross-dissolve length
const FPS = 30;
const STEP = CLIP - XF;

// Curated stock clips (Pexels — https://www.pexels.com/license/, free to use).
const CLIPS = [
  { id: 3129671, start: 3, note: "abstract network / plexus" },
  { id: 2278095, start: 8, note: "code editor" },
  { id: 4990243, start: 1, note: "light-ring motion graphic" },
  { id: 3130284, start: 5, note: "digital data streams" },
  { id: 1093662, start: 1, note: "ocean waves at sunset" },
  { id: 2865146, start: 2, note: "sky / clouds timelapse" },
];

async function downloadTo(url: string, dest: string) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": UA },
        redirect: "follow",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await writeFile(dest, Buffer.from(await res.arrayBuffer()));
      return;
    } catch (err) {
      if (attempt === 3) throw err;
      await new Promise((r) => setTimeout(r, attempt * 1000));
    }
  }
}

async function main() {
  const dir = await mkdtemp(join(tmpdir(), "showreel-"));

  console.log(`Downloading ${CLIPS.length} stock clips…`);
  const files: string[] = [];
  for (const c of CLIPS) {
    const f = join(dir, `${c.id}.mp4`);
    await downloadTo(`https://www.pexels.com/download/video/${c.id}/`, f);
    files.push(f);
    console.log(`  ${c.id} — ${c.note}`);
  }

  const total = CLIP + (files.length - 1) * STEP;

  // Normalise every clip to the same size / fps / format so xfade can chain them.
  const norm = files.map(
    (_, i) =>
      `[${i}:v]scale=1920:1080:force_original_aspect_ratio=increase,` +
      `crop=1920:1080,fps=${FPS},setsar=1,format=yuv420p,setpts=PTS-STARTPTS[c${i}]`,
  );

  const TRANSITIONS = ["fade", "fadeblack", "smoothleft", "fade", "wipeleft", "fade"];
  const xfades: string[] = [];
  let prev = "c0";
  for (let i = 1; i < files.length; i++) {
    const out = i === files.length - 1 ? "pre" : `x${i}`;
    const t = TRANSITIONS[(i - 1) % TRANSITIONS.length];
    xfades.push(
      `[${prev}][c${i}]xfade=transition=${t}:duration=${XF}:offset=${(i * STEP).toFixed(3)}[${out}]`,
    );
    prev = out;
  }

  const filter = [
    ...norm,
    ...xfades,
    `[pre]fade=t=in:st=0:d=0.6,fade=t=out:st=${(total - 0.6).toFixed(3)}:d=0.6[vout]`,
  ].join(";");

  const out = join(dir, "showreel.mp4");
  const args: string[] = [];
  for (const [i, f] of files.entries()) {
    args.push("-ss", String(CLIPS[i].start), "-t", String(CLIP), "-i", f);
  }
  args.push(
    "-filter_complex", filter,
    "-map", "[vout]",
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "22",
    "-pix_fmt", "yuv420p",
    "-r", String(FPS),
    "-movflags", "+faststart",
    "-an",
    "-y", out,
  );

  console.log(`Rendering ${total.toFixed(1)}s reel…`);
  await run(ffmpegPath as string, args, { maxBuffer: 1 << 27 });

  const mp4 = await readFile(out);
  console.log(`  rendered ${(mp4.length / 1e6).toFixed(1)} MB`);

  console.log("Uploading to Sanity…");
  const asset = await client.assets.upload("file", mp4, {
    filename: "megasolx-showreel.mp4",
    contentType: "video/mp4",
  });
  await client
    .patch("siteSettings")
    .set({
      showreelVideo: {
        _type: "file",
        asset: { _type: "reference", _ref: asset._id },
      },
    })
    .commit();

  console.log("Done. siteSettings.showreelVideo updated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
