import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

interface SearchFormInputs {
  searchText: string;
}

const SearchBar = () => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<SearchFormInputs>();

  const onSubmit = (data: SearchFormInputs) => {
    if (data.searchText === "") return;
    
    
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Search"
          className="border-2 rounded-full px-8 py-2 outline-none sm:w-64 md:w-80 lg:w-96"
          {...register("searchText")}
        />
      </form>
      <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
        <FaSearch />
      </div>
    </div>
  );
};

export default SearchBar;
