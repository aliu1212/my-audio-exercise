import { IconButton } from "@radix-ui/themes";
import FastForward from "./icons/FastForward";
import NextTrack from "./icons/NextTrack";
import Pause from "./icons/Pause";
import Play from "./icons/Play";
import PrevTrack from "./icons/PrevTrack";
import Rewind from "./icons/Rewind";

interface Props {
  isPlaying: boolean;
  handleNextTrack: () => void;
  handlePrevTrack: () => void;
  togglePlayPause: () => void;
  rewind: () => void;
  fastForward: () => void;
}

function AudioControls({
  togglePlayPause,
  isPlaying,
  fastForward,
  rewind,
  handleNextTrack,
  handlePrevTrack,
}: Props) {
  return (
    <div className="m-3 flex justify-center gap-3">
      <IconButton onClick={handlePrevTrack} color="blue">
        <PrevTrack width="15" height="15" color="white" />
      </IconButton>
      <IconButton onClick={rewind} color="blue">
        <Rewind width="15" height="15" color="white" />
      </IconButton>
      <IconButton onClick={togglePlayPause} color="blue">
        {isPlaying ? (
          <Pause width="15" height="15" color="white" />
        ) : (
          <Play width="15" height="15" color="white" />
        )}
      </IconButton>
      <IconButton onClick={fastForward} color="blue">
        <FastForward width="15" height="15" color="white" />
      </IconButton>
      <IconButton onClick={handleNextTrack} color="blue">
        <NextTrack width="15" height="15" color="white" />
      </IconButton>
    </div>
  );
}

export default AudioControls;
