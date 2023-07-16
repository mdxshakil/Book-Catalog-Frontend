import BookCard from "../components/BookCard";
import Spinner from "../components/Spinner";
import ErrorElement from "../components/ui/ErrorElement";
import { useGetAllBooksQuery } from "../redux/features/book/book.api";
import { IBook } from "../types/globalTypes";
import { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import Filter from "../components/Filter";
import SearchBox from "../components/SearchBox";

const AllBooks = () => {
  const { data: books, isLoading, isError } = useGetAllBooksQuery(undefined);
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

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

  //Book result according to the filter and search
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
      const publicationYear = new Date(book.publicationDate)
        .getFullYear()
        .toString();
      return publicationYear === selectedYear;
    });
  }

  let content = null;
  if (isLoading) {
    content = <Spinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load books" />;
  } else if (!isLoading && !isError && !searchedBooks?.length) {
    content = <p>Reading list is empty</p>;
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12 p-6">
        {searchedBooks.map((book: IBook) => (
          <BookCard book={book} key={book._id} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-3 p-3">
        <SearchBox
          searchText={searchText}
          handleInputChange={handleInputChange}
        />
        <Filter
          selectedGenre={selectedGenre}
          handleGenreChange={handleGenreChange}
          selectedYear={selectedYear}
          handleYearChange={handleYearChange}
          handleClearFilters={handleClearFilters}
        />
        {user?.email && (
          <button
            className="bg-blue-400 px-2 text-white rounded-full py-1 hover:bg-blue-500"
            onClick={() => navigate("/add-new-book")}
          >
            Add New Book
          </button>
        )}
        {content}
      </div>
    </div>
  );
};

export default AllBooks;
