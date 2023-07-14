import BookCard from "../components/BookCard";
import Footer from "../layout/Footer";
import { IBook } from "../types/globalTypes";

const Home = () => {

  const accessToken = document.cookie
  .split("; ")
  .find((cookie) => cookie.startsWith("accessToken="))
  ?.split("=")[1];

console.log(accessToken);

  // ! dummy data
  const books = [
    {
      _id: 1,
      title: "The Hitchhiker's Guide to the Galaxy",
      author: "Douglas Adams",
      genre: "Science Fiction",
      publicationDate: "1979-03-12",
    },
    {
      _id: 2,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      publicationDate: "1954-07-29",
    },
    {
      _id: 3,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      publicationDate: "1813-01-28",
    },
    {
      _id: 4,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Classic",
      publicationDate: "1960-07-11",
    },
    {
      _id: 5,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Coming of Age",
      publicationDate: "1951-07-16",
    },
    {
      _id: 6,
      title: "1984",
      author: "George Orwell",
      genre: "Dystopia",
      publicationDate: "1949-06-08",
    },
    {
      _id: 7,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic",
      publicationDate: "1925-04-10",
    },
    {
      _id: 8,
      title: "The Hunger Games",
      author: "Suzanne Collins",
      genre: "Young Adult",
      publicationDate: "2008-09-14",
    },
    {
      _id: 9,
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      genre: "Fantasy",
      publicationDate: "1997-06-26",
    },
    {
      _id: 10,
      title: "The Da Vinci Code",
      author: "Dan Brown",
      genre: "Thriller",
      publicationDate: "2003-03-18",
    },
  ];

  return (
    <div>
      <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8 text-blue-900">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Recently Added Books
          </span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 p-6">
          {books.map((book: IBook) => (
            <BookCard book={book} key={book._id} />
          ))}
        </div>
      </div>
        <Footer />
    </div>
  );
};

export default Home;
