import { useContext } from "react";
import { SongContext } from "../../context/SongContext";
import { gql, useQuery } from "@apollo/client";
import Table from "../../components/Table";

const GET_SONGS_QUERY = gql`
  query GetSongs {
    songs(first: 20, orderBy: createdAt_DESC) {
      id
      album
      artist
      artworkUrl
      genre
      musicUrl
      playtime
      soundcloudUrl
      spotifyUrl
      title
      type
      webUrl
      youtubeUrl
    }
  }
`;

const Work = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSong must be used within a SongProvider");
  }
  const { setSong } = context;
  const { loading, error, data } = useQuery(GET_SONGS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <section className="mx-16 py-10">
      <h1 className="text-5xl mb-10 font-bold">Take a listen</h1>
      <div className="grid grid-cols-[minmax(200px,70%)_1fr]">
        <div className="w- max-h-[calc(100vh-352px)] overflow-auto scroll-custom">
          <Table songs={data.songs} setSong={setSong} />
        </div>

        <div></div>
      </div>
    </section>
  );
};

export default Work;
