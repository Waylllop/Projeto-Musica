const Contact = () => {
  return (
    <section id="contact" className="scroll-smooth mx-16 mt-20 border-t-4 border-dark pb-20">
      <h1 className="mt-10 text-5xl font-bold mb-10">Contact</h1>
      <h2 className="text-6xl font-bold mb-10">Have some idea in mind?</h2>
      <div className="grid grid-cols-[minmax(500px,50%)_1fr] gap-40">
        <div className="text-dark text-2xl flex flex-col gap-10">
          <p>
            You can send details about your project directly to{" "}
            <span className="font-bold underline">
              yllopmusic@gmail.com.
            </span>
          </p>

          <p>
            I can help to produce your music from scratch, mixing your stems, mastering your song, or compose the entire
            thing for your project - a short, game or animation.
          </p>

          <p>Currently based in São Paulo, Brazil — available for remote-friendly work.</p>
        </div>

        <div className="flex flex-col text-2xl">
          <span>
            <a
              href="https://open.spotify.com/artist/3xVMQnRMwi2bL5pzSpBL0H?si=lBFdneLySYaKDS4CbwKlYw"
              target="_blank"
              className="font-bold underline hover:text-secondary"
            >
              Spotify
            </a>
          </span>
          <span>
            <a
              href="https://www.youtube.com/@yllopmusic6770"
              target="_blank"
              className="font-bold underline hover:text-secondary"
            >
              Youtube
            </a>
          </span>
          <span>
            <a href="https://soundcloud.com/yllop" target="_blank" className="font-bold underline hover:text-secondary">
              Soundcloud
            </a>
          </span>
          <span>
            <a
              href="https://waylllop.github.io/MusicasMp3/identidade-visual/curriculum-en.pdf"
              className="font-bold underline hover:text-secondary"
              target="_blank"
            >
              Curriculum
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
