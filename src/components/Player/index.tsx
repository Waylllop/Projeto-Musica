import { useContext } from "react";
import { SongContext } from "../../context/SongContext";
import ReactPlayer from "react-player";

const Player = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSong must be used within a SongProvider");
  }
  const { song } = context;

  return <ReactPlayer url={song.musicUrl} playing controls width="100%" height="50px" volume={0.2} />;
};

export default Player;
