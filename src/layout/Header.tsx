import { Link } from "react-router-dom";
import logo from "../assets/images/header-logo.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { setUser } from "../redux/features/auth/authSlice";

const Header = () => {
  const linkStyles =
    "text-green-500 hover:text-green-700 transition-all ease-in-out";

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
    });
  };
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <Link to={"/"}>
              <img className="h-20" src={logo} alt="log" />
            </Link>
          </div>
          <div>
            <ul className="flex items-center gap-6">
              <li>
                <Link to="/">
                  <a className={linkStyles}>Home</a>
                </Link>
              </li>
              <li>
                <Link to="/all-books">
                  <a className={linkStyles}>All Books</a>
                </Link>
              </li>
              <li>
                <Link to="/add-new-book">
                  <a className={linkStyles}>Add New Book</a>
                </Link>
              </li>
              <li>
                <Link to="/wish-list">
                  <a className={linkStyles}>Wish List</a>
                </Link>
              </li>
              <li>
                <Link to="/reading-list">
                  <a className={linkStyles}>Reading List</a>
                </Link>
              </li>
              {!user?.email ? (
                <li>
                  <Link to="/login">
                    <a className={linkStyles}>Login</a>
                  </Link>
                </li>
              ) : (
                <li>
                  <button className={linkStyles} onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
