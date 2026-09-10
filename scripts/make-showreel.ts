/**
 * Builds a real showreel video from the seeded project images (Ken Burns pans +
 * cross-dissolves), uploads it to Sanity, and sets it as siteSettings.showreelVideo.
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

const CLIP = 3.4; // seconds per image
const XF = 0.8; // cross-dissolve length
const FPS = 24;
const STEP = CLIP - XF;
const TRANSITIONS = [
  "fade",
  "wipeleft",
  "slideup",
  "smoothright",
  "fade",
  "wipeup",
  "slidedown",
  "fade",
];

async function download(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  console.log("Collecting project images…");
  const projects: { title: string; url: string }[] = await client.fetch(
    `*[_type == "project" && defined(image)]|order(order asc){ title, "url": image.asset->url }`,
  );
  if (projects.length < 3) {
    console.error("Need at least 3 projects with images. Run `npm run seed:dummy` first.");
    process.exit(1);
  }
  const imgs = projects.slice(0, 8);
  console.log(`  ${imgs.length} images: ${imgs.map((p) => p.title).join(", ")}`);

  const dir = await mkdtemp(join(tmpdir(), "showreel-"));
  const files: string[] = [];
  for (const [i, p] of imgs.entries()) {
    const f = join(dir, `${i}.jpg`);
    await writeFile(f, await download(p.url));
    files.push(f);
  }

  const total = CLIP + (imgs.length - 1) * STEP;

  // Per-image: fill 16:9, then a slow zoom with a gentle drift.
  const chains = files.map((_, i) => {
    const zoomIn = i % 2 === 0;
    const z = zoomIn
      ? `min(zoom+0.0009,1.15)`
      : `if(lte(zoom,1.0),1.15,max(zoom-0.0009,1.0))`;
    const drift = i % 2 === 0 ? `+sin(on/40)*36` : `-sin(on/40)*36`;
    return (
      `[${i}:v]scale=2560:1440:force_original_aspect_ratio=increase,` +
      `crop=2560:1440,setsar=1,` +
      `zoompan=z='${z}':x='iw/2-(iw/zoom/2)${drift}':y='ih/2-(ih/zoom/2)':` +
      `d=${Math.round(CLIP * FPS)}:fps=${FPS}:s=1920x1080[c${i}]`
    );
  });

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
    ...chains,
    ...xfades,
    `[pre]fade=t=in:st=0:d=0.6,fade=t=out:st=${(total - 0.6).toFixed(3)}:d=0.6,` +
      `format=yuv420p[vout]`,
  ].join(";");

  const out = join(dir, "showreel.mp4");
  const args: string[] = [];
  for (const f of files) args.push("-framerate", String(FPS), "-loop", "1", "-t", String(CLIP), "-i", f);
  args.push(
    "-filter_complex", filter,
    "-map", "[vout]",
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "21",
    "-pix_fmt", "yuv420p",
    "-r", String(FPS),
    "-movflags", "+faststart",
    "-an",
    "-y", out,
  );

  console.log(`Rendering ${total.toFixed(1)}s reel with ffmpeg…`);
  await run(ffmpegPath as string, args, { maxBuffer: 1 << 26 });

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

  console.log("Done. siteSettings.showreelVideo now points at the new reel.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
