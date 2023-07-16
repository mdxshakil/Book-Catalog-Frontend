import { Link } from "react-router-dom";
import { IReadingListItem } from "../types/globalTypes";
import placeHolder from "../assets/images/placeholder.jpg";
import moment from "moment";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  useRemoveFromreadingListMutation,
  useUpdateReadStatusMutation,
} from "../redux/features/readinglist/readinglist.api";

type IProps = {
  book: IReadingListItem;
};

const ReadingListCard = ({ book: prop }: IProps) => {
  const { book, _id, hasRead } = prop || {};
  const [removeFromReadingList, { isSuccess, isError, isLoading }] =
    useRemoveFromreadingListMutation();
  const [
    updateReadStatus,
    {
      isLoading: updateLoading,
      isError: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateReadStatusMutation();

  const handleRemoveFromReadingList = () => {
    removeFromReadingList(_id);
  };
  const handleUpdateReadStatus = () => {
    updateReadStatus(_id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Removed from reading list");
    }
    if (isError) {
      toast.error("Failed to remove from reading list");
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Updated read status");
    }
    if (updateError) {
      toast.error("Failed to mark as read");
    }
  }, [updateSuccess, updateError]);

  return (
    <div className="p-6 bg-white rounded-xl">
      <div className="group">
        <div className="overflow-hidden">
          <img
            src={book?.image ? book.image : placeHolder}
            className="w-full h-48 object-cover hover:scale-105 transition-all duration-200 ease-in-out"
            alt="Sample Cover"
          />
        </div>
        <h3
          className="mt-6 leading-normal text-gray-800 group-hover:text-blue-400 font-semibold text-2xl lg:text-4xl line-clamp-3 transition translation-all duration-200 ease-in-out"
          title="Lorem Ipsum is simply dummy text of the printing"
        >
          {book?.title}
        </h3>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-gray-500">
          {moment(book?.publicationDate).format("ll")}
          <span></span>
          <small className="ml-2 text-gray-600">{book?.author}</small>
        </div>
        <small className="bg-green-500 px-1 rounded-full text-white">
          #{book?.genre}
        </small>
        <p className="mt-6 leading-normal line-clamp-3 text-lg text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
          explicabo ipsa laudantium maxime nemo non numquam praesentium quia
          quidem reiciendis sint tempora temporibus tenetur, totam unde vel
          velit voluptas...
        </p>
      </div>
      <div className="flex items-center justify-between mt-6">
        <Link
          to={`/book-details/${book._id}`}
          className="inline-block text-blue-500 hover:text-gray-700"
        >
          Read More
        </Link>
        <div>
          {hasRead ? (
            <button
              className=" text-white bg-gray-500 px-1 rounded-full cursor-pointer"
              onClick={handleUpdateReadStatus}
              disabled={updateLoading}
            >
              <small>Mark as unread</small>
            </button>
          ) : (
            <button
              className="border-2 border-gray-500 text-gray-500 px-1 rounded-full cursor-pointer"
              onClick={handleUpdateReadStatus}
              disabled={updateLoading}
            >
              <small>Mark as read</small>
            </button>
          )}
        </div>
      </div>
      <div className="mt-4">
        <button
          className="bg-red-500 text-white px-4 rounded-lg flex items-center justify-center gap-3 py-1 hover:bg-red-600"
          onClick={handleRemoveFromReadingList}
          disabled={isLoading}
        >
          <RiDeleteBin5Line /> Remove
        </button>
      </div>
    </div>
  );
};

export default ReadingListCard;
