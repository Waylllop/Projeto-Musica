const About = () => {
  return (
    <section id="about" className="scroll-smooth border-t-4 border-dark mt-6 md:mt-10 md:mx-10 lg:mx-16 lg:mt-20 ">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold my-4 md:my-6 lg:my-10">About</h1>
      <div className="md:grid md:grid-cols-[minmax(200px,45%)_1fr] gap-6 lg:gap-10">
        <div className="bg-dark ml-[-64px] mr-[-24px] md:mr-0 px-16 py-10 lg:pr-10 md:rounded-r-[48px]">
          <p className="text-2xl md:text-3xl lg:text-4xl text-light md:leading-[2.5rem] lg:leading-[3.5rem]">
            I’m Felipe — a music producer and sound designer with over 5 years of study and practices in the field. I
            care a lot about sounds and using them to form an experience to the listener. Currently based in São Paulo,
            Brazil.
          </p>
        </div>

        <div className="py-6 md:py-10 text-dark text-xl lg:text-2xl flex flex-col gap-4">
          <p>
            I've been working with audio since I was little, mostly for curiosity about music production and as a plus
            to help me learn musical instruments, such as guitar, drums and bass.
          </p>

          <p>
            Along the way, I worked on several personal projects related to sound design, music production and
            post-processing audio and learned through experience about the industry standards.
          </p>

          <p>
            Today, I'm finishing my college degree in Music Production, but I already feel eager to start working with
            other artists, producers, performers and developers to help bring ideas to life.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
