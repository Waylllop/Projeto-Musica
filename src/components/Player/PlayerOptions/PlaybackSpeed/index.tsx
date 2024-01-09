interface PlaybackSpeedProps {
  handleSetPlaybackRate?: React.MouseEventHandler<HTMLButtonElement>;
  speed: number;
}

const PlaybackSpeed = ({ handleSetPlaybackRate, speed }: PlaybackSpeedProps) => {
  return (
    <button className="hover:text-[#fcc46a] text-left w-full px-4" onClick={handleSetPlaybackRate} value={speed}>
      {speed === 1 ? "normal" : `${speed}x`}
    </button>
  );
};

export default PlaybackSpeed;
