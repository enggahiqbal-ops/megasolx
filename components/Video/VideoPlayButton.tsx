"use client";

import { useState } from "react";

type Props = {
  videoId: string;
};

/**
 * Play button + fullscreen modal, replacing the original template's
 * jQuery-driven `#modal-overlay` / `.request-loader` pattern.
 */
export default function VideoPlayButton({ videoId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="request-loader" type="button" onClick={() => setOpen(true)} aria-label="Play video">
        <i className="fa-solid fa-play" />
      </button>
      {open && (
        <div
          id="modal-overlay"
          className="modal-overlay"
          style={{ display: "flex" }}
          onClick={() => setOpen(false)}
        >
          <span className="my-close" onClick={() => setOpen(false)}>
            <i className="fa-solid fa-xmark" />
          </span>
          <div className="my-modal" onClick={(e) => e.stopPropagation()}>
            <iframe
              id="my-video-frame"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              title="Video Player"
            />
          </div>
        </div>
      )}
    </>
  );
}
