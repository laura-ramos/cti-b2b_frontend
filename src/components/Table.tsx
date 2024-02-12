import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  Column,
  Table as TB,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import useFetch from "../hooks/useFetch"
import { Spinner } from 'react-bootstrap';

// define props
interface TableProps {
  columns: ColumnDef<any>[];
  url: string,
}

// Define a default UI for filtering
const Filter = ({ column, table, }: {
column: Column<any, unknown>
  table: TB<any>
})  => {
  const columnFilterValue = column.getFilterValue()
  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <div className="input-group-text"><i className="fa fa-search"></i></div>
      </div>
      <input
        className="form-control form-control-md"
        value={(columnFilterValue ?? '') as string}
        onChange={e => {
          column.setFilterValue(e.target.value || undefined)
        }}
      />
    </div>
  )
}


export const Table = ({ columns, url }: TableProps) => {
  // get data
  const { data, error, loading } = useFetch(url);
  const [sorting, setSorting] = useState<SortingState>([])
  // function to create table react
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const changeStyle = (status: boolean) => {
    let styletext = 'text-dark'
    if(!status){
      styletext = 'text-danger'
    }
    return styletext
  }

  return (
    <>
      {error ? 
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
      : ''}
      {loading && <Spinner animation="grow" variant="dark" />}
      <table className='table table-bordered table-hover table-striped'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    :
                    <>
                    <div
                      {...{
                        className: header.column.getCanSort() ? 'cursor-pointer' : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {/** add sorting icons */}
                      {{
                        asc: <i className="fa fa-fw fa-arrow-up"></i>,
                        desc: <i className="fa fa-fw fa-arrow-down"></i>,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                    {header.column.getCanFilter() ? (
                      <Filter column={header.column} table={table}/>
                    ) : null}
                    </>
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className={row.original.status ? '' : (changeStyle(row.original.status))}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>

          ))}
        </tbody>
      </table>

      {/** pagination */}
      <div className='row mt-3'>
        <div className='col-sm-12 col-md-8'>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item mr-1">
                <select
                  className='form-control'
                  value={table.getState().pagination.pageSize}
                  onChange={e => { table.setPageSize(Number(e.target.value)) }}
                >
                  {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {'<'}
                </button>
              </li>
              <li className="page-item">
                <button
                    className="page-link"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                  {'>'}
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
              <li className="page-item">
                Go to page:
                <input
                  type="number"
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    table.setPageIndex(page)
                  }}
                  className=""
                />
              </li>

            </ul>
          </nav>
        </div>
        <div className='col-sm-12 col-md-4 text-right'>
          <span className="">
            Page {' '}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
        </div>
      </div>
    </>
  )
}