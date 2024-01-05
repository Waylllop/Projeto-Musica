import { Pause, Play, SkipBack, SkipForward } from "@phosphor-icons/react";

interface ControlsProps {
  handlePreviousSong: () => void;
  handlePlayPause: () => void;
  handleNextSong: () => void;
  playing: boolean;
}

const Controls = ({ handlePreviousSong, handlePlayPause, handleNextSong, playing }: ControlsProps) => {
  return (
    <div className="flex gap-4 items-center justify-self-center">
      <div className="cursor-pointer" onClick={handlePreviousSong}>
        <SkipBack size={32} weight="fill" />
      </div>

      <div
        className="w-12 h-12 flex justify-center items-center bg-light rounded-full cursor-pointer"
        onClick={handlePlayPause}
      >
        {playing ? (
          <Pause size={32} className="text-dark" weight="fill" />
        ) : (
          <Play size={32} className="text-dark" weight="fill" />
        )}
      </div>

      <div className="cursor-pointer" onClick={handleNextSong}>
        <SkipForward size={32} weight="fill" />
      </div>
    </div>
  );
};

export default Controls;
