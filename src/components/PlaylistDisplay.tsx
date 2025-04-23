import { Playlist } from "../types";

interface Props {
  playlists: Playlist[];
  handlePlaylistSelect: (index: number) => void;
  playlistIndex: number;
}

function PlaylistDisplay({
  playlistIndex,
  handlePlaylistSelect,
  playlists,
}: Props) {
  return (
    <div className="flex flex-col items-center lg:items-stretch">
      <div>Playlists</div>
      {playlists.map((playlist, i) => (
        <div>
          <div
            key={playlist.id}
            onClick={() => handlePlaylistSelect(i)}
            className={`rounded-lg px-2 py-2 hover:bg-blue-100 ${playlistIndex === i ? "text-blue-400" : "text-black"}`}
          >
            <div className="text-lg">{playlist.name}</div>
            <div className="text-sm">{playlist.artist}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlaylistDisplay;
