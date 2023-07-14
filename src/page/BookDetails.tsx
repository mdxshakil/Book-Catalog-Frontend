import { useParams } from "react-router-dom";
import BookReview from "./BookReview";

const BookDetails = () => {
  const { id } = useParams();
  const book = {
    _id: 10,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Thriller",
    publicationDate: "2003-03-18",
    reviews: ["Wow very good", "Life changing book", "Very inspiring"],
  };
  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src="https://source.unsplash.com/random/350x350" alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{book?.title}</h1>
          <button>Add to wishlist</button>
          <button>Add to readinglist</button>
        </div>
      </div>
      <BookReview id={id!} />
    </>
  );
};

export default BookDetails;
