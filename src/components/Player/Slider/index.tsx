interface Slider {
  played: number;
  handleSeekMouseDown: () => void;
  handleSeekChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSeekMouseUp: () => void;
}

const Slider = ({ played, handleSeekMouseDown, handleSeekChange, handleSeekMouseUp }: Slider) => {
  return (
    <div>
      <label htmlFor="slider">
        <input
          className="w-full cursor-pointer"
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
      </label>
    </div>
  );
};

export default Slider;
