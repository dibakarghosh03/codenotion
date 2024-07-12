import React, { useEffect, useState, useRef } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation"

import "../../../utils/CustomCss.css"

// import "../../.."
// Import required modules
import { Autoplay, FreeMode, Pagination, Navigation } from "swiper/modules"


// import { getAllCourses } from "../../services/operations/courseDetailsAPI"
import Course_Card from "./Course_Card"

function Course_Slider({ Courses }) {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumVelocityRatio: 1
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          navigation={true}
          modules={[ Autoplay, Pagination, Navigation, FreeMode ]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"max-h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default Course_Slider
