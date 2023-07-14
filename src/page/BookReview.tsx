import { FiSend } from "react-icons/fi";

interface IProps {
  id: string;
}
const BookReview = ({ id }: IProps) => {
  // !dummy data
  const book = {
    _id: 10,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Thriller",
    publicationDate: "2003-03-18",
    reviews: ["Wow very good", "Life changing book", "Very inspiring"],
  };
  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center justify-center">
        <textarea className="w-3/5 outline-none border-teal-500 border-2 rounded-full px-3" placeholder="Leave your review" />
        <button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </button>
      </form>
      <div className="mt-10">
        {book?.reviews?.map((comment: string, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-2">
            <img src="https://github.com/shadcn.png" className="h-10 w-10 rounded-full border-2 border-teal-500" />
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookReview;
