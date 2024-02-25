import About from "../About";
import Contact from "../Contact";
import Releases from "../Releases";
import Design from "../Design";
import useLanguage from "../../Hooks/UseLanguage";
import { Apresentation } from "../../common/text";

const Home = () => {
  const { language } = useLanguage();

  return (
    <>
      <section className="md:grid md:grid-cols-12 pt-6 md:pt-14 lg:pt-20">
        <p className="col-start-4 md:col-end-10 text-darkColor text-xl md:text-2xl lg:col-end-9 lg:text-3xl min-h-14">
          {language === "en" ? Apresentation.en : null}
          {language === "pt" ? Apresentation.pt : null}
        </p>
      </section>

      <Releases />
      <Design />
      <About />
      <Contact />
    </>
  );
};

export default Home;
