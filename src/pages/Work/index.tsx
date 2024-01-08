import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { filter, song } from "../../common/interfices";
import useSong from "../../Hooks/UseSongContext";
import Table from "../../components/Table";
import FilterButton from "../../components/Util/FilterButton";
import Checkbox from "../../components/Util/FilterButton/Checkbox";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <section className="mx-16 py-10 ">
      <h1 className="text-5xl mb-10 font-bold">Take a listen</h1>
      <div className="grid grid-cols-[minmax(200px,80%)_1fr]">
        <div className="w- min-h-[calc(100vh-352px)]">
          <Table songs={filteredSongList} />
        </div>

        <div className="flex flex-col items-center gap-6 fixed right-[8%] top-28">
          <div className="border-2 border-dark rounded-3xl">
            <FilterButton
              title="Type"
              isModalOpen={typeModalOpen}
              onClick={() => {
                setTypeModalOpen(!typeModalOpen);
                setGenreModalOpen(false);
                setAlbumModalOpen(false);
              }}
            />
            {typeModalOpen ? (
              <Checkbox
                options={typeList}
                selectedFilters={selectedTypeFilters}
                selectedOptions={selectedTypeOptions}
                setSelectedFilters={setSelectedTypeFilters}
                setSelectedOptions={setSelectedTypeOptions}
              />
            ) : null}
          </div>

          <div className="border-2 border-dark rounded-3xl">
            <FilterButton
              title="Genre"
              isModalOpen={genreModalOpen}
              onClick={() => {
                setGenreModalOpen(!genreModalOpen);
                setTypeModalOpen(false);
                setAlbumModalOpen(false);
              }}
            />
            {genreModalOpen ? (
              <Checkbox
                options={genreList}
                selectedFilters={selectedGenreFilters}
                selectedOptions={selectedGenreOptions}
                setSelectedFilters={setSelectedGenreFilters}
                setSelectedOptions={setSelectedGenreOptions}
              />
            ) : null}
          </div>

          <div className="border-2 border-dark rounded-3xl">
            <FilterButton
              title="Album"
              isModalOpen={albumModalOpen}
              onClick={() => {
                setAlbumModalOpen(!albumModalOpen);
                setTypeModalOpen(false);
                setGenreModalOpen(false);
              }}
            />
            {albumModalOpen ? (
              <Checkbox
                options={albumList}
                selectedFilters={selectedAlbumFilters}
                selectedOptions={selectedAlbumOptions}
                setSelectedFilters={setSelectedAlbumFilters}
                setSelectedOptions={setSelectedAlbumOptions}
              />
            ) : null}
          </div>

          <div className="border-2 border-dark rounded-3xl mt-28">
            <FilterButton
              title="Sort"
              onClick={() => {
                console.log("Sort");
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
