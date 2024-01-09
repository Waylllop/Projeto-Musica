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

  const columns = [
    columnHelper.accessor("artworkUrl", {
      cell: (info) => (
        <div className="flex items-center justify-center relative">
          <img
            className="w-20 h-20 object-cover rounded-xl m-2"
            src={info.getValue()}
            alt={`${info.row.original.title}`}
          />

          {playingSong.id === info.row.original.id && songStates.playing ? (
            <BarAnimation bgSize="14" barSize="10" />
          ) : (
            <div className="playIcon w-14 h-14 absolute justify-center items-center bg-light rounded-full opacity-90">
              <Play size={28} className="text-dark" weight="fill" />
            </div>
          )}
        </div>
      ),
      header: "",
    }),

    columnHelper.accessor("title", {
      cell: (info) => (
        <div className="flex flex-col gap-2 mt-2">
          <span className="text-2xl">{info.getValue()}</span>
          <span>{`${info.row.original.artist}`}</span>
        </div>
      ),
      header: "Title",
    }),

    columnHelper.accessor("genre", {
      cell: (info) => <span className="mt-2 block">{info.getValue()}</span>,
      header: "Genre",
    }),

    columnHelper.accessor("album", {
      cell: (info) => <span className="mt-2 block">{info.getValue()}</span>,
      header: "Album",
    }),

    columnHelper.accessor("type", {
      cell: (info) => <span className="mt-2 block">{info.getValue()}</span>,
      header: "Type",
    }),

    columnHelper.accessor("playtime", {
      cell: (info) => <span className="mt-2 block">{secondsToMinutes(Number(info.getValue()))}</span>,
      header: "Playtime",
    }),

    columnHelper.accessor("soundcloudUrl", {
      cell: ({ row }: { row: { original: song } }) => <Modal data={row.original} />,
      header: "Social",
    }),
  ];

  const table = useReactTable({
    data: songs,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
