import { useEffect, useState } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import useSong from "../../Hooks/UseSongContext";
import usePlayingSong from "../../Hooks/UsePlayingSong";
import { secondsToMinutes } from "../../common/function";
import { song } from "../../common/interfices";
import { Play } from "@phosphor-icons/react";
import Modal from "../Util/Modal";
import BarAnimation from "../Util/BarAnimation";
import "./style.css";

interface TableProps {
  songs: song[];
}

const Table = ({ songs }: TableProps) => {
  const { playingSong, songStates, setSongStates } = usePlayingSong();
  const { setSong } = useSong();
  const columnHelper = createColumnHelper<song>();

  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [columnState, setColumnState] = useState({
    artworkUrl: false,
    title: false,
    genre: false,
    album: false,
    type: false,
    playtime: false,
    webUrl: false,
  });

  useEffect(() => {
    const width = window.innerWidth;
    if (width > 950) {
      setColumnState({
        artworkUrl: true,
        title: true,
        genre: true,
        album: true,
        type: true,
        playtime: true,
        webUrl: true,
      });
    }

    if (width < 950) {
      setColumnState({
        artworkUrl: true,
        title: true,
        genre: true,
        album: true,
        type: true,
        playtime: false,
        webUrl: true,
      });
    }

    if (width < 768) {
      setColumnState({
        artworkUrl: true,
        title: true,
        genre: true,
        album: true,
        type: false,
        playtime: false,
        webUrl: true,
      });
    }

    if (width < 450) {
      setColumnState({
        artworkUrl: true,
        title: true,
        genre: false,
        album: false,
        type: false,
        playtime: false,
        webUrl: true,
      });
    }
  }, []);

  const columns = [
    columnHelper.accessor("artworkUrl", {
      cell: (info) => (
        <div className="flex items-center lg:justify-center relative">
          <img
            className="w-14 h-14 md:w-20 md:h-20 object-cover rounded-xl mt-2"
            src={info.getValue()}
            alt={`${info.row.original.title}`}
          />

          {playingSong.id === info.row.original.id && songStates.playing ? (
            <BarAnimation
              bgSize=" ml-2 md:ml-3 lg:ml-0 w-10 h-10 md:w-14 md:h-14 mt-2"
              barSize=" w-8 h-8 md:w-10 md:h-10"
            />
          ) : (
            <div className="md:ml-3 lg:ml-0 playIcon w-14 h-14 absolute justify-center items-center bg-light rounded-full opacity-90 mt-2">
              <Play size={28} className="text-dark" weight="fill" />
            </div>
          )}
        </div>
      ),
      header: "",
    }),

    columnHelper.accessor("title", {
      cell: (info) => (
        <div className="flex flex-col md:gap-2 mt-2 w-36 md:w-48 lg:w-60">
          <span className="text-xl md:text-2xl truncate">{info.getValue()}</span>
          <div className="flex gap-1">
            <span className="text-sm md:text-base truncate">{`${info.row.original.artist}`}</span>
            <span className="block min-[450px]:hidden text-sm md:text-base truncate">{`- ${info.row.original.genre}`}</span>
          </div>
        </div>
      ),
      header: "Title",
    }),

    columnHelper.accessor("genre", {
      cell: (info) => <span className="mt-2 block w-24 truncate">{info.getValue()}</span>,
      header: "Genre",
    }),

    columnHelper.accessor("album", {
      cell: (info) => <span className="mt-2 block w-24 truncate">{info.getValue()}</span>,
      header: "Album",
    }),

    columnHelper.accessor("type", {
      cell: (info) => <span className="mt-2 block w-16 truncate">{info.getValue()}</span>,
      header: "Type",
    }),

    columnHelper.accessor("playtime", {
      cell: (info) => <span className="mt-2 block ">{secondsToMinutes(Number(info.getValue()))}</span>,
      header: "Playtime",
    }),

    columnHelper.accessor("webUrl", {
      cell: ({ row }: { row: { original: song } }) => (
        <Modal data={row.original} color="dark" size={24} style="top-0 left-[-170px]" />
      ),
      header: "Social",
    }),
  ];

  const state = {
    columnVisibility: {
      artworkUrl: columnState.artworkUrl,
      title: columnState.title,
      genre: columnState.genre,
      album: columnState.album,
      type: columnState.type,
      playtime: columnState.playtime,
      webUrl: columnState.webUrl,
    },
  };

  const table = useReactTable({
    data: songs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state,
  });

  return (
    <table className="w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="text-dark text-left border-b-[3px] border-dark">
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            onClick={(e) => {
              e.stopPropagation();
              setSong(row.original);
              setSongStates((prevState) => ({
                ...prevState,
                playing: !songStates.playing,
              }));
            }}
            className="cursor-pointer hover:bg-[#C3C3C3] duration-500 song-table-row"
          >
            {row.getVisibleCells().map((cell) => (
              <td className="align-top" key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
