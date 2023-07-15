import BookCard from "../components/BookCard";
import Spinner from "../components/Spinner";
import ErrorElement from "../components/ui/ErrorElement";
import { useGetAllBooksQuery } from "../redux/features/book/book.api";
import { IBook } from "../types/globalTypes";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { bookGenres } from "../constants";

const AllBooks = () => {
  const { data: books, isLoading, isError, error } = useGetAllBooksQuery(undefined);
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  const handleClearFilters = () => {
    setSearchText("");
    setSelectedGenre("");
    setSelectedYear("");
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

  if (selectedGenre) {
    searchedBooks = searchedBooks.filter((book: IBook) => {
      const { genre } = book;
      return genre.toLowerCase() === selectedGenre.toLowerCase();
    });
  }

  if (selectedYear) {
    searchedBooks = searchedBooks.filter((book: IBook) => {
      const publicationYear = new Date(book.publicationDate).getFullYear().toString();
      return publicationYear === selectedYear;
    });
  }

  // Generate year options for the year selection dropdown
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1700 + 1 }, (_, index) => (
    <option key={index} value={currentYear - index}>
      {currentYear - index}
    </option>
  ));

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
        <div className="flex items-center gap-3">
          <label htmlFor="genre" className="text-gray-700 font-medium">
            Genre:
          </label>
          <select
            id="genre"
            className="border-2 rounded-md px-4 py-2 outline-none"
            value={selectedGenre}
            onChange={handleGenreChange}
          >
            <option value="">All Genres</option>
            {bookGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <label htmlFor="year" className="text-gray-700 font-medium">
            Publication Year:
          </label>
          <select
            id="year"
            className="border-2 rounded-md px-4 py-2 outline-none"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="">All Years</option>
            {yearOptions}
          </select>
          <button
            className="bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
        {isLoading ? (
          <Spinner />
        ) : isError && error ? (
          <ErrorElement message="Failed to load books" />
        ) : !searchedBooks.length ? (
          <p>No books available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12 p-6">
            {searchedBooks.map((book: IBook) => (
              <BookCard book={book} key={book._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;

