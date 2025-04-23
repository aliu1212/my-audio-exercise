import { IconButton } from "@radix-ui/themes";
import { useState } from "react";
import { Track } from "../types";
import { getDisplayTime } from "../utils";
import Play from "./icons/Play";

interface Props {
  playlistId: number;
  track: Track;
  handleTrackSelect(index: number): void;
  index: number;
  trackIndex: number;
}

function PlaylistTrack({
  playlistId,
  track,
  handleTrackSelect,
  index,
  trackIndex,
}: Props) {
  const { name, duration } = track;
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      key={`${playlistId}-${name}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onDoubleClick={() => handleTrackSelect(index)}
      className={`flex w-full flex-row items-center gap-3 rounded-md hover:bg-blue-100 ${trackIndex === index ? "text-blue-400" : "text-black"} px-4 py-2`}
    >
      <div
        className={`transition-opacity duration-200 ${isHovering ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <IconButton
          radius="full"
          onClick={() => handleTrackSelect(index)}
          color="blue"
        >
          <Play width="15" height="15" color="white" />
        </IconButton>
      </div>
      <div className="flex w-full justify-between">
        <div>{name}</div>
        <div>{getDisplayTime(duration)}</div>
      </div>
    </div>
  );
}

export default PlaylistTrack;
