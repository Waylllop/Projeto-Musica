import { Play } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import usePlayingSong from "../../../Hooks/UsePlayingSong";

const ModalDesign = () => {
  const { setSongStates } = usePlayingSong();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleModalOpen = (e: React.MouseEvent) => {
    setModalOpen(!modalOpen);
    e.stopPropagation();
    setSongStates((prevState) => ({
      ...prevState,
      playing: false,
    }));
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
    <div className="flex items-center justify-center relative">
      <div
        ref={menuButtonRef}
        onClick={handleModalOpen}
        className="cursor-pointer flex items-center justify-center relative"
      >
        <img
          src="https://waylllop.github.io/MusicasMp3/identidade-visual/reel-tumb.png"
          alt="Sound Design"
          className="rounded-[48px] brightness-100 duration-1000 object-cover "
        />
        <div className="w-24 h-24 md:w-32 md:h-32 lg:w-44 lg:h-44 absolute flex justify-center items-center bg-light rounded-full opacity-90 pr-1">
          <Play className="text-dark w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" weight="fill" />
        </div>
      </div>

      {modalOpen && (
        <>
          <div className="fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.8)]">
            <iframe
              className="w-[90%] h-[80%] hidden lg:block"
              src="https://www.youtube.com/embed/0CUIAfAiKIc?si=2X-N62ds5bv7EPkK"
              title="Sound Design"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
          <div className={`fixed top-0 left-0 z-30`} ref={menuRef}>
            <div className="mx-auto"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default ModalDesign;
