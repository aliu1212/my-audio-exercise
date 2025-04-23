import { useCallback, useEffect, useRef, useState } from "react";
import { Track } from "../types";
import AudioControls from "./AudioControls";
import { getDisplayTime } from "../utils";

interface Props {
  track: Track;
  handleNextTrack: () => void;
  handlePrevTrack: () => void;
}

function AudioPlayer({ track, handleNextTrack, handlePrevTrack }: Props) {
  const { url, duration } = track;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const player = useRef<HTMLAudioElement>(null);
  const progressBar = useRef<HTMLInputElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const whilePlaying = useCallback(() => {
    const audio = player.current;
    const progress = progressBar.current;
    if (!audio || !progress) return;
    progress.value = `${audio.currentTime}`;
    setCurrentTime(Number(progress.value));
    animationFrameRef.current = requestAnimationFrame(whilePlaying);
  }, []);

  useEffect(() => {
    const audio = player.current;
    if (!audio) return;
    audio.load();
    setIsPlaying(true);
    const playPromise = audio.play();
    if (playPromise?.catch) {
      playPromise.catch((err) => {
        console.warn("Autoplay failed:", err);
        setIsPlaying(false);
      });
    }
    const progress = progressBar.current;
    if (!progress) return;
    progress.max = `${duration}`;
  }, [duration, url]);

  useEffect(() => {
    const audio = player.current;
    if (!audio) return;

    const handleEnded = () => {
      handleNextTrack();
    };

    audio.addEventListener("ended", handleEnded);
  }, [handleNextTrack, url]);

  const togglePlayPause = () => {
    const audio = player.current;
    if (!audio) return;
    const prev = isPlaying;
    setIsPlaying(!prev);
    if (prev) {
      audio.pause();
    } else {
      audio.play();
      animationFrameRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const handleRangeChange = () => {
    const audio = player.current;
    const progress = progressBar.current;
    if (!audio || !progress) return;
    audio.currentTime = Number(progress.value);
    handleCurrentTimeChange();
  };

  const handleCurrentTimeChange = () => {
    const progress = progressBar.current;
    if (!progress) return;
    setCurrentTime(Number(progress.value));
  };

  const rewind = () => {
    const progress = progressBar.current;
    if (!progress) return;
    progress.value = `${Number(progress.value) - 15}`;
    handleRangeChange();
  };

  const fastForward = () => {
    const progress = progressBar.current;
    if (!progress) return;
    progress.value = `${Number(progress.value) + 15}`;
    handleRangeChange();
  };

  return (
    <div className="flex justify-center">
      <div className="fixed right-0 bottom-0 left-0 z-50 w-full bg-white p-3 shadow lg:static lg:shadow-none">
        <audio ref={player} src={url}></audio>
        <AudioControls
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          rewind={rewind}
          fastForward={fastForward}
          handlePrevTrack={handlePrevTrack}
          handleNextTrack={handleNextTrack}
        />
        <input
          type="range"
          defaultValue={0}
          ref={progressBar}
          onChange={handleRangeChange}
          className="w-full rounded-lg bg-blue-300"
        />
        <div className="flex justify-between">
          <div>{getDisplayTime(currentTime ?? 0)}</div>
          <div>{getDisplayTime(duration)}</div>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
