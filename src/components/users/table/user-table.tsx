import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { Usertype } from "../../../types/types";
import { Roles } from "../../../record/roles";

type Props = {
  data: Usertype[];
  filter: {
    filtering: string;
    setFiltering: React.Dispatch<React.SetStateAction<string>>;
  };
};

function UserTable({ data, filter }: Props) {
  const columnHelper = createColumnHelper<Usertype>();
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = [
    columnHelper.accessor("id", {
      header: "id",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "name",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "email",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("username", {
      header: "username",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("role", {
      header: "role",
      cell: info => Roles[info.getValue()],
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      globalFilter: filter.filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: filter.setFiltering,
  });

  const rowData = () => data && table.getRowModel().rows;

  const row = rowData();

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal" size="lg">
        <TableCaption>All Users</TableCaption>
        <Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Th
                  cursor="pointer"
                  fontSize={20}
                  key={header.id}
                  onClick={() => header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? null}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {row?.map(({ id, getVisibleCells }) => (
            <Tr key={id}>
              {getVisibleCells()?.map(cell => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button colorScheme="blue" onClick={() => table.setPageIndex(0)}>
        First page
      </Button>
      <Button
        isDisabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
      >
        Previous page
      </Button>
      <Button
        isDisabled={data && !table.getCanNextPage()}
        onClick={() => table.nextPage()}
      >
        Next page
      </Button>
      <Button
        colorScheme="blue"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
      >
        Last page
      </Button>
    </TableContainer>
  );
}

export default UserTable;
