import { useNavigate } from "react-router-dom";
import { IBook } from "../types/globalTypes";
import moment from "moment";

interface IProps {
  book: IBook;
}

const BookCard = ({ book }: IProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="hover:scale-110 transition duration-200 cursor-pointer"
      onClick={() => navigate(`/book-details/${book._id!}`)}
    >
      <img
        src="https://source.unsplash.com/random/350x350"
        alt=" random imgee"
        className="w-full object-cover object-center rounded-lg shadow-md"
      />
      <div className="relative px-4 -mt-16  ">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-baseline">
            <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
              New
            </span>
          </div>

          <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
            {book.title}
          </h4>

          <div className="mt-1 text-gray-600">{book.author}</div>
          <div className="mt-1 text-gray-600">{moment(book.publicationDate).format('ll')}</div>
          <div className="mt-4">
            <span className="text-md bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
              {book.genre}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
