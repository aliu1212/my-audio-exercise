import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useCallback, useEffect, useState } from "react";
import AudioPlayer from "./components/AudioPlayer";
import PlaylistDisplay from "./components/PlaylistDisplay";
import PlaylistTracks from "./components/PlaylistTracks";
import data from "./data/playlists.json";

/**
 * Thanks for a fun little front end project!
 * Take-homes are great opportunites to play with new (to me) technologies so I messed around a bit with radix+tailwind
 * Also sorry if it's a bit ugly, I was tempted to hire a designer but decided against it ;)
 *
 */

function App() {
  const { playlists } = data;
  const [playlistIndex, setPlaylistIndex] = useState<number>(0);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const track = playlists[playlistIndex].tracks[trackIndex];

  const handleTrackSelect = useCallback(
    (index: number): void => {
      const trackIndex = playlists[playlistIndex].tracks[index] ? index : 0;
      setTrackIndex(trackIndex);
    },
    [playlistIndex, playlists],
  );

  const handlePlaylistSelect = (index: number): void => {
    setPlaylistIndex(index);
    setTrackIndex(0);
  };

  const handleNextTrack = (): void => {
    const nextIndex = trackIndex + 1;
    const playlist = playlists[playlistIndex];
    if (playlist.tracks[nextIndex]) setTrackIndex(nextIndex);
  };

  const handlePrevTrack = (): void => {
    const nextIndex = trackIndex - 1;
    const playlist = playlists[playlistIndex];
    if (playlist.tracks[nextIndex]) {
      setTrackIndex(nextIndex);
    } else {
      setTrackIndex(0);
    }
  };

  useEffect(() => {
    handleTrackSelect(0);
  }, [handleTrackSelect, playlistIndex]);

  return (
    <Theme>
      <div className="m-3 flex flex-col items-center gap-2">
        <div className="flex w-full flex-col items-center justify-around gap-5 lg:flex-row lg:items-stretch">
          <div className="w-sm">
            <PlaylistDisplay
              playlistIndex={playlistIndex}
              handlePlaylistSelect={handlePlaylistSelect}
              playlists={playlists}
            />
          </div>
          <div className="w-full max-w-xl">
            <PlaylistTracks
              trackIndex={trackIndex}
              playlist={playlists[playlistIndex]}
              handleTrackSelect={handleTrackSelect}
            />
          </div>
        </div>
        <div className="w-full p-5">
          <AudioPlayer
            track={track}
            handleNextTrack={handleNextTrack}
            handlePrevTrack={handlePrevTrack}
          />
        </div>
      </div>
    </Theme>
  );
}

export default App;
