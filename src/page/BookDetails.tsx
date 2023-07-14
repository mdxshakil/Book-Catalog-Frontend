import { useParams } from "react-router-dom";
import BookReview from "./BookReview";
import { useGetSingleBookQuery } from "../redux/features/book/book.api";
import moment from "moment";
import Spinner from "../components/Spinner";
import ErrorElement from "../components/ui/ErrorElement";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetSingleBookQuery(id);

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
            <img src="https://source.unsplash.com/random/350x350" alt="" />
          </div>
          <div className="w-[50%] space-y-3">
            <h1 className="text-3xl font-semibold">{data?.data?.title}</h1>
            <p>{data?.data?.author}</p>
            <p>{data?.data?.genre}</p>
            <p>{moment(data?.data?.publicationDate).format("ll")}</p>
            <button>Add to wishlist</button>
            <button>Add to readinglist</button>
          </div>
        </div>
        <BookReview reviews={data?.data?.reviews} />
      </>
    );
  }

  return <>{content}</>;
};

export default BookDetails;
