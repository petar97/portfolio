"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { FiMaximize2 } from "react-icons/fi";
import ProjectLightbox from "@/components/ProjectLightbox";
import EdgeNav from "@/components/EdgeNav";

// One project's screens: a swipeable/draggable slider with click zones on the edges
// (previous/next screen), the rest of the image opening the popup viewer, and thumbnails below.
// `shot` is owned by the page so the slider, thumbnails and popup stay in sync.
const ProjectGallery = ({ title, screens, shot, onShotChange }) => {
  const [swiper, setSwiper] = useState(null);
  const many = screens.length > 1;

  // Thumbnails and the popup change `shot` directly; move the slider to match
  useEffect(() => {
    if (swiper && !swiper.destroyed && swiper.activeIndex !== shot) swiper.slideTo(shot);
  }, [swiper, shot]);

  // A mouse drag ends with a click on whatever is under the pointer; Swiper clears allowClick when that happens
  const isRealClick = () => !swiper || swiper.allowClick;

  return (
    <div>
      {/* The overlay zones below are buttons: listen on the whole container and drop "button" from
          Swiper's focusable list, otherwise a drag that starts on a zone never moves the slider */}
      <Swiper touchEventsTarget="container" focusableElements="input, select, option, textarea, video, label" onSwiper={setSwiper} onSlideChange={(s) => onShotChange(s.activeIndex)} spaceBetween={30} slidesPerView={1} className="rounded-2xl">
        {screens.map((screen) => (
          <SwiperSlide key={screen.image}>
            {/* bg matches the composites' base color so letterboxing is invisible */}
            <div className="relative w-full aspect-[4/3] bg-[#232329]">
              <Image src={screen.image} fill sizes="(max-width: 1280px) 100vw, 50vw" className="object-contain select-none" alt={`${title}: ${screen.label}`} />
            </div>
          </SwiperSlide>
        ))}

        <ProjectLightbox
          title={title}
          screens={screens}
          shot={shot}
          onShotChange={onShotChange}
          onTriggerClick={(e) => !isRealClick() && e.preventDefault()}
          triggerClassName="group/zoom absolute inset-0 z-[5] cursor-zoom-in focus-visible:outline-none"
        >
          <span className={`absolute w-11 h-11 rounded-full bg-primary/70 text-white text-xl flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [@media(hover:none)]:top-4 [@media(hover:none)]:left-auto [@media(hover:none)]:right-4 [@media(hover:none)]:translate-x-0 [@media(hover:none)]:translate-y-0 opacity-0 transition-opacity duration-200 [@media(hover:hover)]:group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100 [@media(hover:none)]:opacity-100`}>
            <FiMaximize2 />
          </span>
        </ProjectLightbox>

        {many && shot > 0 && <EdgeNav side="left" label="Previous screen" onClick={() => isRealClick() && swiper?.slidePrev()} />}
        {many && shot < screens.length - 1 && <EdgeNav side="right" label="Next screen" onClick={() => isRealClick() && swiper?.slideNext()} />}
      </Swiper>

      {many && (
        <div role="group" className="mt-4 grid grid-flow-col auto-cols-fr gap-3" aria-label={`${title} screens`}>
          {screens.map((screen, i) => (
            <button
              key={screen.image}
              type="button"
              onClick={() => onShotChange(i)}
              aria-pressed={i === shot}
              className={`group flex flex-col gap-2 text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${i === shot ? "text-accent" : "text-white/60 hover:text-white"}`}
            >
              <span className={`relative block w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#232329] ring-2 transition-shadow duration-200 ${i === shot ? "ring-accent" : "ring-transparent group-hover:ring-white/20"}`}>
                <Image src={screen.image} fill sizes="160px" className="object-cover" alt="" />
              </span>
              <span className="text-xs leading-tight">{screen.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
