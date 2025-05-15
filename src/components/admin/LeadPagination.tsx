import React from 'react';
import { Button } from "@/components/ui/button";

interface LeadPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const LeadPagination: React.FC<LeadPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex justify-center items-center space-x-2 mt-4"
      role="navigation"
      aria-label="Pagination des leads"
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-gray-300 hover:text-white hover:bg-theme-red"
        aria-label="Page précédente"
      >
        Précédent
      </Button>

      <div className="flex space-x-1" role="group" aria-label="Pages de navigation">
        {getPageNumbers().map((pageNum) => (
          <Button
            key={pageNum}
            variant={pageNum === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(pageNum)}
            className={`min-w-[2.5rem] ${pageNum === currentPage ? 'bg-theme-red text-white' : 'text-gray-300 hover:text-white hover:bg-theme-red'}`}
            aria-label={`Page ${pageNum}`}
            aria-current={pageNum === currentPage ? "page" : undefined}
          >
            {pageNum}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-gray-300 hover:text-white hover:bg-theme-red"
        aria-label="Page suivante"
      >
        Suivant
      </Button>

      <div className="ml-4 text-sm text-gray-300" role="status" aria-live="polite">
        Page {currentPage} sur {totalPages}
      </div>
    </nav>
  );
};

export default LeadPagination;