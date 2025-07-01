import { useState } from "react";

interface Props {
  onSearch: (searchValue: string) => void;
}
const SearchProduct = ({ onSearch }: Props) => {
  const [search, setSearch] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <div className="mx-auto w-full text-center ">
      <form onSubmit={handleSubmit} className="flex items-center justify-center gap-2">
        <div className="relative flex items-center border rounded px-3 py-2
         w-[55vh]  mb-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
            placeholder="Search"
            className="ml-2 w-full outline-none"
          />
           <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </g>
          </svg>
        </div>
      </form>
    </div>
  );
};

export default SearchProduct;
