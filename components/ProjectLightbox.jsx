"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import EdgeNav from "@/components/EdgeNav";

// Popup view of a project's screens. `shot`/`onShotChange` are shared with the page's slider
// and thumbnails, so stepping through screens here keeps the page in sync.
// Radix Dialog handles the focus trap, Escape, outside clicks, and returning focus to the trigger.
// `onTriggerClick` may call preventDefault() to cancel opening (e.g. when the click ended a drag).
const ProjectLightbox = ({ title, screens, shot, onShotChange, triggerClassName, onTriggerClick, children }) => {
  const many = screens.length > 1;
  const current = screens[shot];
  const step = (by) => onShotChange((shot + by + screens.length) % screens.length);

  const handleKeyDown = (e) => {
    if (!many) return;
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger aria-label="View full screen" onClick={onTriggerClick} className={triggerClassName}>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        {/* Content sits inside the overlay so a click on the dimmed area closes the popup */}
        <Dialog.Overlay className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/80 backdrop-blur-sm motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:fade-in-0 motion-safe:data-[state=open]:duration-200">
          {/* Same 4:3 shape as the screenshots, as large as the viewport allows (2rem = overlay padding),
              so the image fills the popup edge to edge */}
          <Dialog.Content
            aria-describedby={undefined}
            onKeyDown={handleKeyDown}
            className="relative w-[min(100%,calc((100dvh-2rem)*4/3))] rounded-2xl overflow-hidden bg-[#232329] shadow-2xl focus:outline-none motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:zoom-in-95 motion-safe:data-[state=open]:duration-200"
          >
            {/* Title bar: above the image on phones, overlaid on its top edge from sm up (z-20 keeps Close above the edge zones) */}
            <div className="sm:absolute sm:inset-x-0 sm:top-0 z-20 flex items-center justify-between gap-4 p-4 sm:bg-gradient-to-b from-black/70 to-transparent sm:pointer-events-none">
              <Dialog.Title aria-live="polite" className="text-white">
                {title}: <span className="text-accent">{current.label}</span>
                {many && <span className="text-white/60"> ({shot + 1}/{screens.length})</span>}
              </Dialog.Title>
              <Dialog.Close aria-label="Close" className="pointer-events-auto w-11 h-11 rounded-full bg-black/40 hover:bg-accent hover:text-primary text-white text-2xl flex justify-center items-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <FiX />
              </Dialog.Close>
            </div>
            <div className="relative w-full aspect-[4/3]">
              <Image key={current.image} src={current.image} fill sizes="100vw" className="object-contain select-none motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200" alt={`${title}: ${current.label}`} />
              {many && <EdgeNav side="left" label="Previous screen" onClick={() => step(-1)} />}
              {many && <EdgeNav side="right" label="Next screen" onClick={() => step(1)} />}
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProjectLightbox;
