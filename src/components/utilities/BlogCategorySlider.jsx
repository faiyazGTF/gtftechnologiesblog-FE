"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Card from "./Card";

const BlogCategorySlider = ({ data, catSlug }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="inner-sec-owl box-multiple">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={false}
        pagination={false}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 1,
          },
          560: {
            slidesPerView: 1,
          },
          760: {
            slidesPerView: 1,
          },
          990: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 3,
          },
          1500: {
            slidesPerView: 3,
          },
        }}
        className="owl-carousel1 box-multiple"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="item">
              <div className="box drop-shad">
                <Card data={item} catSlug={catSlug} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogCategorySlider;
