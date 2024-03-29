import { useEffect, useState } from "react";
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 1024) {
      setShowPlayIcon(true);
    }
  }, [windowWidth]);

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
                    className="rounded-[48px] brightness-100 duration-1000 object-cover "
                  />
                  {playingSong.id === song.id && songStates.playing ? (
                    <BarAnimation
                      bgSize="w-24 h-24 md:w-32 md:h-32 lg:w-44 lg:h-44"
                      barSize=" w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24"
                    />
                  ) : showPlayIcon ? (
                    <div className="w-24 h-24 md:w-32 md:h-32 lg:w-44 lg:h-44 absolute flex justify-center items-center bg-light rounded-full opacity-90 pr-1">
                      <Play className="text-dark w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" weight="fill" />
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className=" flex items-center">
                  <img
                    src={song.artworkUrl}
                    alt={song.title}
                    className="rounded-[48px] brightness-50 duration-500 object-cover"
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
