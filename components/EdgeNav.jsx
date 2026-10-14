"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Shown on hover/focus for mouse users; [@media(hover:hover)] keeps a tap on touch screens
// from leaving the hover state stuck on
const onHover = "opacity-0 transition-opacity duration-200 [@media(hover:hover)]:group-hover/edge:opacity-100 group-focus-visible/edge:opacity-100";

// Full-height click zone along one side of an image. Hovering it darkens that side and
// reveals the arrow; touch screens (no hover) always show the arrow but not the overlay.
const EdgeNav = ({ side, label, onClick }) => {
  const left = side === "left";
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`group/edge absolute inset-y-0 ${left ? "left-0 justify-start" : "right-0 justify-end"} z-10 w-1/5 flex items-center px-4 focus-visible:outline-none`}
    >
      <span aria-hidden="true" className={`absolute inset-0 ${left ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-black/60 to-transparent ${onHover}`} />
      <span aria-hidden="true" className={`relative w-11 h-11 rounded-full bg-accent text-primary text-2xl flex justify-center items-center ${onHover} [@media(hover:none)]:opacity-100`}>
        {left ? <FiChevronLeft /> : <FiChevronRight />}
      </span>
    </button>
  );
};

export default EdgeNav;
