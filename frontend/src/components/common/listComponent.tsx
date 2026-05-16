import React from "react";
import {
  Pagination,
  SortDropdown,
  RowsPerPageSelector,
  SearchBar,
  Button,
  Loader,
  ReloadButton,
  Dropdown,
  DirectionAwareTable,
} from "@components/component";
import { JSX } from "react";
import { Icons } from "@components/icons";
import { capitalizeFirstLetter } from "@utils/capitalizeUtil";

/* ===== Live badge that ticks every second ===== */
function LastFetchedAtBadge({ ts }: { ts?: number }) {
  if (!ts) return null;

  const d = new Date(ts);

  let hours = d.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;

  const mins = String(d.getMinutes()).padStart(2, "0");

  const formatted = ` ${hours}:${mins} ${ampm}`;

  return (
    <div className="leading-tight shrink-0">
      {" "}
      {/* prevent shrinking */}
      <div className="text-xs font-medium text-gray-600">Last fetched</div>
      <div className="text-xs font-mono text-gray-700 whitespace-nowrap inline-flex">
        {formatted}
      </div>
    </div>
  );
}

export interface Column<T> {
  label: string;
  accessor: keyof T | string;
  render?: (row: T) => JSX.Element;
  capitalize?: boolean;
  align?: "left" | "center" | "right";
}

interface FilterProps {
  label?: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

interface ListComponentProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  loadingMessage?: string;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit?: () => void; // For API-triggered search
  searchKeys?: (keyof T)[];
  sortValue?: string;
  onSortChange?: (val: string) => void;
  sortKey?: keyof T;
  rowsValue?: string;
  onRowsChange?: (val: string) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  buttonText?: string;
  onButtonClick?: () => void;
  showButton?: boolean;
  onReload?: () => void;
  filters?: FilterProps[];
}

function ListComponent<T>({
  columns,
  data,
  loading = false,
  loadingMessage = "Loading...",
  searchValue,
  onSearchChange,
  onSearchSubmit,
  searchKeys = [],
  sortValue,
  onSortChange,
  sortKey,
  rowsValue = "10",
  onRowsChange,
  pagination,
  buttonText = "Add",
  onButtonClick,
  showButton = true,
  onReload,
  filters = [],
}: ListComponentProps<T>) {
  // 1) Start from global fallback (set by api client)
  const initialTs =
    (typeof window !== "undefined" &&
      (globalThis as { __lastFetchedAtGlobal?: number }).__lastFetchedAtGlobal) ||
    undefined;

  // 2) Subscribe to global "last fetched" events (fires whenever any useApiQuery updates)
  const [lastFetchedTs, setLastFetchedTs] = React.useState<number | undefined>(
    initialTs
  );
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: Event) => {
      const ce = e as CustomEvent;
      const detail = ce.detail as { ts?: number };
      const ts = detail?.ts;
      if (ts) setLastFetchedTs(ts);
    };
    window.addEventListener("app:last-fetched", handler as EventListener);
    return () =>
      window.removeEventListener("app:last-fetched", handler as EventListener);
  }, []);

  // 3) Optional: derive from data if someone tags it (kept as a bonus path)
  const derivedTs = React.useMemo<number | undefined>(() => {
    const d = data as { __lastFetchedAt?: number } | { __lastFetchedAt?: number }[] | null;
    return (
      (d && typeof d === 'object' && '__lastFetchedAt' in d && d.__lastFetchedAt) ||
      (Array.isArray(d) ? d[0]?.__lastFetchedAt : undefined)
    );
  }, [data]);

  const tsToShow = derivedTs ?? lastFetchedTs;

  const filteredData = React.useMemo(() => {
    if (onSearchSubmit) return data; // Skip local filtering in API search mode
    if (!searchValue || searchKeys.length === 0) return data;
    const lower = searchValue.toLowerCase();
    return data.filter((row) =>
      searchKeys.some((key) => {
        const val = (row as Record<string, unknown>)[key as string];
        return val?.toString().toLowerCase().includes(lower);
      })
    );
  }, [data, searchValue, searchKeys, onSearchSubmit]);

  const handleReload = () => {
    onSearchChange?.({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
    onReload?.();
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey as string];
      const bVal = (b as Record<string, unknown>)[sortKey as string];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortValue === "Z to A"
          ? bVal.localeCompare(aVal, undefined, { numeric: true })
          : aVal.localeCompare(bVal, undefined, { numeric: true });
      }
      return 0;
    });
  }, [filteredData, sortKey, sortValue]);

  const paginatedData = sortedData;

  return (
    <div className="flex flex-col gap-8 relative">
      {loading && <Loader message={loadingMessage} />}

      <div className="bg-white rounded-lg shadow-md border border-form-befault overflow-hidden">
        {/* Top Filters & Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center px-6 py-4">
          {/* Left Controls */}
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
            {onRowsChange && rowsValue && (
              <RowsPerPageSelector value={rowsValue} onSelect={onRowsChange} />
            )}
            {onSearchChange && searchValue !== undefined && (
              <div className="flex items-center gap-2">
                <SearchBar
                  value={searchValue}
                  onChange={onSearchChange}
                  onSearch={() => {
                    if (onSearchSubmit) onSearchSubmit(); // API search mode
                  }}
                />
                {onReload && <ReloadButton onReload={handleReload} />}
              </div>
            )}
            {onSortChange && sortValue && (
              <SortDropdown value={sortValue} onSelect={onSortChange} />
            )}
            {/* Live, per-second updating */}
            <LastFetchedAtBadge ts={tsToShow} />
          </div>

          {/* Right Filters + Last Fetched + Button */}
          <div className="flex flex-wrap gap-3 items-center">
            {filters.map((filter, index) => (
              <div key={index} className="w-full md:w-48">
                <Dropdown
                  label={filter.label}
                  name={`filter-${index}`}
                  options={filter.options}
                  value={filter.value}
                  onChange={filter.onChange}
                />
              </div>
            ))}

            {showButton && onButtonClick && (
              <Button
                variant="add"
                size="sm"
                onClick={onButtonClick}
                leftIcon={<Icons.CirclePlus className="w-5 h-5" />}
              >
                {buttonText}
              </Button>
            )}
          </div>
        </div>

        <div className="border-t border-form-default" />

        {/* Table Section */}
        <DirectionAwareTable
          wrapperClassName="max-h-[600px]"
          className="min-w-full text-left"
        >
            <thead className="text-gray-dark/90 font-medium border-b border-form-default">
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className={`px-6 py-3 whitespace-nowrap text-${
                      col.align || "left"
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-form-default text-form-text">
              {!loading && paginatedData.length > 0 ? (
                paginatedData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-soft">
                    {columns.map((col, j) => (
                      <td
                        key={j}
                        className={`px-6 py-3 whitespace-nowrap text-text-list text-${
                          col.align || "left"
                        }`}
                      >
                        {(() => {
                          const cellContent: React.ReactNode = col.render
                            ? col.render(row) as React.ReactNode
                            : col.capitalize
                            ? capitalizeFirstLetter(
                                (row as Record<string, unknown>)[
                                  col.accessor as string
                                ] as string
                              )
                            : ((row as Record<string, unknown>)[
                                col.accessor as string
                              ] as React.ReactNode);
                          return cellContent;
                        })()}
                      </td>
                    ))}
                  </tr>
                ))
              ) : !loading && paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-6 text-gray-base"
                  >
                    No data available
                  </td>
                </tr>
              ) : null}
            </tbody>
        </DirectionAwareTable>

        {/* Pagination */}
        {pagination && (
          <div className="flex justify-end px-6 py-4 border-t border-form-default">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={pagination.onPageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ListComponent;
