import UseQueryUsers from "../../hooks/users";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

import { Usertype } from "../../types/types";

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

function Users() {
  const { data } = UseQueryUsers();

  const columnHelper = createColumnHelper<Usertype>();

  const dateConverter = date => new Date(date).toISOString().substring(0, 10);

  const columns = [
    columnHelper.accessor("ID", {
      header: "id",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("CreatedAt", {
      header: "created_At",
      cell: info => dateConverter(info.getValue()),
    }),
    columnHelper.accessor("UpdatedAt", {
      header: "updated_At",
      cell: info => dateConverter(info.getValue()),
    }),
    columnHelper.accessor("DeletedAt", {
      header: "deleted_At",
      cell: info => info.getValue() ?? "n/a",
    }),

    columnHelper.accessor("username", {
      header: "username",
      cell: info => info.getValue(),
    }),
  ];

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable<Usertype>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  const rowData = () => {
    return data && table.getRowModel().rows;
  };

  const row = rowData();

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>All Users</TableCaption>
        <Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Th
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
          {row?.map(row => (
            <Tr key={row.id}>
              {row.getVisibleCells().map(cell => (
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

export default Users;
