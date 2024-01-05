import { useContext } from 'react';
import { SongPlaying } from '../../context/SongPlaying';


const usePlayingSong = () => {
  const context = useContext(SongPlaying);
  if (!context) {
    throw new Error("useSong must be used within a SongProvider");
  }
  return context;
};

export default usePlayingSong;
