export function secondsToMinutes(playtime: number): string {
  const minutes = Math.floor((playtime % 3600) / 60)
    .toString()
    .padStart(1, "0");
  const seconds = Math.floor(playtime % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}
