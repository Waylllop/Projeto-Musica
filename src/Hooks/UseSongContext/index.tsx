import { useContext } from 'react';
import { SongContext } from '../../context/SongContext';

const useSong = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSong must be used within a SongProvider");
  }
  return context;
};

export default useSong;
