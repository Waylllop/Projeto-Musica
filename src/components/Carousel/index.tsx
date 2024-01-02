import { Swiper, SwiperSlide } from "swiper/react";
import { useContext, useState } from "react";
import { SongContext } from "../../context/SongContext";
import { PlayCircle } from "@phosphor-icons/react";

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
  const [showIcon, setShowIcon] = useState(false);
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSong must be used within a SongProvider");
  }
  const { setSong } = context;

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
                <div
                  onClick={() => setSong(song)}
                  className="cursor-pointer flex items-center justify-center relative"
                  onMouseEnter={() => setShowIcon(true)}
                  onMouseLeave={() => setShowIcon(false)}
                >
                  <img
                    src={song.artworkUrl}
                    alt={song.title}
                    className="rounded-[48px] h-[400px] w-[400px] brightness-100 duration-1000 object-cover"
                  />
                  {showIcon ? (
                    <div className="absolute bg-light rounded-full opacity-90">
                      <PlayCircle size={200} className="text-primary" />
                    </div>
                  ) : null}
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
