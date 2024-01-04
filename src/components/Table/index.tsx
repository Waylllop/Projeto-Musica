import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { song } from "../../common/interfices";
import { Play } from "@phosphor-icons/react";
import { useState } from "react";

interface TableProps {
  songs: song[];
  setSong: React.Dispatch<React.SetStateAction<song>>;
}

const Table = ({ songs, setSong }: TableProps) => {
  const [showIconId, setShowIconId] = useState<string>("");
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
          {showIconId === info.row.original.id ? (
            <div className="w-14 h-14 absolute flex justify-center items-center bg-light rounded-full opacity-90">
              <Play size={28} className="text-dark" weight="fill" />
            </div>
          ) : null}
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
      cell: (info) => <span className="mt-2 block">{info.getValue()}</span>,
      header: "Playtime",
    }),

    columnHelper.accessor("soundcloudUrl", {
      cell: "",
      header: "social",
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
            onClick={() => setSong(row.original)}
            onMouseEnter={() => setShowIconId(row.original.id)}
            onMouseLeave={() => setShowIconId("")}
            className="cursor-pointer hover:bg-[#C3C3C3] duration-500"
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
