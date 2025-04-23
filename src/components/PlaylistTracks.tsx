import { Playlist } from "../types";
import PlaylistTrack from "./PlaylistTrack";

interface Props {
  trackIndex: number;
  playlist: Playlist;
  handleTrackSelect: (index: number) => void;
}

function PlaylistTracks({ trackIndex, playlist, handleTrackSelect }: Props) {
  const { id } = playlist;

  return (
    <div className="w-auto">
      <div className="flex h-96 min-h-dvw flex-col gap-1 lg:min-h-0 lg:overflow-y-scroll">
        {playlist.tracks.map((track, i) => (
          <PlaylistTrack
            playlistId={id}
            track={track}
            trackIndex={trackIndex}
            index={i}
            handleTrackSelect={handleTrackSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default PlaylistTracks;
