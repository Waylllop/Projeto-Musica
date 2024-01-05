export interface song {
  album: string;
  artist: string;
  genre: string;
  id: string;
  playtime: string;
  soundcloudUrl: string;
  title: string;
  type: string;
  webUrl: string;
  youtubeUrl: string;
  spotifyUrl: string;
  musicUrl: string;
  artworkUrl: string;
}

export interface filter {
  id: number;
  name: string;
}

export interface playingSong {
  title: string;
  id: string;
}

export interface songStates {
  playing: boolean;
  seeking: boolean;
  volumeOpen: boolean;
  muted: boolean;
  duration: number;
  progress: number;
  played: number;
  playedSeconds: number;
  volume: number;
  lastClickTime: number;
  ended: boolean;
}
