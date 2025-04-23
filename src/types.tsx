export interface Track {
  name: string;
  url: string;
  duration: number;
}

export interface Playlist {
  id: number;
  name: string;
  artist: string;
  year: number;
  tracks: Track[];
}
