import About from "../About";
import Contact from "../Contact";
import Releases from "../Releases";

const Home = () => {
  return (
    <>
      <section className="grid grid-cols-12 pt-20">
        <p className="col-start-4 col-end-9 text-3xl text-darkColor">
          Music producer, synthesis and sound designer, focused on electronic stuff. Based in São Paulo. Available for
          remote-friendly freelance work.
        </p>
      </section>

      <Releases />
      <About />
      <Contact />
    </>
  );
};

export default Home;
