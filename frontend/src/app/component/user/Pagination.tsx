// Pagination.tsx
type PaginationProps = {
  totalPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ totalPage, currentPage, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
  return (
    <div className="flex gap-2 justify-center mt-6">
      {pages.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded ${
            page === currentPage ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
