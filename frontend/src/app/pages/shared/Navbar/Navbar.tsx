/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { RiAccountCircleFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
// import { useAppDispatch, useAppSelector } from "../../../redux/Hooks";
// import { logoutUser } from "../../../redux/features/auth/AuthSlice/AuthSlice";

import Navigation from "../../../component/user/DesktopNAvigation";
import MobileNavigation from "../../../component/user/MobileNavigation";
import Cart from "../../../component/user/Cart";
import SearchItem from "../../../component/user/SearchItem";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [queryParams, setQueryParams] = useState({ search: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const user = useAppSelector((state) => state.auth.user) as { id?: string } | null;
  // const dispatch = useAppDispatch();

  // Handle live search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setQueryParams({ search: searchValue });
    }, 200);
    return () => clearTimeout(timer);
  }, [searchValue]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close menu when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as Element).id === "backdrop") {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navigation />
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-white/10"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Center: Logo */}
          <a href="/" className="text-xl font-bold">
            WildTrail Gear
          </a>

          {/* Right: Cart and Search */}
          <div className="flex items-center gap-4">
            <Cart />
            <button onClick={() => setModalOpen(!modalOpen)} className="text-xl">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Mobile Search Modal */}
        {modalOpen && (
          <div className="fixed inset-4 z-50 flex items-start justify-center pt-12 px-4"
           id="search-backdrop"
          onClick={(e) => {
        if ((e.target as HTMLElement).id === "search-backdrop") {
        setModalOpen(false);
      }
    }}
          >
            <div className="w-full max-w-md relative">
              <input
                autoFocus
                type="text"
                className="w-full p-2 rounded bg-primary text-white border-none outline-none"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchValue.trim()) {
                    setModalOpen(false);
                  }
                }}
              />
              {searchValue && (
              <div className="">
                  <SearchItem
                  queryParams={queryParams}
                  setSearchValue={(val: any) => {
                    setSearchValue(val);
                    setModalOpen(false);
                  }}
                />
              </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Slide Menu */}
        {isMobileMenuOpen && (
          <div
            id="backdrop"
            onClick={handleBackdropClick}
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
          >
            <nav className="absolute top-0 left-0 w-72 h-full bg-primary shadow-xl z-50 p-4">
              <MobileNavigation setIsMobileMenuOpen={setIsMobileMenuOpen} />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
