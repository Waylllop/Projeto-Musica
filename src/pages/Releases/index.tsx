import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Carousel from "../../components/Carousel";
import { song } from "../../common/interfices";

const GET_SONGS_QUERY = gql`
  query GetSongs {
    songs(first: 5, orderBy: createdAt_DESC) {
      id
      album
      artist
      artworkUrl
      genre
      musicUrl
      title
      type
    }
  }
`;

const Release = () => {
  const [activeSong, setActiveSong] = useState<song | null>(null);
  const { loading, error, data } = useQuery(GET_SONGS_QUERY);

  useEffect(() => {
    if (data) {
      setActiveSong(data.songs[0]);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <section className="scroll-smooth mx-16 mt-20 border-t-4 border-dark">
      <div className="flex flex-row my-10 items-center gap-4 justify-between">
        <h1 className="text-5xl font-bold">Work</h1>
        <NavLink
          to="/work"
          className={({ isActive }) =>
            `bg-dark text-light text-3xl border-2 border-dark rounded-3xl px-10 py-2 ${
              isActive ? "duration-200" : "hover:text-[#FBB13C] duration-200]"
            }`
          }
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          See More
        </NavLink>
      </div>

      <div className="grid grid-cols-[minmax(200px,30%)_1fr]">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-2xl text-secondary mb-[-10px]">Tiitle</p>
              <p className="text-4xl text-dark">{activeSong?.title}</p>
            </div>
            <div>
              <p className="text-2xl text-secondary mb-[-10px]">Artist</p>
              <p className="text-4xl text-dark">{activeSong?.artist}</p>
            </div>
            <div>
              <p className="text-2xl text-secondary mb-[-10px]">Genre</p>
              <p className="text-4xl text-dark">{activeSong?.genre}</p>
            </div>
            <div>
              <p className="text-2xl text-secondary mb-[-10px]">Album</p>
              <p className="text-4xl text-dark">{activeSong?.album}</p>
            </div>
          </div>
        </div>

        <Carousel songs={data.songs} setActiveSong={setActiveSong} />
      </div>
    </section>
  );
};

export default Release;
