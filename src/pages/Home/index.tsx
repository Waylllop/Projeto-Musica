import About from "../About";
import Contact from "../Contact";
import Releases from "../Releases";

const Home = () => {
  return (
    <>
      <section className="md:grid md:grid-cols-12 pt-6 md:pt-14 lg:pt-20">
        <p className="col-start-4 md:col-end-10 text-darkColor text-xl md:text-2xl lg:col-end-9 lg:text-3xl ">
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
