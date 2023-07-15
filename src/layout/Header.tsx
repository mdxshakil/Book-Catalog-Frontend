import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signOut } from "firebase/auth";
import { setUser } from "../redux/features/auth/authSlice";
import { auth } from "../lib/firebase";
import { navLinks } from "../constants";
import { BiSolidBookHeart } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
    });
  };

  return (
    <div className="shadow-sm w-full fixed top-0 left-0 z-10">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        {/* logo section */}
        <div
          className="font-bold text-2xl cursor-pointer flex items-center gap-1"
          onClick={() => navigate("/")}
        >
          <BiSolidBookHeart className="w-7 h-7 text-blue-600" />
          <span>BOOKBLISS</span>
        </div>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-8 h-8"
        >
          {open ? <GrClose /> : <GiHamburgerMenu />}
        </div>
        {/* linke items */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-16" : "top-[-490px]"
          }`}
        >
          {navLinks.map((link, index) => (
            <span key={index} className="md:ml-8 md:my-0 my-7 font-semibold">
              <li>
                <Link to={`${link.link}`}>
                  <a className="text-gray-800 hover:text-blue-400 duration-500">
                    {link.name}
                  </a>
                </Link>
              </li>
            </span>
          ))}

          {user?.email ? (
            <button
              className="btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to={"login"}>
              <button className="btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static">
                Login
              </button>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
