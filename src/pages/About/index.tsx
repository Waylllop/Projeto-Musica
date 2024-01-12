import { motion, Variants } from "framer-motion";
import useLanguage from "../../Hooks/UseLanguage";
import { Brief, Details1, Details2, Details3, SectionAbout } from "../../common/text";

const cardVariants: Variants = {
  offscreen: {
    x: -700,
  },
  onscreen: {
    x: 0,
    transition: {
      ease: "backInOut",
      duration: 1,
    },
  },
};

const About = () => {
  const { language } = useLanguage();

  return (
    <section id="about" className="scroll-smooth border-t-4 border-dark mt-6 md:mt-10 md:mx-10 lg:mx-16 lg:mt-20 ">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold my-4 md:my-6 lg:my-10">
        {language === "en" ? SectionAbout.en : null}
        {language === "pt" ? SectionAbout.pt : null}
      </h1>
      <div className="md:grid md:grid-cols-[minmax(200px,45%)_1fr] gap-6 lg:gap-10">
        <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.7 }}>
          <motion.div className="card" variants={cardVariants}>
            <div className="bg-dark ml-[-100px] mr-[-24px] md:mr-0 pl-[100px] pr-8 md:pl-24 md:pr-16 py-10 lg:pr-10 md:rounded-r-[48px]">
              <p className="text-2xl md:text-3xl lg:text-4xl text-light md:leading-[2.5rem] lg:leading-[3.5rem]">
                {language === "en" ? Brief.en : null}
                {language === "pt" ? Brief.pt : null}
              </p>
            </div>
          </motion.div>
        </motion.div>

        <div className="py-6 md:py-10 text-dark text-xl lg:text-2xl flex flex-col gap-4">
          <p>
            {language === "en" ? Details1.en : null}
            {language === "pt" ? Details1.pt : null}
          </p>

          <p>
            {language === "en" ? Details2.en : null}
            {language === "pt" ? Details2.pt : null}
          </p>

          <p>
            {language === "en" ? Details3.en : null}
            {language === "pt" ? Details3.pt : null}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
