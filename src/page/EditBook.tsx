import editBookImage from "../assets/images/editBook.png";
import { useForm } from "react-hook-form";
import {
  useEditBookMutation,
  useGetSingleBookQuery,
} from "../redux/features/book/book.api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { bookGenres, currentDate, minDate } from "../constants";

interface NewBookInputs {
  title: string;
  author: string;
  genre: string;
  image: string;
  userEmail: string;
  publicationDate: Date | string;
}

const EditBook = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewBookInputs>();

  const { data } = useGetSingleBookQuery(id);
  const { _id, author, genre, image, publicationDate, title } =
    data?.data || {};
  const formattedPublicationDate = publicationDate
    ? new Date(publicationDate).toISOString().split("T")[0]
    : "";
  const [editBook, { isSuccess, isLoading, isError }] = useEditBookMutation();

  // Add default values to the form
  useEffect(() => {
    reset({
      author,
      genre,
      image,
      publicationDate: formattedPublicationDate,
      title,
    });
  }, [
    reset,
    author,
    genre,
    image,
    publicationDate,
    title,
    formattedPublicationDate,
  ]);

  const onSubmit = (data: NewBookInputs) => {
    editBook({ id: _id, data });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edit successful");
    }
    if (isError) {
      toast.error("An error occured");
    }
  }, [isError, isSuccess]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-screen">
      {/* side image */}
      <div className="hidden md:block">
        <img
          src={editBookImage}
          alt="Add New Book"
          className="h-full w-full object-cover md:object-contain"
        />
      </div>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg px-6"
        >
          <h2 className="text-3xl font-bold mb-8">Edit book</h2>
          {/* author */}
          <div className="mb-6">
            <label
              htmlFor="author"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Author<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="author"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter author name"
              {...register("author", { required: "Author is required" })}
            />
            {errors.author && <p>{errors.author.message}</p>}
          </div>
          {/* genre */}
          <div className="mb-6">
            <label
              htmlFor="genre"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Genre<span className="text-red-500">*</span>
            </label>
            <select
              id="genre"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("genre", { required: "Genre is required" })}
            >
              <option value="">Select a genre</option>
              {bookGenres.map((genre) => (
                <option
                  key={genre}
                  value={genre}
                  selected={genre === genre} // set the selected option
                >
                  {genre}
                </option>
              ))}
            </select>
            {errors.genre && <p>{errors.genre.message}</p>}
          </div>
          {/* title */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>
          {/* image */}
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Image
            </label>
            <input
              type="text"
              id="image"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter title"
              {...register("image")}
            />
            {errors.image && <p>{errors.image.message}</p>}
          </div>
          {/* date */}
          <div className="mb-6">
            <label
              htmlFor="publicationDate"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Publication Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="publicationDate"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter publication date"
              max={currentDate}
              min={minDate}
              {...register("publicationDate", { required: "Date is required" })}
            />
            {errors.publicationDate && <p>{errors.publicationDate.message}</p>}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
            disabled={isLoading}
          >
            Edit Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
