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
      <div className=" flex flex-col gap-8 bg-dark text-8xl font-coustard text-primary pl-[30%] pt-10 pb-20">
        <h1>yLLop</h1>
        <h1>Music &</h1>
        <h1>Synthesis</h1>
      </div>

      <section className="flex justify-center">
        <p className="text-3xl text-darkColor w-[1000px]">
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
