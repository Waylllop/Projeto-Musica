import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { song } from "../../common/interfices";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";
import { Play } from "@phosphor-icons/react";
import usePlayingSong from "../../Hooks/UsePlayingSong";
import useSong from "../../Hooks/UseSongContext";
import BarAnimation from "../Util/BarAnimation";

interface CarouselProps {
  songs: song[];
  setActiveSong: React.Dispatch<React.SetStateAction<song | null>>;
}

const Carousel = ({ songs, setActiveSong }: CarouselProps) => {
  const { playingSong, songStates, setSongStates } = usePlayingSong();
  const { setSong } = useSong();
  const [showPlayIcon, setShowPlayIcon] = useState(false);

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
      {songs.slice(0, 5).map((song: song) => (
        <SwiperSlide key={song.id}>
          {({ isActive }) => (
            <div>
              {isActive ? (
                <div
                  onClick={() => {
                    setSong(song);
                    setSongStates((prevState) => ({
                      ...prevState,
                      playing: !songStates.playing,
                    }));
                  }}
                  className="cursor-pointer flex items-center justify-center relative"
                  onMouseMove={() => setShowPlayIcon(true)}
                  onMouseLeave={() => setShowPlayIcon(false)}
                >
                  <img
                    src={song.artworkUrl}
                    alt={song.title}
                    className="rounded-[48px] h-[400px] w-[400px] brightness-100 duration-1000 object-cover"
                  />
                  {playingSong.id === song.id && songStates.playing ? (
                    <BarAnimation bgSize="44" barSize="24" />
                  ) : showPlayIcon ? (
                    <div className="w-44 h-44 absolute flex justify-center items-center bg-light rounded-full opacity-90 pr-1">
                      <Play size={100} className="text-dark" weight="fill" />
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
