import BookCard from "../components/BookCard";
import Spinner from "../components/Spinner";
import ErrorElement from "../components/ui/ErrorElement";
import { useGetAllBooksQuery } from "../redux/features/book/book.api";
import { IBook } from "../types/globalTypes";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const AllBooks = () => {
  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useGetAllBooksQuery(undefined);
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  let searchedBooks = [...(books?.data ?? [])];
  if (searchText) {
    searchedBooks = searchedBooks.filter((book: IBook) => {
      const { genre, author, title } = book;
      const searchTextLower = searchText.toLowerCase();
      return (
        genre.toLowerCase().includes(searchTextLower) ||
        author.toLowerCase().includes(searchTextLower) ||
        title.toLowerCase().includes(searchTextLower)
      );
    });
  }

  let content = null;
  if (isLoading) {
    content = <Spinner />;
  } else if (!isLoading && isError && error) {
    content = <ErrorElement message="Failed to laod books" />;
  } else if (!isLoading && !isError && !searchedBooks.length) {
    content = <p>No books available</p>;
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12 p-6">
        {searchedBooks?.map((book: IBook) => (
          <BookCard book={book} key={book._id} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-3 p-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border-2 rounded-full px-8 py-2 outline-none sm:w-64 md:w-80 lg:w-96"
            onChange={handleInputChange}
          />
          <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
            <FaSearch />
          </div>
        </div>
        {content}
      </div>
    </div>
  );
};

export default AllBooks;
