import addBook from "../assets/images/addnewbook.png";

const AddNewBook = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-screen">
      <div className="flex items-center justify-center">
        <form className="w-full max-w-lg px-6">
          <h2 className="text-3xl font-bold mb-8">Add new book</h2>
          <div className="mb-6">
            <label
              htmlFor="author"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter author name"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="genre"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Genre
            </label>
            <input
              type="text"
              id="genre"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter genre"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter title"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="publicationDate"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Publication Date
            </label>
            <input
              type="date"
              id="publicationDate"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter publication date"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
          >
            Add Book
          </button>
        </form>
      </div>
      {/* side image */}
      <div className="hidden md:block">
        <img
          src={addBook}
          alt="Login Image"
          className="h-full w-full object-cover md:object-contain"
        />
      </div>
    </div>
  );
};

export default AddNewBook;
