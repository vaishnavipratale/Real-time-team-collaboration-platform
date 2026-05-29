// =============================================
// components/MultiSelectList.tsx
// =============================================
import React from "react";
import type { JSX } from "react";
import {
    Button,
    Loader,
    Dropdown,
    RowsPerPageSelector,
    SearchBar,
    ReloadButton,
    SortDropdown,
    Pagination,
    DirectionAwareTable,
} from "@components/component";
import { Icons } from "@components/icons";

/* ===== Live badge that matches ListComponent ===== */
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
    align?: "left" | "center" | "right";
    widthClass?: string; // optional width classes
}

interface FilterProps {
    label?: string;
    value: string;
    options: string[];
    onChange: (val: string) => void;
}

interface MultiSelectListProps<T> {
    columns: Column<T>[];
    data: T[];
    rowId: (row: T) => string; // stable unique id (e.g., item_id)

    loading?: boolean;
    loadingMessage?: string;

    // Search & Sort
    searchValue?: string;
    onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit?: () => void; // server-side search trigger
    searchKeys?: (keyof T)[];
    sortValue?: string;
    onSortChange?: (val: string) => void;
    sortKey?: keyof T;

    // Paging
    rowsValue?: string;
    onRowsChange?: (val: string) => void;
    pagination?: {
        currentPage: number;
        totalPages: number;
        onPageChange: (page: number) => void;
    };

    // Right-side filters + primary action
    filters?: FilterProps[];
    showPrimaryButton?: boolean;
    primaryButtonText?: string;
    onPrimaryButtonClick?: () => void;
    disablePrimaryButton?: boolean;

    // Refresh + “last fetched”
    onReload?: () => void;
    lastFetchedTs?: number;

    // Selection
    selectedIds: Set<string>;
    onToggleRow: (id: string) => void;
    onToggleAllVisible?: (ids: string[], checked: boolean) => void;
}

function MultiSelectList<T>({
                                columns,
                                data,
                                rowId,
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

                                filters = [],
                                showPrimaryButton = true,
                                primaryButtonText = "Action",
                                onPrimaryButtonClick,
                                disablePrimaryButton,

                                onReload,
                                lastFetchedTs,

                                selectedIds,
                                onToggleRow,
                                onToggleAllVisible,
                            }: MultiSelectListProps<T>) {
    // mirror ListComponent’s client-side search behavior (skipped when onSearchSubmit is provided)
    const filteredData = React.useMemo(() => {
        if (onSearchSubmit) return data;
        if (!searchValue || searchKeys.length === 0) return data;
        const q = String(searchValue).toLowerCase();
        return data.filter((row) =>
            searchKeys.some((k) =>
                String((row as any)[k] ?? "").toLowerCase().includes(q)
            )
        );
    }, [data, searchValue, searchKeys, onSearchSubmit]);

    // mirror ListComponent’s sort behavior
    const sortedData = React.useMemo(() => {
        if (!sortKey) return filteredData;
        return [...filteredData].sort((a, b) => {
            const A = (a as any)[sortKey];
            const B = (b as any)[sortKey];
            if (typeof A === "string" && typeof B === "string") {
                return sortValue === "Z to A"
                    ? B.localeCompare(A, undefined, { numeric: true })
                    : A.localeCompare(B, undefined, { numeric: true });
            }
            return 0;
        });
    }, [filteredData, sortKey, sortValue]);

    const allVisibleIds = React.useMemo(
        () => sortedData.map(rowId),
        [sortedData, rowId]
    );
    const allVisibleChecked =
        allVisibleIds.length > 0 &&
        allVisibleIds.every((id) => selectedIds.has(id));

    return (
        <div className="flex flex-col gap-8 relative">
            {loading && <Loader message={loadingMessage} />}

            {/* match ListComponent container styles exactly */}
            <div className="bg-white rounded-lg shadow-md border border-form-default overflow-hidden">
                {/* Top Filters & Controls — EXACT paddings/structure */}
                <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center px-6 py-4">
                    {/* Left Controls: rows, search+reload, sort, last-fetched */}
                    <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
                        {onRowsChange && rowsValue && (
                            <RowsPerPageSelector value={rowsValue} onSelect={onRowsChange} />
                        )}

                        {onSearchChange !== undefined && (
                            <div className="flex items-center gap-2">
                                <SearchBar
                                    value={searchValue || ""}
                                    onChange={onSearchChange}
                                    onSearch={() => {
                                        if (onSearchSubmit) onSearchSubmit();
                                    }}
                                />
                                {onReload && <ReloadButton onReload={onReload} />}
                            </div>
                        )}

                        {onSortChange && sortValue && (
                            <SortDropdown value={sortValue} onSelect={onSortChange} />
                        )}

                        {/* Live badge aligned same as in ListComponent */}
                        <LastFetchedAtBadge ts={lastFetchedTs} />
                    </div>

                    {/* Right Filters + Primary Button */}
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

                        {showPrimaryButton && onPrimaryButtonClick && (
                            <Button
                                variant="add" // same look as your ListComponent "Add" button
                                size="sm"
                                onClick={onPrimaryButtonClick}
                                disabled={disablePrimaryButton}
                                leftIcon={<Icons.CirclePlus className="w-5 h-5" />}
                            >
                                {primaryButtonText}
                            </Button>
                        )}
                    </div>
                </div>

                <div className="border-t border-form-default" />

                {/* Table Section — adds a first checkbox column for multiselect */}
                <DirectionAwareTable
                    wrapperClassName="max-h-[600px]"
                    className="min-w-full text-left"
                >
                        <thead className="text-gray-dark/90 font-medium border-b border-form-default">
                        <tr>
                            <th className="px-6 py-3 w-[40px]">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4"
                                    checked={allVisibleChecked}
                                    onChange={(e) =>
                                        onToggleAllVisible?.(allVisibleIds, e.currentTarget.checked)
                                    }
                                />
                            </th>
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    className={`px-6 py-3 whitespace-nowrap text-${
                                        col.align || "left"
                                    } ${col.widthClass || ""}`}
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-form-default text-form-text">
                        {!loading && sortedData.length > 0 ? (
                            sortedData.map((row) => {
                                const id = rowId(row);
                                return (
                                    <tr key={id} className="hover:bg-gray-soft">
                                        <td className="px-6 py-3">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4"
                                                checked={selectedIds.has(id)}
                                                onChange={() => onToggleRow(id)}
                                            />
                                        </td>
                                        {columns.map((col, j) => (
                                            <td
                                                key={j}
                                                className={`px-6 py-3 whitespace-nowrap text-text-list text-${
                                                    col.align || "left"
                                                }`}
                                            >
                                                {col.render ? col.render(row) : (row as any)[col.accessor]}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        ) : !loading ? (
                            <tr>
                                <td
                                    colSpan={columns.length + 1}
                                    className="text-center py-6 text-gray-base"
                                >
                                    No data available
                                </td>
                            </tr>
                        ) : null}
                        </tbody>
                </DirectionAwareTable>

                {/* Pagination — same wrapper/border/padding */}
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

export default MultiSelectList;
