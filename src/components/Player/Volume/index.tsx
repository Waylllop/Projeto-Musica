import { SpeakerSimpleHigh, SpeakerSimpleLow, SpeakerSimpleNone, SpeakerSimpleSlash } from "@phosphor-icons/react";

interface VolumeProps {
  volume: number;
  volumeOpen: boolean;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  muted: boolean;
  setStates: React.Dispatch<
    React.SetStateAction<{
      seeking: boolean;
      volumeOpen: boolean;
      muted: boolean;
      duration: number;
      progress: number;
      played: number;
      playedSeconds: number;
      volume: number;
      lastClickTime: number;
    }>
  >;
}

const Volume = ({ volume, volumeOpen, handleVolumeChange, setStates, muted }: VolumeProps) => {
  return (
    <>
      {volumeOpen ? (
        <div className="absolute flex flex-col gap-8 justify-center items-center w-10 h-44 left-[30%] top-[-100px]">
          <div
            className="bg-dark w-40 p-3 pl-10 rounded-xl rotate-[270deg]"
            onMouseMove={() => setStates((prevState) => ({ ...prevState, volumeOpen: true }))}
            onMouseLeave={() => setStates((prevState) => ({ ...prevState, volumeOpen: false }))}
          >
            <label>
              <input
                className="w-full mt-2"
                type="range"
                min={0}
                max={1}
                step="any"
                value={volume}
                onChange={handleVolumeChange}
                disabled={!volumeOpen}
              />
            </label>
          </div>
          <div
            className="cursor-pointer z-10"
            onMouseMove={() => setStates((prevState) => ({ ...prevState, volumeOpen: true }))}
            onMouseLeave={() => setStates((prevState) => ({ ...prevState, volumeOpen: false }))}
            onClick={() => setStates((prevState) => ({ ...prevState, muted: !prevState.muted }))}
          >
            {muted ? <SpeakerSimpleSlash size={32} weight="fill" /> : null}
            {!muted && volume > 0.5 ? (
              <SpeakerSimpleHigh size={32} weight="fill" />
            ) : !muted && volume > 0 ? (
              <SpeakerSimpleLow size={32} weight="fill" />
            ) : !muted && volume === 0 ? (
              <SpeakerSimpleNone size={32} weight="fill" />
            ) : null}
          </div>
        </div>
      ) : null}

      {!volumeOpen ? (
        <div className="absolute flex flex-col gap-8 justify-center items-center w-10 h-10 left-[30%]">
          <div
            className="cursor-pointer z-10"
            onMouseMove={() => setStates((prevState) => ({ ...prevState, volumeOpen: true }))}
            onMouseLeave={() => setStates((prevState) => ({ ...prevState, volumeOpen: false }))}
            onClick={() => setStates((prevState) => ({ ...prevState, muted: !prevState.muted }))}
          >
            {muted ? <SpeakerSimpleSlash size={32} weight="fill" /> : null}
            {!muted && volume > 0.5 ? (
              <SpeakerSimpleHigh size={32} weight="fill" />
            ) : !muted && volume > 0 ? (
              <SpeakerSimpleLow size={32} weight="fill" />
            ) : !muted && volume === 0 ? (
              <SpeakerSimpleNone size={32} weight="fill" />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Volume;
