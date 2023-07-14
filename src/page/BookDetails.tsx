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

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetSingleBookQuery(id);
  const [deleteBook, { isSuccess }] = useDeleteBookMutation();
  const navigate = useNavigate();

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
        <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
          <div className="w-[50%]">
            <img
              src={data?.data?.image ? data.data.image : placeHolder}
              alt=""
            />
          </div>
          <div className="w-[50%] space-y-3">
            <h1 className="text-3xl font-semibold">{data?.data?.title}</h1>
            <p>{data?.data?.author}</p>
            <p>{data?.data?.genre}</p>
            <p>{moment(data?.data?.publicationDate).format("ll")}</p>
            <button>Add to wishlist</button>
            <button>Add to readinglist</button>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-3 bg-green-400 px-2 rounded-full text-white hover:bg-green-500">
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
          </div>
        </div>
        <BookReview reviews={data?.data?.reviews} />
      </>
    );
  }

  return <>{content}</>;
};

export default BookDetails;
