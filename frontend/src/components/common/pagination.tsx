import React from "react";
import { Icons } from "@components/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePages = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages > 0) pages.push(1);
    if (currentPage > 3) pages.push("...");

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pagesToShow = generatePages();

  const handlePageClick = (page: number | string) => {
    if (page === "..." || page === currentPage) return;
    onPageChange(page as number);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Left Arrow */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`w-9 h-9 rounded outline outline-1 outline-offset-[-1px] inline-flex justify-center items-center
          ${
            currentPage === 1
              ? "bg-white opacity-30 outline-border-muted"
              : "bg-white text-form-text outline-border-muted cursor-pointer"
          }`}
      >
        <Icons.ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
      
      </button>

      {/* Page Numbers */}
      {pagesToShow.map((page, index) =>
        page === "..." ? (
          <div
            key={`ellipsis-${index}`}
            className="w-9 h-9 rounded inline-flex justify-center items-center"
          >
            <span className="text-form-text text-base font-semibold">...</span>
          </div>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => handlePageClick(page)}
            className={`w-9 h-9 rounded outline outline-1 outline-offset-[-1px] inline-flex justify-center items-center 
              text-base font-semibold transition
              ${
                page === currentPage
                  ? "bg-green-soft text-success outline-success"
                  : "bg-white text-form-text outline-border-muted cursor-pointer"
              }`}
          >
            {page}
          </button>
        )
      )}

      {/* Right Arrow */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`w-9 h-9 rounded outline outline-1 outline-offset-[-1px] inline-flex justify-center items-center 
          ${
            currentPage === totalPages
              ? "bg-white opacity-30 outline-border-muted"
              : "bg-white text-form-text outline-border-muted cursor-pointer"
          }`}
      >
        <Icons.ChevronRight
          className="w-5 h-5 text-form-text"
          strokeWidth={2.5}
        />
      </button>
    </div>
  );
};

export default Pagination;
