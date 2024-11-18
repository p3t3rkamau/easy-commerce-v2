'use client'

import Image from 'next/image'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { homeBanners } from '../../constants'

import 'swiper/css'
import 'swiper/css/pagination'

export default function Banner() {
  return (
    <Swiper
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      style={{
        marginTop: '40px',
        marginLeft: '0px',
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
              src={`https://ik.imagekit.io/6cga8hi9z/All_Products/hero-1_IO0teecFS1.png`}
              width={1300}
              height={1300}
              className="w-full h-auto object-contain"
              priority
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
