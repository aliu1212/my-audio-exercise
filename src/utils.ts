export const getDisplayTime = (totalSec: number): string => {
  const minutes = Math.floor(totalSec / 60);
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const seconds = Math.floor(totalSec % 60);
  const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${displayMinutes}:${displaySeconds}`;
};
