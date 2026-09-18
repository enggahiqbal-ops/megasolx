"use client";

import type { ReactNode } from "react";
import { useState } from "react";

export type AccordionItem = {
  id: string;
  itemClassName?: string;
  headerClassName?: string;
  buttonLabel: ReactNode;
  children: ReactNode;
};

type Props = {
  id: string;
  items: AccordionItem[];
  defaultOpenId?: string;
};

/** Single-open-at-a-time accordion, replacing Bootstrap's JS-driven collapse with React state. */
export default function Accordion({ id, items, defaultOpenId }: Props) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className="accordion" id={id}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className={`accordion-item ${item.itemClassName ?? ""}`}>
            <h2 className={`accordion-header ${item.headerClassName ?? ""}`}>
              <button
                className={`accordion-button ${isOpen ? "" : "collapsed"}`}
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                {item.buttonLabel}
              </button>
            </h2>
            <div className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}>
              <div className="accordion-body">{item.children}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
