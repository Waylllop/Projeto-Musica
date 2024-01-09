import { useEffect, useRef, useState } from "react";
import { song } from "../../../common/interfices";
import PlayerOptions from "../../Player/PlayerOptions";
import Socials from "../Socials";
import { DotsThreeOutlineVertical, Link } from "@phosphor-icons/react";

interface ModalProps {
  data: song;
  color: string;
  size: number;
  top?: string;
  bottom?: string;
  right?: string;
  type: "social" | "playerOptions";
  handleSetPlaybackRate?: React.MouseEventHandler<HTMLButtonElement>;
}

const Modal = ({ data, color, size, top, bottom, right, type, handleSetPlaybackRate }: ModalProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleModalOpen = (e: React.MouseEvent) => {
    setModalOpen(!modalOpen);
    e.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuButtonRef.current &&
        menuRef.current &&
        !menuButtonRef.current.contains(event.target as Node) &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuButtonRef, menuRef]);

  return (
    <div className="relative">
      <button
        className={`pt-2 pl-2 ${data.title === "" ? "cursor-default" : ""}`}
        ref={menuButtonRef}
        onClick={handleModalOpen}
        disabled={data.title === "" ? true : false}
      >
        {type === "social" ? <Link size={size} className={`text-${color}`} weight="bold" /> : null}
        {type === "playerOptions" ? (
          <DotsThreeOutlineVertical size={size} className={`text-${color}`} weight="bold" />
        ) : null}
      </button>
      {modalOpen && (
        <div className={`absolute z-30 ${top} ${bottom} ${right}`} ref={menuRef}>
          {type === "social" ? <Socials data={data} setModalOpen={setModalOpen} /> : null}
          {type === "playerOptions" ? (
            <PlayerOptions data={data} handleSetPlaybackRate={handleSetPlaybackRate} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Modal;
