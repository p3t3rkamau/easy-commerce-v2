"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { homeBanners } from "../../constants";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

export default function Banner() {
  return (
    <Swiper
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      style={{
        marginTop: "40px",
        marginLeft: "0px",
      }}
      modules={[Pagination, Autoplay]}
      loop
      autoplay={{ delay: 4000 }}
    >
      {homeBanners.map((item, i) => {
        return (
          <SwiperSlide key={i}>
            <Image
              alt={item}
              src={`/assets/images/${item}`}
              width={1300}
              height={1300}
              className="w-full h-auto object-contain"
              priority
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
