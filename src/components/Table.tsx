import {   ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable,} from '@tanstack/react-table'
import React, { FC, useEffect, useState } from 'react'
import useFetch from "../hooks/useFetch"
import { Spinner } from 'react-bootstrap';
import { User} from '../interfaces'


interface TableProps {
  columns: ColumnDef<any>[];
  url: string,
}

export const Table = ({columns, url}: TableProps) => {
  //const [data, setData] = useState<User[]>([]);
  const { data, error, loading } = useFetch<User[]>(url);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <>
    {error}
    {loading  && <Spinner animation="grow" variant="dark" />}
      <table className='table'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
            
          ))}
        </tbody>
      </table>
    </>
  )
}