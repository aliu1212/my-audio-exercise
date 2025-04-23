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

export interface IconProps {
  height: string;
  width: string;
  color: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: { [key: string]: any };
  className?: string;
}
