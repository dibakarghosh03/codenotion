import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

function MobileNavbar({ subLinks, NavbarLinks, user, token, totalItems, matchRoute, isMobileMenuOpen, setIsMobileMenuOpen }) {
    const [catalogBox, setCatalogBox] = useState(false);
  return (
    <div className="z-50 fixed top-12 translate-y-1 shadow-[0px_-1px_10px_0px_#4a5568]  rounded-lg bg-richblack-800 p-4 w-screen text-center">
      <nav className="flex flex-col gap-4">
        {NavbarLinks.map((link, index) => (
          <div key={index}>
            {link.title === "Catalog" ? (
              <div className="group relative flex flex-col items-center gap-1 transition-all duration-300 cursor-pointer">
                <p className="flex items-center gap-1 text-white " onClick={() => setCatalogBox(!catalogBox)}>
                  {link.title}
                  <IoIosArrowDown />
                </p>
                { catalogBox && (<div className="flex transition-all duration-300 mt-2 flex-col  pl-4 text-pureGreys-300" onClick={() => setIsMobileMenuOpen(false)}>
                  {subLinks
                    ?.filter((subLink) => subLink?.courses?.length > 0)
                    ?.map((subLink, i) => (
                      <Link
                        to={`/catalog/${subLink.name
                          .split(" ")
                          .join("-")
                          .toLowerCase()}`}
                        className="py-1 pl-2 text-[14px] hover:bg-richblack-50"
                        key={i}
                      >
                        {subLink.name}
                      </Link>
                    ))}
                </div>)}
              </div>
            ) : (
              <Link to={link?.path} onClick={() => setIsMobileMenuOpen(false)}>
                <p
                  className={`${
                    matchRoute(link?.path)
                      ? "text-yellow-50"
                      : "text-richblack-25"
                  }`}
                >
                  {link.title}
                </p>
              </Link>
            )}
          </div>
        ))}
      </nav>
      <div className="flex flex-col items-start gap-4 mt-4">
        {user && user?.accountType !== "instructor" && (
          <Link to={"/dashboard/cart"} className="relative text-white w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>
            Cart
            {totalItems > 0 && (
              <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                {totalItems}
              </span>
            )}
          </Link>
        )}
        {token === null ? (
          <div className="w-full space-y-4 flex-col">
            <div>
                <Link to={"/login"} onClick={() => setIsMobileMenuOpen(false)}>
                <button className="border-2 rounded-lg border-richblack-600 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                    Login
                </button>
                </Link>
            </div>
            <div>
                <Link to={"/signup"} onClick={() => setIsMobileMenuOpen(false)}>
                <button className="border-2 rounded-lg border-richblack-600 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                    Sign Up
                </button>
                </Link>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default MobileNavbar;
