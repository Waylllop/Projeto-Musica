import "./style.css";

interface SongSlider {
  played: number;
  handleSeekMouseDown: () => void;
  handleSeekChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSeekMouseUp: () => void;
}

const SongSlider = ({ played, handleSeekMouseDown, handleSeekChange, handleSeekMouseUp }: SongSlider) => {
  return (
    <div className="range-slider relative top-[-10px]">
      <input
        className="w-full cursor-pointer text-secondary"
        type="range"
        id="slider"
        title="slider"
        min={0}
        max={0.999999}
        step="any"
        value={played}
        onMouseDown={handleSeekMouseDown}
        onChange={handleSeekChange}
        onMouseUp={handleSeekMouseUp}
      />
      <output></output>
      <div className="range-slider__progress"></div>
    </div>
  );
};

export default SongSlider;
