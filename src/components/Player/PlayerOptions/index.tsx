import { song } from "../../../common/interfices";
import PlaybackSpeed from "./PlaybackSpeed";

interface PlayerOptionsProps {
  data: song;
  handleSetPlaybackRate?: React.MouseEventHandler<HTMLButtonElement>;
}

const PlayerOptions = ({ data, handleSetPlaybackRate }: PlayerOptionsProps) => {
  return (
    <div className="flex flex-col gap-2 bg-dark text-light p-2 rounded-lg">
      {data.title !== "" ? (
        <>
          <div className="flex flex-col gap-2 items-start text-light ">
            <span className="text-xl px-4">Speed</span>
            <PlaybackSpeed handleSetPlaybackRate={handleSetPlaybackRate} speed={0.25} />
            <PlaybackSpeed handleSetPlaybackRate={handleSetPlaybackRate} speed={0.5} />
            <PlaybackSpeed handleSetPlaybackRate={handleSetPlaybackRate} speed={1} />
            <PlaybackSpeed handleSetPlaybackRate={handleSetPlaybackRate} speed={1.5} />
            <PlaybackSpeed handleSetPlaybackRate={handleSetPlaybackRate} speed={2} />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default PlayerOptions;
