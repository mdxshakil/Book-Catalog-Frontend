import BookCard from "../components/BookCard";
import Spinner from "../components/Spinner";
import ErrorElement from "../components/ui/ErrorElement";
import SearchBar from "../components/ui/SearchBar";
import { useGetAllBooksQuery } from "../redux/features/book/book.api";
import { IBook } from "../types/globalTypes";

const AllBooks = () => {
  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useGetAllBooksQuery(undefined);

  let content = null;
  if (isLoading) {
    content = <Spinner />;
  } else if (!isLoading && isError && error) {
    content = <ErrorElement message="Failed to laod books" />;
  } else if (!isLoading && !isError && !books?.data?.length) {
    content = <p>No books available</p>;
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 p-6">
        {books?.data?.map((book: IBook) => (
          <BookCard book={book} key={book._id} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-3 p-3">
        <SearchBar />
        {content}
      </div>
    </div>
  );
};

export default AllBooks;
