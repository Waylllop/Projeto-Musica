import { useEffect, useRef, useState } from "react";
import { DotsThreeOutlineVertical, ShareNetwork } from "@phosphor-icons/react";
import ReactPlayer from "react-player";
import { useMutation, gql, useApolloClient } from "@apollo/client";
import useSong from "../../Hooks/UseSongContext";
import usePlayingSong from "../../Hooks/UsePlayingSong";
import { secondsToMinutes } from "../../common/function";
import Volume from "./Volume";
import Controls from "./Controls";
import SongSlider from "./SongSlider";

const UPDATE_SONG = gql`
  mutation MyMutation($id: ID!, $timesPlayed: Int!) {
    updateSong(data: { timesPlayed: $timesPlayed }, where: { id: $id }) {
      id
    }
    publishSong(to: PUBLISHED, where: { id: $id }) {
      scheduledIn {
        id
      }
    }
  }
`;

const Player = () => {
  const { songStates, setSongStates, setPlayingSong } = usePlayingSong();
  const { song, setSong, songList } = useSong();
  const player = useRef<ReactPlayer | null>(null);

  const [updateSong] = useMutation(UPDATE_SONG);
  const client = useApolloClient();

  const [states, setStates] = useState({
    seeking: false,
    volumeOpen: false,
    muted: false,
    duration: 0,
    progress: 0,
    played: 0,
    playedSeconds: 0,
    volume: 0.5,
    lastClickTime: 0,
    timePlayStart: 0,
    timePlayedMutation: false,
  });

  const handlePlayPause = () => {
    if (song.title !== "") {
      setSongStates((prevState) => ({
        ...prevState,
        playing: !songStates.playing,
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
    setSongStates((prevState) => ({
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

  useEffect(() => {
    if (song.title != "") {
      setSongStates((prevState) => ({
        ...prevState,
        playing: true,
      }));
      setStates((prevState) => ({
        ...prevState,
        timePlayStart: Date.now(),
        timePlayedMutation: false,
      }));
    }
  }, [song, setSongStates]);

  useEffect(() => {
    setPlayingSong({
      title: song.title,
      id: song.id,
    });
  }, [setPlayingSong, song]);

  useEffect(() => {
    if (!states.timePlayedMutation && states.timePlayStart !== 0) {
      const timeNow = Date.now();
      const elapsedTime = (timeNow - states.timePlayStart) / 1000;

      if (elapsedTime >= 20) {
        const handleTimesPlayed = async (id: string) => {
          const { data } = await client.query({
            query: gql`
              query GetTimesPlayed($id: ID!) {
                song(where: { id: $id }) {
                  timesPlayed
                }
              }
            `,
            variables: { id },
            fetchPolicy: "network-only",
          });

          setStates((prevState) => ({
            ...prevState,
            timePlayedMutation: true,
          }));

          updateSong({
            variables: {
              id: song.id,
              timesPlayed: data.song.timesPlayed + 1,
            },
          });
        };

        handleTimesPlayed(song.id);
      }
    }
  }, [states, song, updateSong, client]);

  return (
    <div className="w-full">
      <div className="w-full h-16 bg-dark text-light relative">
        <SongSlider
          played={states.played}
          handleSeekMouseDown={handleSeekMouseDown}
          handleSeekChange={handleSeekChange}
          // @ts-expect-error expected any
          handleSeekMouseUp={handleSeekMouseUp}
        />
        <div className="relative h-16 px-14 grid grid-cols-[40%_1fr_25%_15%] justify-center items-center mt-[-24px]">
          <div className="flex gap-4 items-center">
            <img src={song.artworkUrl} alt={song.title} className="h-12 rounded-lg" />

            <div className="flex flex-col">
              <span className="text-2xl font-bold">{song.title}</span>
              <span className="text-xl mt-[-6px]">{song.artist}</span>
            </div>
          </div>

          <Controls
            handlePreviousSong={handlePreviousSong}
            handlePlayPause={handlePlayPause}
            handleNextSong={handleNextSong}
            playing={songStates.playing}
          />

          <div className="text-xl">
            <span>{secondsToMinutes(states.playedSeconds)}</span>
            <span> / </span>
            <span>{secondsToMinutes(states.duration)}</span>
          </div>

          <Volume
            volume={states.volume}
            volumeOpen={states.volumeOpen}
            handleVolumeChange={handleVolumeChange}
            setStates={setStates}
            muted={states.muted}
          />

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
            playing={songStates.playing}
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
