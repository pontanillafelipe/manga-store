import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import { Pagination, Autoplay, Keyboard } from "swiper/modules";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";

import MangaCard from "./MangaCard";

import "./MangaCarousel.css";

function MangaCarousel({ title, mangas, link }) {
  const swiperRef = useRef(null);

  return (
    <section className="carousel-section">
      <div className="carousel-header">
        <h2 className="carousel-title">{title}</h2>

        <Link to={link} className="carousel-link">
          Ver todo →
        </Link>
      </div>

      <div className="carousel-wrapper">
        <button
          className="carousel-prev"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <FaChevronLeft />
        </button>

        <Swiper
          modules={[Pagination, Autoplay, Keyboard]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={mangas.length > 1}
          spaceBetween={10}
          keyboard={{ enabled: true }}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 5,
            },
          }}
        >
          {Array.isArray(mangas) &&
            mangas.map((manga) => (
              <SwiperSlide key={manga.id}>
                <MangaCard manga={manga} />
              </SwiperSlide>
            ))}
        </Swiper>

        <button
          className="carousel-next"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}

export default MangaCarousel;
