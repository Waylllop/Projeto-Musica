import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { song } from "../../common/interfices";

interface TableProps {
  songs: song[];
  setSong: React.Dispatch<React.SetStateAction<song>>;
}

const Table = ({ songs, setSong }: TableProps) => {
  const columnHelper = createColumnHelper<song>();

  const columns = [
    columnHelper.accessor("artworkUrl", {
      cell: (info) => (
        <button onClick={() => setSong(info.row.original)}>
          <img
            className="w-20 h-20 object-cover rounded-xl mb-2"
            src={info.getValue()}
            alt={`${info.row.original.title}`}
          />
        </button>
      ),
      header: "",
    }),

    columnHelper.accessor("title", {
      cell: (info) => (
        <div className="flex flex-col gap-2">
          <span className="text-2xl">{info.getValue()}</span>
          <span>{`${info.row.original.artist}`}</span>
        </div>
      ),
      header: "Title",
    }),

    columnHelper.accessor("genre", {
      cell: (info) => info.getValue(),
      header: "Genre",
    }),

    columnHelper.accessor("album", {
      cell: (info) => info.getValue(),
      header: "Album",
    }),

    columnHelper.accessor("type", {
      cell: (info) => info.getValue(),
      header: "Type",
    }),

    columnHelper.accessor("playtime", {
      cell: (info) => info.getValue(),
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
      <thead className="sticky top-0 bg-dark">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="text-light text-left border-b-[4px] border-transparent">
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
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
