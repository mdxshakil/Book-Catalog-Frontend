import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../page/Home";
import AllBooks from "../page/AllBooks";
import Login from "../page/Login";
import Signup from "../page/Signup";
import NotFound from "../page/NotFound";
import AddNewBook from "../page/AddNewBook";
import BookDetails from "../page/BookDetails";
import EditBook from "../page/EditBook";
import WishList from "../page/WishList";
import ReadingList from "../page/ReadingList";
import PrivateRoutes from "../components/PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoutes>
            <AddNewBook />
          </PrivateRoutes>
        ),
      },
      {
        path: "/book-details/:id",
        element: <BookDetails />,
      },
      {
        path: "/edit-book/:id",
        element: (
          <PrivateRoutes>
            <EditBook />
          </PrivateRoutes>
        ),
      },
      {
        path: "/wish-list",
        element: <WishList />,
      },
      {
        path: "/reading-list",
        element: <ReadingList />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
