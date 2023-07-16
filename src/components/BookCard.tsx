import { useNavigate } from "react-router-dom";
import { IBook } from "../types/globalTypes";
import moment from "moment";
import placeHolder from "../assets/images/placeholder.jpg";

interface IProps {
  book: IBook;
}

const BookCard = ({ book }: IProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg flex cursor-pointer hover:scale-110 transition duration-200"
      onClick={() => navigate(`/book-details/${book._id!}`)}
    >
      <div className="w-1/3">
        <img
          className="object-cover object-center h-full"
          src={book?.image ? book.image : placeHolder}
          alt="Image"
        />
      </div>
      <div className="w-2/3 px-6 py-4">
        <div className="border-t-4 border-blue-500 mb-4"></div>
        <div className="font-bold text-xl mb-2">{book?.title}</div>
        <p className="text-gray-700 text-base">
          A brief description of the book.
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            <span className="mr-2 bg-green-500 px-1 rounded-full text-white">
              #{book?.genre}
            </span>
            <span className="mr-2">
              Published on: {moment(book?.publicationDate).format("ll")}
            </span>
            <span>By: {book?.author}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
