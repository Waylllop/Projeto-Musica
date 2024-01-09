import { useEffect, useRef, useState } from "react";
import { song } from "../../../common/interfices";
import Socials from "../Socials";
import { Link } from "@phosphor-icons/react";

interface ModalProps {
  data: song;
}

const Modal = ({ data }: ModalProps) => {
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
      <button className="pt-2 pl-2" ref={menuButtonRef} onClick={handleModalOpen}>
        <Link  size={24} className="text-dark" weight="bold" />
      </button>
      {modalOpen && (
        <div className="absolute top-0 right-12 z-10" ref={menuRef}>
          <Socials data={data} />
        </div>
      )}
    </div>
  );
};

export default Modal;
