"use client";

import { useState } from "react";

const options = [
  { value: "commercial", label: "Commercial" },
  { value: "short-film", label: "Short Film" },
  { value: "music-video", label: "Music Video" },
  { value: "event", label: "Event" },
  { value: "other", label: "Other" },
];

export default function ProjectTypeSelect() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const selectedLabel = options.find((o) => o.value === selected)?.label ?? "Project Type";

  return (
    <div className={`dropdown-container ${open ? "active" : ""}`}>
      <div className="dropdown-select" onClick={() => setOpen((prev) => !prev)}>
        <div className="d-flex flex-row align-items-center gap-3">
          <span className="selected-text">{selectedLabel}</span>
        </div>
        <i className="fa-solid fa-caret-down" />
      </div>
      <div className="dropdown-list">
        {options.map((option) => (
          <div
            key={option.value}
            className={`dropdown-option ${selected === option.value ? "selected" : ""}`}
            onClick={() => {
              setSelected(option.value);
              setOpen(false);
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
      <input type="hidden" id="project-type" name="project-type" className="dropdown-value" value={selected ?? ""} />
    </div>
  );
}
