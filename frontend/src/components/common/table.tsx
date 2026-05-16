import React from "react";
import DirectionAwareTable from "./directionAwareTable";
 
export interface Column<T> {
  key: keyof T | string;
  label: string;
  className?: string;
  headerClassName?: string;
  render?: (value: unknown, row: T, rowIndex: number) => React.ReactNode;
}
 
interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  tableClassName?: string;
  tableStyle?: React.CSSProperties;
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
  headerRowClassName?: string;
  bodyClassName?: string;
  getRowClassName?: (row: T, rowIndex: number) => string;
  getRowStyle?: (row: T, rowIndex: number) => React.CSSProperties;
  onRowClick?: (row: T, rowIndex: number) => void;
  emptyMessage?: React.ReactNode;
  emptyColSpan?: number;
  emptyRowClassName?: string;
  emptyCellClassName?: string;
  emptyCellStyle?: React.CSSProperties;
}
 
function Table<T>({
  data,
  columns,
  wrapperClassName = "border rounded-xl",
  wrapperStyle,
  tableClassName = "text-left",
  tableStyle,
  headerClassName = "bg-gray-100",
  headerStyle,
  headerRowClassName,
  bodyClassName,
  getRowClassName,
  getRowStyle,
  onRowClick,
  emptyMessage = "No Data Found",
  emptyColSpan,
  emptyRowClassName,
  emptyCellClassName = "text-center p-4",
  emptyCellStyle,
}: TableProps<T>) {
  return (
<div className={wrapperClassName} style={wrapperStyle}>
<DirectionAwareTable className={tableClassName} style={tableStyle}>
<thead className={headerClassName} style={headerStyle}>
<tr className={headerRowClassName}>
            {columns.map((col) => (
<th key={String(col.key)} className={col.headerClassName ?? "px-4 py-2"}>
                {col.label}
</th>
            ))}
</tr>
</thead>
 
        <tbody className={bodyClassName}>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
<tr
  key={rowIndex}
  className={getRowClassName ? getRowClassName(row, rowIndex) : "border-t hover:bg-gray-50"}
  style={getRowStyle ? getRowStyle(row, rowIndex) : undefined}
  onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
>
                {columns.map((col) => (
<td key={String(col.key)} className={col.className ?? "px-4 py-2"}>
                    {col.render
                      ? col.render(
                          (row as Record<string, unknown>)[String(col.key)],
                          row,
                          rowIndex
                        )
                      : ((row as Record<string, React.ReactNode>)[
                          String(col.key)
                        ] as React.ReactNode)}
</td>
                ))}
</tr>
            ))
          ) : (
<tr className={emptyRowClassName}>
<td
  colSpan={emptyColSpan ?? columns.length}
  className={emptyCellClassName}
  style={emptyCellStyle}
>
                {emptyMessage}
</td>
</tr>
          )}
</tbody>
</DirectionAwareTable>
</div>
  );
}
 
export default Table;
