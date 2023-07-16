import { useEffect } from "react";
import { IWishlistItem } from "../types/globalTypes";
import placeHolder from "../assets/images/placeholder.jpg";
import {
  useRemoveFromWishlistMutation,
  useUpdateQuantityMutation,
} from "../redux/features/wishlist/wishlist.api";
import { toast } from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

type IProps = {
  item: IWishlistItem;
};

const WishlistCard = ({ item }: IProps) => {
  const { book, quantity } = item || {};
  const navigate = useNavigate();

  const [removeFromWishlist, { isLoading, isError, isSuccess }] =
    useRemoveFromWishlistMutation();

  const [updateQuantity] = useUpdateQuantityMutation();

  const handleRemoveFromWishList = () => {
    removeFromWishlist(item?._id);
  };

  const handleQuantityUpdate = (action: string) => {
    updateQuantity({ itemId: item?._id, action });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Item deleted successfully");
    }
    if (isError) {
      toast.error("Failed to delete");
    }
  }, [isSuccess, isError]);

  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img
        src={book?.image ? book.image : placeHolder}
        alt="book-image"
        className="w-20 h-20 rounded-full object-cover hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer"
        onClick={() => navigate(`/book-details/${book?._id}`)}
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{book?.title}</h2>
          <small className="bg-green-500 px-2 rounded-full text-white">
            #{book?.genre}
          </small>
          <p>{book?.author}</p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <button
              disabled={quantity === 1}
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
              onClick={() => handleQuantityUpdate("decrement")}
            >
              -
            </button>
            <div className="h-8 w-8 border bg-white flex items-center justify-center text-center text-xs outline-none">
              {quantity}
            </div>
            <button
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
              onClick={() => handleQuantityUpdate("increment")}
            >
              +
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={handleRemoveFromWishList} disabled={isLoading}>
              <RiDeleteBin5Line className="w-7 h-7 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
