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
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Products } from "../../../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosRequest from "../../../requests/requests";
import UserQueryCurrentUser from "../../../hooks/current-user";

type Props = {
  data: Products[];
  filter: {
    filtering: string;
    setFiltering: React.Dispatch<React.SetStateAction<string>>;
  };
};

function ProductsTable({ data, filter }: Props) {
  const columnHelper = createColumnHelper<Products>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const { data: user } = UserQueryCurrentUser();
  const queryClient = useQueryClient();
  const toast = useToast();

  const columns = [
    columnHelper.accessor("id", {
      header: "id",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "name",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("serial_number", {
      header: "serial number",
      cell: info => info.getValue(),
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
      globalFilter: filter?.filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: filter.setFiltering,
  });

  const rowData = () => data && table.getRowModel().rows;

  const row = rowData();

  const deleteProduct = useMutation({
    mutationFn: (id: number) => axiosRequest.delete(`/deleteproduct/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const deleteProductfn = (id: number) => {
    return deleteProduct.mutate(id);
  };

  const addToOrders = useMutation({
    mutationFn: (body: { user_id: number | undefined; product_id: number }) =>
      axiosRequest.post("/createOrder", body),
    onSuccess: () => {
      toast({
        description: "Product added to order succesfully",
        status: "success",
      });
    },
  });

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="orange" size="lg">
        <TableCaption>All Products</TableCaption>
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
          {row?.map(({ id, getVisibleCells, original }) => (
            <Tr key={id}>
              {getVisibleCells()?.map(cell => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
              <Td>
                <Button
                  ml={10}
                  size="lg"
                  colorScheme="green"
                  onClick={() =>
                    addToOrders.mutate({
                      user_id: user?.id,
                      product_id: original.id,
                    })
                  }
                >
                  Add to order
                </Button>
              </Td>
              <Td>
                <Button
                  ml={10}
                  size="lg"
                  colorScheme="red"
                  onClick={() => deleteProductfn(original.id)}
                >
                  <DeleteIcon />
                </Button>
              </Td>
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

export default ProductsTable;
