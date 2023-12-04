import { Carousel } from "antd";
import React from "react";
import slide1 from "./../assets/images/banner/slide1.webp";
import slide1mb from "./../assets/images/banner/slide1_mb.webp";
import slide2 from "./../assets/images/banner/slide2.webp";
import slide2mb from "./../assets/images/banner/slide2_mb.jpg";

export default function Banner() {
  return (
    <Carousel autoplay>
      <div className="bannerItem">
        <picture style={{ width: "100%", height: "100%", objectFit: "cover" }}>
          <source media="(max-width: 767px)" srcSet={slide1mb} />
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={slide1}
            alt="s1"
          />
        </picture>
      </div>
      <div className="bannerItem">
        <picture>
          <source media="(max-width: 767px)" srcSet={slide2mb} />
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={slide2}
            alt="s2"
          />
        </picture>
      </div>
    </Carousel>
  );
}
