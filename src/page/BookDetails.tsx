import { useNavigate, useParams } from "react-router-dom";
import BookReview from "./BookReview";
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "../redux/features/book/book.api";
import moment from "moment";
import Spinner from "../components/Spinner";
import ErrorElement from "../components/ui/ErrorElement";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import Swal from "sweetalert2";
import placeHolder from "../assets/images/placeholder.jpg";
import { useAppSelector } from "../redux/hooks";
import { FcReading } from "react-icons/fc";
import { BiSolidCartAdd } from "react-icons/bi";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetSingleBookQuery(id);
  const [deleteBook, { isSuccess }] = useDeleteBookMutation();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleDeleteBook = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook(id);
        navigate("/");
        Swal.fire("Deleted!", "The book has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book deleted successfully");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  let content = null;
  if (isLoading) {
    content = <Spinner />;
  } else if (!isLoading && isError && error) {
    content = <ErrorElement message="Invalid request" />;
  } else {
    content = (
      <>
        <div className="mx-auto px-4 max-w-4xl">
          <div className="bg-white shadow-xl rounded-lg mb-6 tracking-wide">
            <div className="md:flex-shrink-0">
              <img
                src={data?.data?.image ? data.data.image : placeHolder}
                alt="mountains"
                className="w-full h-64 rounded-lg rounded-b-none object-cover"
              />
            </div>
            <div className="px-4 py-2 mt-2">
              <div className="flex justify-between">
                <h2 className="font-bold text-2xl text-gray-800 tracking-normal">
                  {data?.data?.title}
                </h2>
                {/* wishlist and reading list buttons */}
                {user?.email === data?.data?.userEmail && (
                  <div className="flex items-center gap-4">
                    <button
                      className="flex items-center gap-3 border-[1px] border-black rounded-full px-2 hover:bg-black hover:text-white transition duration-200"
                      onClick={() => navigate(`/edit-book/${data?.data?._id}`)}
                    >
                      Wishlist
                      <BiSolidCartAdd />
                    </button>
                    <button
                      className="flex items-center gap-3 border-[1px] border-black rounded-full px-2 hover:bg-black hover:text-white transition duration-200"
                      onClick={handleDeleteBook}
                    >
                      ReadingList
                      <FcReading />
                    </button>
                  </div>
                )}
              </div>
              <small className="bg-green-500 inline px-2 rounded-full text-white">
                #{data?.data?.genre}
              </small>
              <p className="text-sm text-gray-700 px-2 mr-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
                reiciendis ad architecto at aut placeat quia, minus dolor
                praesentium officia maxime deserunt porro amet ab debitis
                deleniti modi soluta similique...
              </p>
              <div>
                <div className="author flex items-center -ml-3 my-3">
                  <h2 className="text-sm tracking-tighter text-gray-900">
                    <p>By: {data?.data?.author}</p>
                    <span className="text-gray-600">
                      At: {moment(data?.data?.publicationDate).format("LL")}
                    </span>
                  </h2>
                </div>
                <div>
                  {/* edit and delete buttons */}
                  {user?.email === data?.data?.userEmail && (
                    <div className="flex items-center gap-4">
                      <button
                        className="flex items-center gap-3 bg-green-400 px-2 rounded-full text-white hover:bg-green-500"
                        onClick={() =>
                          navigate(`/edit-book/${data?.data?._id}`)
                        }
                      >
                        Edit
                        <FaEdit />
                      </button>
                      <button
                        className="flex items-center gap-3 bg-red-400 px-2 rounded-full text-white hover:bg-red-500"
                        onClick={handleDeleteBook}
                      >
                        Delete
                        <AiFillDelete />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <BookReview reviews={data?.data?.reviews} id={data?.data?._id} />
      </>
    );
  }

  return <>{content}</>;
};

export default BookDetails;
