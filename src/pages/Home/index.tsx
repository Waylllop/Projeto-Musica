// import { gql, useQuery } from "@apollo/client";
import About from "../About";
import Contact from "../Contact";
import Work from "../Work";

// const GET_SONGS_QUERY = gql`
//   query GetSongs {
//     songs(first: 20) {
//       album
//       artist
//       genre
//       id
//       playtime
//       soundcloudUrl
//       title
//       type
//       webUrl
//       youtubeUrl
//       spotifyUrl
//       musicUrl
//       artworkUrl
//     }
//   }
// `;

const Home = () => {
  // const { loading, error, data } = useQuery(GET_SONGS_QUERY);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error</p>;

  // console.log(data);

  return (
    <>
      <div className="bg-dark grid grid-cols-12">
        <div className="col-start-4 col-end-6 flex flex-col gap-8 text-6xl font-coustard text-primary pt-10 pb-16">
          <h1>yLLop</h1>
          <h1>Music &</h1>
          <h1>Synthesis</h1>
        </div>
      </div>

      <section className="grid grid-cols-12 mt-20">
        <p className="col-start-4 col-end-8 text-3xl text-darkColor">
          Music producer, synthesis and sound designer, focused on electronic stuff. Based in São Paulo. Available for
          remote-friendly freelance work.
        </p>
      </section>

      <Work />
      <About />
      <Contact />
    </>
  );
};

export default Home;
