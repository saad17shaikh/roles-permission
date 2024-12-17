"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
  getPaginationRowModel,
  PaginationState,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaFilter } from "react-icons/fa";
import { cn } from "@/lib/utils";
import DeleteMultipleRows from "../form-components/delete-multiple-rows";
// import { rate_routes } from "@/lib/routePath";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  showColDropDowns?: boolean;
  selectionKey?: string;
  showPageEntries?: boolean;
  className?: string;
  showSearchColumn?: boolean;
}
/**
 * DataTable Component
 *
 * Renders an interactive data table with sorting, filtering, and pagination.
 * Suitable for large datasets with customizable column visibility.
 *
 * @component
 * @example
 * ```jsx
 * <DataTable columns={columns} data={data} isLoading={false} />
 * ```
 */
/**
 * DataTable Component
 *
 * Renders an interactive data table with sorting, filtering, and pagination.
 * Suitable for large datasets with customizable column visibility.
 *
 * @component
 * @example
 * ```jsx
 * <DataTable columns={columns} data={data} isLoading={false} />
 * ```
 *
 * @param {Array} columns - Array of column definitions for the table.
 * @param {Array} data - Array of data objects to display in the table.
 * @param {boolean} [isLoading=false] - Whether the data is still loading.
 * @param {boolean} [showColDropDowns=false] - Display a dropdown to toggle column visibility.
 * @param {string} [selectionKey] - Unique key for row selection.
 * @param {boolean} [overflow=false] - Enables overflow for the table container.
 * @param {boolean} [showPageEntries=false] - Show entries per page dropdown.
 * @param {string} [className] - Additional classes for custom styling.
 * @param {boolean} [showSearchColumn=true] - Toggle search functionality for columns.
 * @returns {JSX.Element} Rendered DataTable component.
 */
const DataTable = <TData, TValue>({
  columns,
  data,
  isLoading,
  showColDropDowns,
  showPageEntries,
  className,
  showSearchColumn = true,
  selectionKey,
}: DataTableProps<TData, TValue>) => {
  const [page, setPage] = useState<number>(25);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: page,
  });

  const handlePageChange = (e: any) => {
    const newPageSize = parseInt(e.target.value);
    setPage(newPageSize);
    setPagination((prevState) => ({
      ...prevState,
      pageSize: newPageSize,
    }));
  };
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({}); //manage your own row selection state
  console.log({ rowSelection });
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const selectedIds = Object.keys(rowSelection).filter(
      (key) => rowSelection[key]
    );
    setIds(selectedIds);
  }, [rowSelection, setIds]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnData, setColumnData] = useState("");
  const [header, setHeader] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection, //hoist up the row selection state to your own scope

    getRowId: (row, index) =>
      (row as any)[selectionKey as string] || index.toString(),
    state: {
      columnVisibility,
      pagination,
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  if (isLoading || !data) {
    return "Loading..";
  }
  

  return (
    <div className="animate-in fade-in duration-1000">
      <div className="flex justify-end mb-3 animate-in fade-in duration-1000 gap-5">
        {showPageEntries && (
          <select
            onChange={handlePageChange}
            className=" px-5 py-2 border rounded-lg  !outline-main-color"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={250}>250</option>
          </select>
        )}
        {showColDropDowns && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <p className="p-2 border-2 rounded-md flex items-center justify-center px-4 cursor-pointer">
                <FaFilter />
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border-none   dark:bg-gray-900 dark:ring-1 dark:ring-gray-800">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize cursor-pointer"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: any) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {/* {showSearchColumn && (
          <Select
            onValueChange={(value) => {
              const selectedColumn = columns.find(
                (item: any) => item.accessorKey === value
              );
              if (selectedColumn) {
                setColumnData(value); // Set the selected value
                if (typeof selectedColumn.header === "string") {
                  setHeader(selectedColumn.header);
                }
              }
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Filter Column" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Columns</SelectLabel>
                {columns.map((item: any, index: any) => (
                  <SelectItem
                    value={item.accessorKey}
                   
                    key={index}
                  >
                    {item.header}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )} */}
        {columnData && (
          <>
            <Input
              placeholder={header && header}
              value={
                table.getColumn(`${columnData}`)?.getFilterValue() as string
              }
              onChange={(event) =>
                table
                  .getColumn(`${columnData}`)
                  ?.setFilterValue(event.target.value)
              }
              className="w-[20%] dark:bg-gray-700  !outline-main-color"
            />
          </>
        )}

        {ids.length > 0 && (
          <>
            <DeleteMultipleRows
              selectedIds={ids}
              path={""}
              revPath="/"
              setIds={setIds}
              setRowSelection={setRowSelection}
            />
          </>
        )}
      </div>
      <div className={cn("relative div-bar w-full overflow-auto", className)}>
        <Table>
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className=" text-sm">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="capitalize  ">
            {table.getRowModel()?.rows?.length ? (
              table.getRowModel().rows.map((row, index) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="capitalize rounded-xl "
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id} className="text-sm  ">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center   dark:bg-gray-700"
                >
                  No Data Found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 mt-4 ">
        <p className="text-sm">
          Page {table?.getState().pagination.pageIndex + 1} of{" "}
          {table?.getPageCount()}
        </p>
        <Button
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="tracking-wider text-gray-800 bg-white ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:ring-gray-600 dark:text-white !p-1"
        >
          <ChevronLeft />
        </Button>
        <Button
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="tracking-wider text-gray-800 bg-white ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:ring-gray-600 dark:text-white !p-1"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
