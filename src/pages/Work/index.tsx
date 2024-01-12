import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { filter, song } from "../../common/interfices";
import useSong from "../../Hooks/UseSongContext";
import Table from "../../components/Table";
import FilterButton from "../../components/Util/FilterButton";
import Checkbox from "../../components/Util/FilterButton/Checkbox";
import Loader from "../../components/Util/Loader";
import Collapse from "../../components/Util/Collapse";
import useLanguage from "../../Hooks/UseLanguage";
import { MusicAlbum, MusicGenre, MusicTitle, TableTitle } from "../../common/text";

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

const Work = () => {
  const { loading, error, data } = useQuery(GET_SONGS_QUERY);
  const { setSongList } = useSong();
  const { language } = useLanguage();

  const [filteredSongList, setFilteredSongList] = useState<song[]>([]);

  const [genreModalOpen, setGenreModalOpen] = useState<boolean>(false);
  const [selectedGenreOptions, setSelectedGenreOptions] = useState<number[]>([]);
  const [selectedGenreFilters, setSelectedGenreFilters] = useState<string[]>([]);

  const [typeModalOpen, setTypeModalOpen] = useState<boolean>(false);
  const [selectedTypeOptions, setSelectedTypeOptions] = useState<number[]>([]);
  const [selectedTypeFilters, setSelectedTypeFilters] = useState<string[]>([]);

  const [albumModalOpen, setAlbumModalOpen] = useState<boolean>(false);
  const [selectedAlbumOptions, setSelectedAlbumOptions] = useState<number[]>([]);
  const [selectedAlbumFilters, setSelectedAlbumFilters] = useState<string[]>([]);

  const [genreList, setGenreList] = useState<filter[]>();
  const [typeList, setTypeList] = useState<filter[]>();
  const [albumList, setAlbumList] = useState<filter[]>();

  const resetFilters = () => {
    setSelectedGenreOptions([]);
    setSelectedGenreFilters([]);
    setSelectedTypeOptions([]);
    setSelectedTypeFilters([]);
    setSelectedAlbumOptions([]);
    setSelectedAlbumFilters([]);
  };

  useEffect(() => {
    if (!data) return;

    setSongList(data.songs);

    const uniqueGenreSet = Array.from(new Set<string>(data.songs.map((song: song) => song.genre)), (name, index) => ({
      id: index,
      name,
    }));
    setGenreList(uniqueGenreSet);

    const uniqueTypeSet = Array.from(new Set<string>(data.songs.map((song: song) => song.type)), (name, index) => ({
      id: index,
      name,
    }));
    setTypeList(uniqueTypeSet);

    const uniqueAlbumSet = Array.from(new Set<string>(data.songs.map((song: song) => song.album)), (name, index) => ({
      id: index,
      name,
    }));
    setAlbumList(uniqueAlbumSet);
  }, [data, setSongList, setGenreList, setTypeList, setAlbumList]);

  useEffect(() => {
    if (data) {
      let filteredSongs = data.songs;

      if (selectedGenreFilters.length > 0) {
        filteredSongs = filteredSongs.filter((song: song) => selectedGenreFilters.includes(song.genre));
      }

      if (selectedTypeFilters.length > 0) {
        filteredSongs = filteredSongs.filter((song: song) => selectedTypeFilters.includes(song.type));
      }

      if (selectedAlbumFilters.length > 0) {
        filteredSongs = filteredSongs.filter((song: song) => selectedAlbumFilters.includes(song.album));
      }

      setFilteredSongList(filteredSongs);
    }
  }, [selectedGenreFilters, selectedTypeFilters, selectedAlbumFilters, data]);

  return (
    <section className="md:mx-10 lg:mx-16 py-6 lg:py-10">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 lg:mb-10">
        {language === "en" ? TableTitle.en : null}
        {language === "pt" ? TableTitle.pt : null}
      </h1>
      <div className="min-[1100px]:grid grid-cols-[minmax(200px,80%)_1fr]">
        <div className="min-h-[calc(100vh-352px)]">
          <Loader loading={loading} />

          {error ? <p className="text-3xl">Something went wrong, please try again later.</p> : null}

          {!loading && !error && data ? <Table songs={filteredSongList} /> : null}
        </div>

        <div className="hidden min-[1100px]:flex flex-col items-center gap-6 fixed right-[5%] 2xl:right-[8%] top-32">
          <div className="border-2 border-dark rounded-3xl">
            <FilterButton
              title={`${language === "en" ? MusicTitle.en : MusicTitle.pt}`}
              isModalOpen={typeModalOpen}
              onClick={() => {
                setTypeModalOpen(!typeModalOpen);
                setGenreModalOpen(false);
                setAlbumModalOpen(false);
              }}
            />
            <Collapse open={typeModalOpen}>
              <Checkbox
                options={typeList}
                selectedFilters={selectedTypeFilters}
                selectedOptions={selectedTypeOptions}
                setSelectedFilters={setSelectedTypeFilters}
                setSelectedOptions={setSelectedTypeOptions}
              />
            </Collapse>
          </div>

          <div className="border-2 border-dark rounded-3xl">
            <FilterButton
              title={`${language === "en" ? MusicGenre.en : MusicGenre.pt}`}
              isModalOpen={genreModalOpen}
              onClick={() => {
                setGenreModalOpen(!genreModalOpen);
                setTypeModalOpen(false);
                setAlbumModalOpen(false);
              }}
            />
            <Collapse open={genreModalOpen}>
              <Checkbox
                options={genreList}
                selectedFilters={selectedGenreFilters}
                selectedOptions={selectedGenreOptions}
                setSelectedFilters={setSelectedGenreFilters}
                setSelectedOptions={setSelectedGenreOptions}
              />
            </Collapse>
          </div>

          <div className="border-2 border-dark rounded-3xl">
            <FilterButton
              title={`${language === "en" ? MusicAlbum.en : MusicAlbum.pt}`}
              isModalOpen={albumModalOpen}
              onClick={() => {
                setAlbumModalOpen(!albumModalOpen);
                setTypeModalOpen(false);
                setGenreModalOpen(false);
              }}
            />
            <Collapse open={albumModalOpen}>
              <Checkbox
                options={albumList}
                selectedFilters={selectedAlbumFilters}
                selectedOptions={selectedAlbumOptions}
                setSelectedFilters={setSelectedAlbumFilters}
                setSelectedOptions={setSelectedAlbumOptions}
              />
            </Collapse>
          </div>

          {selectedGenreOptions.length > 0 || selectedTypeOptions.length > 0 || selectedAlbumOptions.length > 0 ? (
            <button className="border-2 border-dark rounded-3xl px-4 py-1 self-end" onClick={() => resetFilters()}>
              Clear Filters
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Work;
