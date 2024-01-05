import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { DotsThreeOutlineVertical, ShareNetwork } from "@phosphor-icons/react";
import useSong from "../../Hooks/UseSongContext/intex";
import usePlayingSong from "../../Hooks/UsePlayingSong";
import Volume from "./Volume";
import "./style.css";
import Controls from "./Controls";

const Player = () => {
  const { song, setSong, songList } = useSong();
  const { setSongStates, setPlayingSong } = usePlayingSong();
  const player = useRef<ReactPlayer | null>(null);

  const [states, setStates] = useState({
    playing: false,
    seeking: false,
    volumeOpen: false,
    muted: false,
    duration: 0,
    progress: 0,
    played: 0,
    playedSeconds: 0,
    volume: 0.6,
    lastClickTime: 0,
    ended: false,
  });

  const handlePlayPause = () => {
    if (song.title !== "") {
      setStates((prevState) => ({
        ...prevState,
        playing: !prevState.playing,
      }));
    }
  };

  const handleDuration = (duration: number) => {
    setStates((prevState) => ({
      ...prevState,
      duration,
    }));
  };

  // @ts-expect-error expected any
  const handleProgress = (state) => {
    if (!states.seeking) {
      setStates((prevState) => ({
        ...prevState,
        ...state,
      }));
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStates((prevState) => ({
      ...prevState,
      played: parseFloat(e.target.value),
    }));
  };

  const handleSeekMouseDown = () => {
    setStates((prevState) => ({
      ...prevState,
      seeking: true,
    }));
  };

  const handleEnded = () => {
    setStates((prevState) => ({
      ...prevState,
      playing: false,
      ended: true,
    }));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStates((prevState) => ({
      ...prevState,
      volume: parseFloat(e.target.value),
      muted: false,
    }));
  };

  // @ts-expect-error expected any
  const handleSeekMouseUp = (e) => {
    setStates((prevState) => ({
      ...prevState,
      seeking: false,
    }));
    player.current?.seekTo(parseFloat(e.target.value));
  };

  const handleNextSong = () => {
    if (Date.now() - states.lastClickTime < 500) {
      return;
    }
    if (song.title !== "") {
      const nextSong = songList[songList.indexOf(song) + 1];
      if (nextSong) {
        setSong(nextSong);
        setStates((prevState) => ({
          ...prevState,
          lastClickTime: Date.now(),
        }));
      }
    }
  };

  const handlePreviousSong = () => {
    if (Date.now() - states.lastClickTime < 500) {
      return;
    }
    if (song.title !== "") {
      const previousSong = songList[songList.indexOf(song) - 1];
      if (previousSong) {
        setSong(previousSong);
        setStates((prevState) => ({
          ...prevState,
          lastClickTime: Date.now(),
        }));
      }
    }
  };

  function secondsToMinutes(playtime: number): string {
    const minutes = Math.floor((playtime % 3600) / 60)
      .toString()
      .padStart(1, "0");
    const seconds = Math.floor(playtime % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  useEffect(() => {
    if (song.title != "") {
      setStates((prevState) => ({
        ...prevState,
        playing: true,
      }));
    }
  }, [song, setStates]);

  useEffect(() => {
    setSongStates({
      playing: states.playing,
      ended: states.ended,
    });

    setPlayingSong({
      title: song.title,
      id: song.id,
    });
  }, [states.playing, states.ended, setSongStates, setPlayingSong, song.title, song.id]);

  return (
    <div className="w-full">
      <div>
        <label htmlFor="slider">
          <input
            className="w-full cursor-pointer"
            type="range"
            id="slider"
            title="slider"
            min={0}
            max={0.999999}
            step="any"
            value={states.played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />
        </label>
      </div>
      <div className="w-full h-16 bg-dark text-light">
        <div className="relative h-16 px-14 grid grid-cols-[40%_1fr_25%_15%] justify-center items-center">
          <div className="flex gap-4 items-center">
            <img src={song.artworkUrl} alt={song.title} className="h-12 rounded-lg" />

            <div className="flex flex-col">
              <span className="text-2xl font-bold">{song.title}</span>
              <span className="text-xl mt-[-6px]">{song.artist}</span>
            </div>
          </div>

          <Volume
            volume={states.volume}
            volumeOpen={states.volumeOpen}
            handleVolumeChange={handleVolumeChange}
            setStates={setStates}
            muted={states.muted}
          />

          <Controls
            handlePreviousSong={handlePreviousSong}
            handlePlayPause={handlePlayPause}
            handleNextSong={handleNextSong}
            playing={states.playing}
          />

          <div className="text-xl">
            <span>{secondsToMinutes(states.playedSeconds)}</span>
            <span> / </span>
            <span>{secondsToMinutes(states.duration)}</span>
          </div>

          <div className="flex gap-4 justify-self-end">
            <div className="cursor-pointer">
              <ShareNetwork size={32} weight="fill" />
            </div>

            <div className="cursor-pointer">
              <DotsThreeOutlineVertical size={32} weight="fill" />
            </div>
          </div>
        </div>

        <div>
          <ReactPlayer
            ref={player}
            url={song.musicUrl}
            playing={states.playing}
            volume={states.volume}
            muted={states.muted}
            onDuration={handleDuration}
            progressInterval={100}
            onProgress={handleProgress}
            onEnded={handleEnded}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
