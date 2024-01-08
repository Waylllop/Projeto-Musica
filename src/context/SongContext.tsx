import { createContext, useState } from "react";
import { song } from "../common/interfices";

interface SongContextType {
  song: song;
  songList: song[];
  setSong: React.Dispatch<React.SetStateAction<song>>;
  setSongList: React.Dispatch<React.SetStateAction<song[]>>;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

const SongProvider = ({ children }: { children: React.ReactNode }) => {
  const [song, setSong] = useState<song>({
    album: "",
    artist: "",
    genre: "",
    id: "",
    playtime: "",
    soundcloudUrl: "",
    title: "",
    type: "",
    webUrl: "",
    youtubeUrl: "",
    spotifyUrl: "",
    musicUrl: "",
    artworkUrl: "",
    timesPlayed: 0,
  });
  const [songList, setSongList] = useState<song[]>([]);

  return <SongContext.Provider value={{ song, setSong, songList, setSongList }}>{children}</SongContext.Provider>;
};

export { SongContext, SongProvider };
