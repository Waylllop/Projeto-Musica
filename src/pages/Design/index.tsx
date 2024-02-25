import useLanguage from "../../Hooks/UseLanguage";
import { MoreButton, sectionDesign } from "../../common/text";
import ModalDesign from "../../components/Util/ModalDesign";

const Design = () => {
  const { language } = useLanguage();

  return (
    <section id="design" className="scroll-smooth border-t-4 border-dark mt-6 md:mt-10 md:mx-10 lg:mx-16 lg:mt-20 ">
      <div className="flex flex-row items-center gap-4 justify-between my-4 md:my-6 lg:my-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold my-4 md:my-6 lg:my-10">
          {language === "en" ? sectionDesign.en : null}
          {language === "pt" ? sectionDesign.pt : null}
        </h1>
        <a
          href="https://www.youtube.com/playlist?list=PLIA0tPPLu22VxDDh3sITQ-NlYgIxfiH0t"
          target="_blank"
          className="bg-dark text-light border-2 border-dark rounded-3xl mt-2 py-2 text-xl px-6 md:text-2xl lg:text-3xl lg:hover:text-[#FBB13C] lg:duration-200 mouse-pointer"
        >
          {language === "en" ? MoreButton.en : null}
          {language === "pt" ? MoreButton.pt : null}
        </a>
      </div>

      <div className="mx-auto max-w-[1100px]">
        <ModalDesign />
      </div>
    </section>
  );
};

export default Design;
