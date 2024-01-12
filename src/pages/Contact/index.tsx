import { TypeAnimation } from "react-type-animation";
import useLanguage from "../../Hooks/UseLanguage";
import { Contact1, Contact2, Contact3, ContactSlogan, SectionContact } from "../../common/text";
import { useEffect, useRef, useState } from "react";

const Contact = () => {
  const { language } = useLanguage();
  const divRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  function isElementInViewport(div: HTMLDivElement) {
    const rect = div.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // @ts-expect-error expected any
  function debounce(func, delay) {
    let timeoutId: ReturnType<typeof setTimeout>;
    // @ts-expect-error expected any
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // @ts-expect-error expected any
        func.apply(this, args);
      }, delay);
    };
  }

  useEffect(() => {
    function handleScroll() {
      if (divRef.current) {
        if (isElementInViewport(divRef.current)) {
          setAnimate(true);
        } else {
          setAnimate(false);
        }
      }
    }

    const debouncedHandleScroll = debounce(handleScroll, 100);
    window.addEventListener("scroll", debouncedHandleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  return (
    <section
      id="contact"
      className="scroll-smooth border-t-4 border-dark pb-6 md:pb-10 md:mx-10 md:mt-10 lg:pb-20 lg:mx-16 lg:mt-20"
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold my-4 md:my-6 lg:my-10">
        {language === "en" ? SectionContact.en : null}
        {language === "pt" ? SectionContact.pt : null}
      </h1>
      <div ref={divRef}>
        {animate ? (
          <TypeAnimation
            sequence={[`${language === "en" ? ContactSlogan.en : ContactSlogan.pt}`, 3000]}
            wrapper="span"
            speed={35}
            className="text-3xl md:text-5xl lg:text-6xl font-bold"
          />
        ) : (
          <div className="h-12"></div>
        )}
      </div>

      <div className="md:grid md:grid-cols-[minmax(400px,50%)_1fr] lg:grid-cols-[minmax(500px,50%)_1fr] md:gap-20 lg:gap-40 mt-10">
        <div className="text-dark text-xl md:text-2xl flex flex-col gap-6 md:gap-10">
          <p>
            {language === "en" ? Contact1.en : null} {language === "pt" ? Contact1.pt : null}{" "}
            <span className="font-bold underline">yllopmusic@gmail.com.</span>
          </p>

          <p>
            {language === "en" ? Contact2.en : null}
            {language === "pt" ? Contact2.pt : null}
          </p>

          <p>
            {language === "en" ? Contact3.en : null}
            {language === "pt" ? Contact3.pt : null}
          </p>
        </div>

        <div className=" flex flex-col text-xl mt-6 md:mt-0 md:text-2xl">
          <span>
            <a
              href="https://open.spotify.com/artist/3xVMQnRMwi2bL5pzSpBL0H?si=lBFdneLySYaKDS4CbwKlYw"
              target="_blank"
              className="font-bold underline lg:hover:text-secondary"
            >
              Spotify
            </a>
          </span>
          <span>
            <a
              href="https://www.youtube.com/@yllopmusic6770"
              target="_blank"
              className="font-bold underline lg:hover:text-secondary"
            >
              Youtube
            </a>
          </span>
          <span>
            <a
              href="https://soundcloud.com/yllop"
              target="_blank"
              className="font-bold underline lg:hover:text-secondary"
            >
              Soundcloud
            </a>
          </span>
          <span>
            {language === "en" ? (
              <a
                href="https://waylllop.github.io/MusicasMp3/identidade-visual/curriculum-en.pdf"
                className="font-bold underline lg:hover:text-secondary"
                target="_blank"
              >
                Curriculum
              </a>
            ) : null}

            {language === "pt" ? (
              <a
                href="https://waylllop.github.io/MusicasMp3/identidade-visual/curriculum-pt.pdf"
                className="font-bold underline lg:hover:text-secondary"
                target="_blank"
              >
                Curriculum
              </a>
            ) : null}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
