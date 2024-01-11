import { useEffect, useRef, useState } from "react";
import { song } from "../../../common/interfices";
import Socials from "../Socials";
import { Link } from "@phosphor-icons/react";

interface ModalProps {
  data: song;
  color: string;
  size: number;
  style?: string;
}

const Modal = ({ data, color, size, style }: ModalProps) => {
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
        className={`pt-2 ${data.title === "" ? "cursor-default" : ""}`}
        ref={menuButtonRef}
        onClick={handleModalOpen}
        disabled={data.title === "" ? true : false}
      >
        <Link size={size} className={`text-${color}`} weight="bold" />
      </button>
      {modalOpen && (
        <>
          <div className="fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.3)]"></div>
          <div className={`absolute z-30 ${style}`} ref={menuRef}>
            <Socials data={data} setModalOpen={setModalOpen} />
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;
