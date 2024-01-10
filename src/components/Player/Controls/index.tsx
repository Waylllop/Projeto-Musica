import { Pause, Play, SkipBack, SkipForward } from "@phosphor-icons/react";

interface ControlsProps {
  handlePreviousSong: () => void;
  handlePlayPause: () => void;
  handleNextSong: () => void;
  playing: boolean;
}

const Controls = ({ handlePreviousSong, handlePlayPause, handleNextSong, playing }: ControlsProps) => {
  return (
    <div className="flex gap-2 md:gap-4 items-center justify-self-center">
      <div className="cursor-pointer" onClick={handlePreviousSong}>
        <SkipBack className="w-5 h-5 md:w-8 md:h-8" weight="fill" />
      </div>

      <div
        className="w-10 h-10 md:w-12 md:h-12 flex justify-center items-center bg-light rounded-full cursor-pointer"
        onClick={handlePlayPause}
      >
        {playing ? (
          <Pause className="text-dark w-6 h-6 md:w-8 md:h-8" weight="fill" />
        ) : (
          <Play className="text-dark w-6 h-6 md:w-8 md:h-8" weight="fill" />
        )}
      </div>

      <div className="cursor-pointer" onClick={handleNextSong}>
        <SkipForward className="w-5 h-5 md:w-8 md:h-8" weight="fill" />
      </div>
    </div>
  );
};

export default Controls;
