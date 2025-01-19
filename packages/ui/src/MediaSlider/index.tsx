import React, { memo } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Box } from "@mui/material";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "./slides.css";

type MediaSliderProps = {
  images: string[] | null;
  videos: string[] | null;
  sx?: object;
  slidesPerView: number;
  autoplay: boolean | object;
  initialSlide: number;
  pagination: boolean | object;
};

const MediaSlider: React.FC<MediaSliderProps> = memo(
  ({
    images = null,
    videos = null,
    sx,
    slidesPerView = 1,
    autoplay,
    initialSlide = 0,
    pagination,
  }) => {
    return (
      <Box style={sx}>
        <Swiper
          spaceBetween={10}
          slidesPerView={slidesPerView}
          centeredSlides={true}
          autoplay={autoplay}
          pagination={pagination}
          navigation={true}
          autoHeight
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          initialSlide={initialSlide}
        >
          {images &&
            images?.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} />
              </SwiperSlide>
            ))}
          {videos &&
            videos?.map((video, index) => (
              <SwiperSlide key={index}>
                <iframe src={video} allowFullScreen></iframe>
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
    );
  },
);

export default MediaSlider;
