import { useEffect, useState } from "react";
import About from "../About";
import Contact from "../Contact";
import Releases from "../Releases";
import useLanguage from "../../Hooks/UseLanguage";
import { Apresentation } from "../../common/text";

const Home = () => {
  const [scrollY, setScrollY] = useState(window.innerWidth);
  const { language } = useLanguage();

  useEffect(() => {
    function handleResize() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", handleResize);
    return () => {
      window.removeEventListener("scroll", handleResize);
    };
  }, [scrollY]);
  return (
    <>
      <section className="md:grid md:grid-cols-12 pt-6 md:pt-14 lg:pt-20">
        <p className="col-start-4 md:col-end-10 text-darkColor text-xl md:text-2xl lg:col-end-9 lg:text-3xl ">
          {language === "en" ? Apresentation.en : null}
          {language === "pt" ? Apresentation.pt : null}
        </p>
      </section>

      <Releases />
      <About />
      <Contact scrollY={scrollY} />
    </>
  );
};

export default Home;
