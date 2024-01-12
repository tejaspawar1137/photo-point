"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Loader = dynamic(() => import("../Loader/Loader"), { ssr: false });
import dynamic from "next/dynamic";
import { updateUserRole } from "@/app/redux/actions/userAction";
import { Transition } from "react-transition-group";
import { usePathname } from "next/navigation";

const NavBar = ({ content }: any) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [activeOption, setActiveOption] = useState("");
  const [loading, setLoading] = useState(false);
  const userRoleFromRedux = useSelector(
    (state) => (state as any).userReducer.role
  );
  const [role, setRole] = useState<any>("");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getCookie = (name: any) => {
    if (typeof document !== "undefined") {
      let nameEQ = name + "=";
      let cookies = document?.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === " ") {
          cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
          return cookie.substring(nameEQ.length, cookie.length);
        }
      }
      return null;
    }
    return null;
  };

  const deleteCookie = (name: any) => {
    if (typeof document !== "undefined") {
      (document as any).cookie =
        name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    return null;
  };

  useEffect(() => {
    const userRole = getCookie("role");
    setRole(userRole);
  }, [userRoleFromRedux]);

  const HandleLoggout = () => {
    deleteCookie("role");
    dispatch(updateUserRole(""));
    setLoading(true);
    setLoading(false);
  };
  const transitionStyles: any = {
    entering: {
      transform: "translateX(-100%)",
      transition: "transform 0.2s ease-in-out",
    },
    entered: {
      transform: "translateX(0%)",
      transition: "transform 0.2s ease-in-out",
    },
    exiting: {
      transform: "translateX(-100%)",
      transition: "transform 0.2s ease-in-out",
    },
    exited: {
      transform: "translateX(-100%)",
      transition: "transform 0.2s ease-in-out",
    },
  };
  const duration = 50;
  const defaultStyle = {
    transition: `transform ${duration}ms ease-in-out`,
    transform: "translateX(-100%)",
  };

  const handleOptionClick = (option: any) => {
    setActiveOption(option);
  };

  return ( 
    <div style={{ zIndex: 4000 }} className=" fixed top-0 w-full">
      {loading ? (
        <Loader></Loader>
      ) : (
        <Transition
          in={mobileMenuOpen}
          timeout={200}
          mountOnEnter
          unmountOnExit
        >
          {(state) => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
              className={`navbar-menu fixed inset-0 bg-gray-800 bg-opacity-25 z-50 ${
                state === "exited" ? "hidden" : ""
              }`}
            >
              <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
              <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
                <div className="flex items-center mb-8">
                  <Link
                    className="mr-auto text-3xl font-bold leading-none"
                    href="/"
                  >
                    <img
                      src="/assets/Icons/logo.png"
                      className="h-[11rem] xs:h-[12rem] object-contain w-[25rem]"
                    ></img>
                    <hr></hr>
                  </Link>
                  <button className="navbar-close" onClick={toggleMobileMenu}>
                    <svg
                      className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div>
                  <ul>
                    <li className="mb-1">
                      <Link
                        className={`block p-4 text-sm ${
                          pathname === "/" ? "text-blue-500 " : "text-zinc-700"
                        } font-semibold font-sans   focus:text-blue-600 rounded`}
                        href="/"
                      >
                        Home
                      </Link>
                    </li>
                    <hr></hr>

                    <li className="mb-1">
                      <Link
                        className={`block ${
                          pathname === "/components/About" ? "text-blue-500 " : "text-zinc-700"
                        } p-4 text-sm font-semibold font-sans focus:text-blue-600 rounded`}
                        href="/components/About"
                      >
                        About Us
                      </Link>
                    </li>
                    <hr></hr>

                    <li className="mb-1">
                      <Link
                        className={`block ${
                          pathname === "/components/Services/Photography" ? "text-blue-500 " : "text-zinc-700"
                        } p-4 text-sm font-semibold focus:text-blue-600 rounded`}
                        href="/components/Services/Photography"
                      >
                        Photography
                      </Link>
                    </li>
                    <hr></hr>

                    <li className="mb-1">
                      <Link
                        className={`block ${
                          pathname === "/components/Services/VideoProduction" ? "text-blue-500 " : "text-zinc-700"
                        } p-4 text-sm font-semibold focus:text-blue-600 rounded`}
                        href="/components/Services/VideoProduction"
                      >
                        Videography
                      </Link>
                      <hr></hr>
                    </li>
                    <li className="mb-1">
                      <Link
                        className={`block p-4 text-sm ${
                          pathname === "/components/ClientGallery" ? "text-blue-500 " : "text-zinc-700"
                        } font-semibold focus:text-blue-600 rounded`}
                        href="/components/ClientGallery"
                      >
                        Client Gallery
                      </Link>
                    </li>
                    <hr></hr>

                    <li className="mb-1">
                      <Link
                        className={`block ${pathname==="/components/Contact"?"text-blue-500 " : "text-zinc-700"} p-4 text-sm font-semibold focus:text-blue-600 rounded`}
                        href="/components/Contact"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto">
                  <div className="pt-6">
                    {role ? (
                      <button
                        className="block px-4 sm: w-[219px]  font-sans py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-500 hover:bg-blue-400 rounded-xl"
                        onClick={HandleLoggout}
                      >
                        Logout
                      </button>
                    ) : (
                      <div className="flex flex-col ">
                        <Link
                          className="block px-5 py-3 mb-2  font-sans leading-loose text-xs text-center text-black font-semibold bg-gray-200 hover:bg-gray-100  rounded-xl"
                          href="/components/Login"
                        >
                          Log In
                        </Link>
                      </div>
                    )}
                  </div>
                  <p className="my-4 text-xs text-center text-white">
                    <span>Copyright © 2023</span>
                  </p>
                </div>
              </nav>
            </div>
          )}
        </Transition>
      )}

      {loading ? (
        <Loader></Loader>
      ) : (
        // from-transparent to-black bg-opacity-30 backdrop-blur-[2px]
        <nav className="relative bg-white  w-full top-0 px-1 xs:px-4 py-5 flex sm:justify-unset items-center lg:justify-between ">
          <Link className=" flex  items-center font-bold leading-none" href="/">
            <div className="flex flex-col -translate-x-6 xs:-translate-x-7 sm:-translate-x-0 scale-75 sm:scale-100 text-purple-950 items-center">
              <div className="font-extrabold flex items-center uppercase font-Penna relative text-4xl">
                <span className=" tracking-wider">Dheeraj </span>
                <span className=" pl-3  tracking-wider">Photo</span>
                <div className="absolute w-full -bottom-[0.4rem] h-[2px] bg-purple-950"></div>
                <div className="  w-full absolute z-10 flex justify-center -bottom-[0.6rem]">
                  <div className="text-xs bg-white tracking-wider  px-1 text-center  font-Bavro uppercase">
                    Point
                  </div>
                </div>
              </div>
            </div>
            {/* <img
              src="/assets/Icons/logo.png"
              className="absolute top-0 object-contain left-0 translate-y-2  -translate-x-[4.3rem] sm:-translate-y-1  sm:-translate-x-[5rem] h-[5rem] w-[13rem]   sm:h-[7rem]  sm:w-[18rem] "
            ></img>
            <span
              style={{
                textShadow:
                  content === "black"
                    ? "2px 2px 4px rgba(0, 0, 0, 0.1)"
                    : "2px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              className=" pl-[4.3rem] xs:pl-[3.5rem] sm:pl-[6.3rem] pt-2 font-Audrey font-extrabold text-[#cc9933] uppercase text-2xl  sm:text-4xl "
            >
              Photography
            </span> */}
          </Link>
          <div className="ml-auto   xl:hidden">
            {/* ${
                content !== "black" ? "bg-gray-800 bg-opacity-[0.25]" : ""
              }  */}
            <button
              onClick={toggleMobileMenu}
              className={`navbar-burger flex items-center p-2 
            rounded-md text-blue-600 `}
            >
              <svg
                className="block h-5 w-5 sm:h-6 sm:w-6 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  // fill={content === "black" ? `black` : "white"}
                  fill="black"
                  d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                  // style={{ filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))" }}
                ></path>
              </svg>
            </button>
          </div>
          <ul className="hidden    pl-16  w-[50%]  absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 xl:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-2 2xl:space-x-4">
            <li>
              <Link
                // style={{
                //               textShadow:
                //              content === "black" ? "" : "2px 2px 4px rgba(0, 0, 0, 0.5)",
                //       }}
                className={`text-sm pb-[0.1rem] font-bold ${
                  pathname === "/"
                    ? "text-blue-500 border-b border-b-blue-500"
                    : content === "black"
                    ? " text-zinc-700"
                    : "text-zinc-700"
                } hover:text-blue-500 hover:border-b hover:border-b-blue-500 transition focus:border-b focus:border-b-blue-500`}
                href="/"
                onClick={() => handleOptionClick("home")}
              >
                Home
              </Link>
            </li>
            <li
              style={{
                textShadow:
                  content === "black" ? "" : "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
              className="text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4 current-fill"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </li>
            <li>
              <Link
                // style={{
                //               textShadow:
                //              content === "black" ? "" : "2px 2px 4px rgba(0, 0, 0, 0.5)",
                //       }}
                className={`text-sm pb-[0.1rem] font-bold ${
                  pathname === "/components/About"
                    ? "text-blue-500 border-b border-b-blue-500"
                    : content === "black"
                    ? "text-zinc-700"
                    : "text-zinc-700"
                } hover:text-blue-500 hover:border-b hover:border-b-blue-500 transition focus:border-b focus:border-b-blue-500`}
                href="/components/About"
                onClick={() => handleOptionClick("About")}
              >
                About Us
              </Link>
            </li>
            <li
              style={{
                textShadow:
                  content === "black" ? "" : "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
              className="text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4 current-fill"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </li>
            <li>
              <Link
                // style={{
                //               textShadow:
                //              content === "black" ? "" : "2px 2px 4px rgba(0, 0, 0, 0.5)",
                //       }}
                className={`text-sm pb-[0.1rem] font-bold ${
                  pathname === "/components/Services/Photography"
                    ? "text-blue-500 border-b border-b-blue-500"
                    : content === "black"
                    ? "text-zinc-700"
                    : "text-zinc-700"
                } hover:text-blue-500 hover:border-b hover:border-b-blue-500 transition focus:border-b focus:border-b-blue-500`}
                href="/components/Services/Photography"
                onClick={() => handleOptionClick("photography")}
              >
                Photography
              </Link>
            </li>
            <li
              style={{
                textShadow:
                  content === "black" ? "" : "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
              className="text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4 current-fill"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </li>
            <li>
              <Link
                // style={{
                //               textShadow:
                //              content === "black" ? "" : "2px 2px 4px rgba(0, 0, 0, 0.5)",
                //       }}
                className={`text-sm pb-[0.1rem] font-bold ${
                  pathname === "/components/Services/VideoProduction"
                    ? "text-blue-500 border-b border-b-blue-500"
                    : content === "black"
                    ? "text-zinc-700"
                    : "text-zinc-700"
                } hover:text-blue-500 hover:border-b hover:border-b-blue-500 transition focus:border-b focus:border-b-blue-500`}
                href="/components/Services/VideoProduction"
                onClick={() => handleOptionClick("videography")}
              >
                Videography
              </Link>
            </li>
            <li
              style={{
                textShadow:
                  content === "black" ? "" : "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
              className="text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4 current-fill"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </li>
            <li>
              <Link
                // style={{
                //               textShadow:
                //              content === "black" ? "" : "2px 2px 4px rgba(0, 0, 0, 0.5)",
                //       }}
                className={`text-sm pb-[0.1rem] font-bold ${
                  pathname === "/components/ClientGallery"
                    ? "text-blue-500 border-b border-b-blue-500"
                    : content === "black"
                    ? "text-zinc-700"
                    : "text-zinc-700"
                } hover:text-blue-500 hover:border-b hover:border-b-blue-500 transition focus:border-b focus:border-b-blue-500`}
                href="/components/ClientGallery"
                onClick={() => handleOptionClick("clientGallery")}
              >
                Client Gallery
              </Link>
            </li>
            <li
              style={{
                textShadow:
                  content === "black" ? "" : "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
              className="text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4 current-fill"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </li>
            <li>
              <Link
                // style={{
                //               textShadow:
                //              content === "black" ? "" : "2px 2px 4px rgba(0, 0, 0, 0.5)",
                //       }}
                className={`text-sm pb-[0.1rem] font-bold ${
                  pathname === "/components/Contact"
                    ? "text-blue-500 border-b border-b-blue-500"
                    : content === "black"
                    ? "text-zinc-700"
                    : "text-zinc-700"
                } hover:text-blue-500 hover:border-b hover:border-b-blue-500 transition focus:border-b focus:border-b-blue-500`}
                href="/components/Contact"
                onClick={() => handleOptionClick("Contact")}
              >
                Contact
              </Link>
            </li>
          </ul>
          {role ? (
            <button
              className="hidden xl:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-blue-500 text-white hover:bg-blue-300 text-sm font-bold  rounded-xl transition duration-200"
              onClick={HandleLoggout}
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-10">
              <Link
                className="hidden xl:inline-block lg:ml-auto lg:mr-3 py-3 px-8 bg-blue-500 text-white hover:bg-blue-600 text-sm font-bold  rounded-xl transition duration-200"
                href="/components/Login"
              >
                Log In
              </Link>
            </div>
          )}
        </nav>
      )}
    </div> 
  );
};

export default NavBar;
