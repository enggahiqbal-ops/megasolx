type Props = {
  videoId: string;
  start?: number;
  end?: number;
  className?: string;
  id?: string;
};

/**
 * Muted, looping YouTube background clip — replaces the jQuery YouTube-API
 * driven `.project-video-bg` / `.service-video-bg` / `.cta-highlight-video`
 * elements from the original template with a plain iframe embed.
 */
export default function VideoBackground({ videoId, start, end, className, id }: Props) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: videoId,
    controls: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (start) params.set("start", String(start));
  if (end) params.set("end", String(end));

  return (
    <div id={id} className={className}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
        title="Background video"
        allow="autoplay; encrypted-media"
        style={{ width: "100%", height: "100%", border: 0, pointerEvents: "none" }}
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}
