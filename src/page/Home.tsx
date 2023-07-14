import BookCard from "../components/BookCard";
import Spinner from "../components/Spinner";
import ErrorElement from "../components/ui/ErrorElement";
import Footer from "../layout/Footer";
import { useGetLatestBooksQuery } from "../redux/features/book/book.api";
import { IBook } from "../types/globalTypes";

const Home = () => {
  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useGetLatestBooksQuery(undefined);
  

  let content = null;
  if (isLoading) {
    content = <Spinner />;
  } else if (!isLoading && isError && error) {
    content = <ErrorElement message="Failed to load books" />;
  } else if (!isLoading && !isError && !books?.data?.length) {
    content = <p>No books available</p>;
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12 p-6 mb-12">
        {books?.data?.map((book: IBook) => (
          <BookCard book={book} key={book._id} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-8 text-blue-900">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Recently Added Books
          </span>
        </h1>
        {content}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
