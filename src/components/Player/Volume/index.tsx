import { SpeakerSimpleHigh, SpeakerSimpleLow, SpeakerSimpleSlash } from "@phosphor-icons/react";

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
      timePlayStart: number;
      timePlayedMutation: boolean;
      playbackRate: number;
    }>
  >;
}

const Volume = ({ volume, volumeOpen, handleVolumeChange, setStates, muted }: VolumeProps) => {
  return (
    <>
      {volumeOpen ? (
        <div className="absolute hidden lg:flex flex-col gap-8 justify-center items-center w-10 h-44 left-[32%] lg:left-[37%] top-[-101px]">
          <div
            className="bg-dark w-40 p-3 pl-10 rounded-xl rotate-[270deg]"
            onMouseMove={() => setStates((prevState) => ({ ...prevState, volumeOpen: true }))}
            onMouseLeave={() => setStates((prevState) => ({ ...prevState, volumeOpen: false }))}
          >
            <input
              className="w-full mt-2 text-light"
              type="range"
              min={0}
              max={1}
              step="any"
              value={volume}
              onChange={handleVolumeChange}
              disabled={!volumeOpen}
            />
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
              <SpeakerSimpleSlash size={32} weight="fill" />
            ) : null}
          </div>
        </div>
      ) : null}

      {!volumeOpen ? (
        <div className="absolute hidden lg:flex flex-col gap-8 justify-center items-center w-10 h-10 left-[32%] lg:left-[37%]">
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
              <SpeakerSimpleSlash size={32} weight="fill" />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Volume;
