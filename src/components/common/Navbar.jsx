import { useSelector } from "react-redux";
import logo from "../../assets/Logo/Light-Logo.png";
import {NavbarLinks} from "../../data/navbar-links";
import { useLocation,matchPath,Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { IoMdClose, IoIosMenu } from "react-icons/io";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { useEffect, useState } from "react";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { IoIosArrowDown } from "react-icons/io";import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setToken } from "../../slices/authSlice";
import MobileNavbar from "./MobileNavbar";
import ProfileDropdown from "../core/Auth/ProfileDropDown";


function Navbar() {

    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            dispatch(setToken(token));
        }
    },[])

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);

    const [loading, setLoading] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async() => {
        try {
            const result = await apiConnector("GET",categories.CATEGORIES_API);
            setSubLinks(result.data.data);
        } catch (error) {
            console.log("Cannot fetch categories\n",error.message);
        }
    }

    useEffect( () => {
        fetchSubLinks()
    },[]);


    const matchRoute = (route) => {
        return matchPath({path:route},location.pathname);
    }
    return (
        <div 
            className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
                location.pathname !== "/" ? "bg-richblack-800" : ""
            } transition-all duration-300`}
        >
            <div className="w-11/12 max-w-maxContent mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to={"/"}>
                    <img src={logo} className="md:max-h-[60px] max-h-[50px]"/>
                </Link>

                {/* Links */}
                <nav className="hidden md:block">
                    <ul className="flex gap-x-8 text-richblack-25">
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {link.title === "Catalog" ? (
                                        <>
                                            <div 
                                            className={`group relative flex cursor-pointer items-center gap-1 ${
                                                matchRoute("/catalog/:catalogName")
                                                    ? "text-yellow-25"
                                                    : "text-richblack-25"
                                            }`}
                                            >
                                            <p>{link.title}</p>
                                            <IoIosArrowDown/>

                                            <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                                <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                                
                                                    {
                                                        loading ? ( <p className="text-center">Loading...</p>) : 
                                                        subLinks.length !== 0 ? (
                                                            
                                                            <>
                                                                {subLinks
                                                                ?.filter(
                                                                    (subLink) => subLink?.courses?.length > 0
                                                                )
                                                                ?.map((subLink, i) => (
                                                                    <Link
                                                                    to={`/catalog/${subLink.name
                                                                        .split(" ")
                                                                        .join("-")
                                                                        .toLowerCase()}`}
                                                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                                    key={i}
                                                                    >
                                                                    <p>{subLink.name}</p>
                                                                    </Link>
                                                                ))}
                                                            </>
                                                            
                                                        ) : (<div className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50 z-50">No Courses found</div>)
                                                    }
                                                
                                            </div>
                                        </div>
                                        </>
                                    ) 
                                    : 
                                    (
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path) ? "text-yellow-50" : "text-richblack-25" }`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )}
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* Signup, Login */}
                <div className="hidden items-center gap-x-4 md:flex">
                    {
                        user && user?.accountType !== "instructor" && (
                            <Link to={"/dashboard/cart"} className="relative  ">
                                <MdOutlineShoppingCart color="grey" size={22}/>
                                {
                                    totalItems > 0 && (
                                        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/login"}>
                                <button className="border-2 rounded-lg border-richblack-600 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                    Login
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/signup"}>
                                <button className="border-2 rounded-lg border-richblack-600 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && (
                            <ProfileDropDown/>
                        )
                    }
                </div>
                
                <div className="flex items-center md:hidden">
                    <button className="mr-4 md:hidden" onClick={() => {setIsMobileMenuOpen(!isMobileMenuOpen)}}>
                        {
                            isMobileMenuOpen ? <IoMdClose fontSize={24} fill="#AFB2BF"/> : <IoIosMenu fontSize={24} fill="#AFB2BF"/>
                        }
                    </button>
                    {
                        token !== null && (
                            <div className="md:hidden flex items-center">
                                <ProfileDropDown/>
                            </div>
                        )
                    }
                </div>
            </div>
            
                {isMobileMenuOpen && (
                    
                    <MobileNavbar
                    subLinks={subLinks}
                    NavbarLinks={NavbarLinks}
                    user={user}
                    token={token}
                    totalItems={totalItems}
                    matchRoute={matchRoute}
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                    />
                )}
            
        </div>
    )
}

export default Navbar