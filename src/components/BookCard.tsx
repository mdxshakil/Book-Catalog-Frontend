import { useNavigate } from "react-router-dom";
import { IBook } from "../types/globalTypes";
import moment from "moment";
import placeHolder from "../assets/images/placeholder.jpg";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import React, { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import {
  useAddToWishlistMutation,
  useGetSingleWishlistItemQuery,
} from "../redux/features/wishlist/wishlist.api";
import { toast } from "react-hot-toast";

interface IProps {
  book: IBook;
}

const BookCard = ({ book }: IProps) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  //get single wishlist item
  const { data: wishListItem } = useGetSingleWishlistItemQuery({
    userEmail: user?.email,
    bookId: book?._id,
  });

  const [
    addToWishlist,
    { isLoading: wishLoading, isError: wishError, isSuccess: wishSuccess },
  ] = useAddToWishlistMutation();

  //Add to wish list start
  const handleAddToWishList = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    addToWishlist({
      userEmail: user?.email,
      book: book?._id,
      quantity: 1,
    });
  };

  useEffect(() => {
    if (wishSuccess) {
      toast.success("Added to wishlist");
    }
    if (wishError) {
      toast.error("Failed to add to wishlist");
    }
  }, [wishSuccess, wishError]);
  //Add to wish list end

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg flex cursor-pointer hover:scale-105 transition duration-200"
      onClick={() => navigate(`/book-details/${book._id}`)}
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
        <div className="flex flex-col gap-3 mt-3">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <small className="mr-2 bg-green-500 px-1 rounded-full text-white">
              #{book?.genre}
            </small>
            <span className="mr-2">
              {moment(book?.publicationDate).format("ll")}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>By: {book?.author}</span>
            <div className="flex items-center justify-between gap-3">
              {!wishListItem?.data?.book?._id ||
              wishListItem?.data?.book?._id !== book?._id ? (
                <button onClick={handleAddToWishList} disabled={wishLoading}>
                  <AiOutlineHeart className="h-5 w-5 text-red-400" />
                </button>
              ) : (
                <button disabled>
                  <AiFillHeart className="h-5 w-5 text-red-300" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
