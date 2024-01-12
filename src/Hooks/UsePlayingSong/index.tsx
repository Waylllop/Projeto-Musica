import { useContext } from "react";
import { SongPlaying } from "../../context/SongPlaying";

const usePlayingSong = () => {
  const context = useContext(SongPlaying);
  if (!context) {
    throw new Error("usePlayingSong must be used within a SongPlayingProvider");
  }
  return context;
};

export default usePlayingSong;
