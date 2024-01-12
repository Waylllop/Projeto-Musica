import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { song } from "../../common/interfices";
import Carousel from "../../components/Carousel";
import Info from "../../components/Util/Info";
import useSong from "../../Hooks/UseSongContext";
import Loader from "../../components/Util/Loader";
import useLanguage from "../../Hooks/UseLanguage";
import { MoreButton, MusicAlbum, MusicArtist, MusicGenre, MusicTitle, SectionWork } from "../../common/text";

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
      timesPlayed
    }
  }
`;

const Releases = () => {
  const { setSongList } = useSong();
  const { language } = useLanguage();
  const [activeSong, setActiveSong] = useState<song | null>(null);
  const { loading, error, data } = useQuery(GET_SONGS_QUERY);

  useEffect(() => {
    if (data) {
      setActiveSong(data.songs[0]);
      setSongList(data.songs);
    }
  }, [data, setSongList]);

  return (
    <section className="scroll-smooth mt-6 md:mx-10 md:mt-10 lg:mx-16 lg:mt-20 border-t-4 border-dark">
      <div className="flex flex-row items-center gap-4 justify-between my-4 md:my-6 lg:my-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {language === "en" ? SectionWork.en : null}
          {language === "pt" ? SectionWork.pt : null}
        </h1>
        <NavLink
          to="/work"
          className="bg-dark text-light border-2 border-dark rounded-3xl mt-2 py-2 text-xl px-6 md:px-10  md:text-2xl lg:text-3xl lg:hover:text-[#FBB13C] lg:duration-200"
        >
          {language === "en" ? MoreButton.en : null}
          {language === "pt" ? MoreButton.pt : null}
        </NavLink>
      </div>

      <Loader loading={loading} />

      {error ? <p className="text-xl md:text-3xl">Something went wrong, please try again later.</p> : null}

      {!loading && !error && data ? (
        <div className="md:grid md:grid-cols-[minmax(200px,30%)_1fr]">
          <div className="flex flex-col justify-between mb-6 md:mb-0">
            <div className="grid grid-cols-[minmax(200px,60%)_1fr] md:flex md:flex-col md:gap-4">
              <Info title={language === "en" ? MusicTitle.en : MusicTitle.pt} data={activeSong?.title} />
              <Info title={language === "en" ? MusicArtist.en : MusicArtist.pt} data={activeSong?.artist} />
              <Info
                title={language === "en" ? MusicGenre.en : MusicGenre.pt}
                data={activeSong?.genre}
                style="hidden md:block"
              />
              <Info
                title={language === "en" ? MusicAlbum.en : MusicAlbum.pt}
                data={activeSong?.album}
                style="hidden md:block"
              />
            </div>
          </div>

          <Carousel songs={data.songs} setActiveSong={setActiveSong} />
        </div>
      ) : null}
    </section>
  );
};

export default Releases;
