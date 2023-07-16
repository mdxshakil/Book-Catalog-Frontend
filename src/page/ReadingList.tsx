import { useGetReadingListQuery } from "../redux/features/readinglist/readinglist.api";
import { useAppSelector } from "../redux/hooks";
import Spinner from "../components/Spinner";
import ErrorElement from "../components/ui/ErrorElement";
import { IReadingListItem } from "../types/globalTypes";
import ReadingListCard from "../components/ReadingListCard";

const ReadingList = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading, isError } = useGetReadingListQuery(user?.email);

  let content = null;
  if (isLoading) {
    content = <Spinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load reading list" />;
  } else if (!isLoading && !isError && !data?.data?.length) {
    content = <p>Reading list is empty</p>;
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12 p-6 mb-12">
        {data?.data?.map((book: IReadingListItem) => (
          <ReadingListCard book={book} key={book._id} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-8 text-blue-900">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Reading List
          </span>
        </h1>
        {content}
      </div>
    </div>
  );
};

export default ReadingList;
