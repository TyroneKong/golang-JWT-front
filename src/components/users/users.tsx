import UseQueryUsers from "../../hooks/users";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
type Users = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  username: string;
};

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

function Users() {
  const { data } = UseQueryUsers();
  const columnHelper = createColumnHelper<Users>();

  const dateConverter = date => {
    return new Date(date).toISOString().substring(0, 10);
  };

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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
      <Button colorScheme="blue">First page</Button>
      <Button
      // isDisabled={!table.getCanPreviousPage()}
      // onClick={() => table.previousPage()}
      >
        Previous page
      </Button>
      <Button
      // isDisabled={!table.getCanNextPage()}
      // onClick={() => table.nextPage()}
      >
        Next page
      </Button>
      <Button
        colorScheme="blue"
        // onClick={() => table.setPageIndex(table.getPageCount() - 1)}
      >
        Last page
      </Button>
    </TableContainer>
  );
}

export default Users;
