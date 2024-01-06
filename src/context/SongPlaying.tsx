import { createContext, useState } from "react";
import { playingSong } from "../common/interfices";

interface SongPlayingType {
  playingSong: playingSong;
  setPlayingSong: React.Dispatch<React.SetStateAction<playingSong>>;
  songStates: {
    playing: boolean;
    ended: boolean;
  };
  setSongStates: React.Dispatch<React.SetStateAction<{ playing: boolean; ended: boolean }>>;
}

const SongPlaying = createContext<SongPlayingType | undefined>(undefined);

const SongPlayingProvider = ({ children }: { children: React.ReactNode }) => {
  const [playingSong, setPlayingSong] = useState<playingSong>({
    title: "",
    id: "",
  });

  const [songStates, setSongStates] = useState({
    playing: false,
    ended: false,
  });

  return (
    <SongPlaying.Provider value={{ playingSong, setPlayingSong, songStates, setSongStates }}>
      {children}
    </SongPlaying.Provider>
  );
};

export { SongPlaying, SongPlayingProvider };
