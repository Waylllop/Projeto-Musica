import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { song } from "../../common/interfices";
import Carousel from "../../components/Carousel";
import Info from "../../components/Util/Info";
import useSong from "../../Hooks/UseSongContext/intex";

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

const Releases = () => {
  const { setSongList } = useSong();
  const [activeSong, setActiveSong] = useState<song | null>(null);
  const { loading, error, data } = useQuery(GET_SONGS_QUERY);

  useEffect(() => {
    if (data) {
      setActiveSong(data.songs[0]);
      setSongList(data.songs);
    }
  }, [data, setSongList]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <section className="scroll-smooth mx-16 mt-20 border-t-4 border-dark">
      <div className="flex flex-row my-10 items-center gap-4 justify-between">
        <h1 className="text-5xl font-bold">Work</h1>
        <NavLink
          to="/work"
          className="bg-dark text-light text-3xl border-2 border-dark rounded-3xl px-10 py-2 hover:text-[#FBB13C] duration-200"
        >
          See More
        </NavLink>
      </div>

      <div className="grid grid-cols-[minmax(200px,30%)_1fr]">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <Info title="Title" data={activeSong?.title} />
            <Info title="Artist" data={activeSong?.artist} />
            <Info title="Genre" data={activeSong?.genre} />
            <Info title="Album" data={activeSong?.album} />
          </div>
        </div>

        <Carousel songs={data.songs} setActiveSong={setActiveSong} />
      </div>
    </section>
  );
};

export default Releases;
