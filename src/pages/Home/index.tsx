// import { gql, useQuery } from "@apollo/client";

// GraphQL query
// const GET_SONGS_QUERY = gql`
//   query GetSongs {
//     songs {
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
    <div>
      <h1>Musica</h1>
    </div>
  );
};

export default Home;
