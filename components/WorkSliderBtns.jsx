"use client"

import {useSwiper} from "swiper/react";
import {PiCaretLeftBold, PiCaretRightBold} from "react-icons/pi";

const WorkSliderBtns = ({containerStyles, btnStyles}) => {
  const swiper = useSwiper();
  return (
    <div className={containerStyles}>
      <button type="button" aria-label="Previous project" className={btnStyles} onClick={() => swiper.slidePrev()}>
        <PiCaretLeftBold />
      </button>
      <button type="button" aria-label="Next project" className={btnStyles} onClick={() => swiper.slideNext()}>
        <PiCaretRightBold />
      </button>
    </div>
  )
}

export default WorkSliderBtns
