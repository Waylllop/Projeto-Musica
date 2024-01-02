import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";
import { song } from "../../common/interfices";

interface CarouselProps {
  songs: song[];
  setActiveSong: React.Dispatch<React.SetStateAction<song | null>>;
}

const Carousel = ({ songs, setActiveSong }: CarouselProps) => {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 20,
        stretch: 120,
        depth: 400,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[EffectCoverflow, Pagination, Navigation]}
      className="mySwiper"
      onActiveIndexChange={(swiper) => {
        setActiveSong(songs[swiper.activeIndex]);
      }}
    >
      {songs.map((song: song) => (
        <SwiperSlide key={song.id}>
          {({ isActive }) => (
            <div>
              {isActive ? (
                <div className="flex items-center">
                  <img
                    src={song.artworkUrl}
                    alt={song.title}
                    className="rounded-[48px] h-[400px] w-[400px] brightness-100 duration-1000 object-cover"
                  />
                </div>
              ) : (
                <div className=" flex items-center">
                  <img
                    src={song.artworkUrl}
                    alt={song.title}
                    className="rounded-[48px] h-[400px] w-[400px] brightness-50 duration-500 object-cover"
                  />
                </div>
              )}
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
