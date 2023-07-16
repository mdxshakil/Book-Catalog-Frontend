import { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
type IProps = {
  searchText: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBox = ({ searchText, handleInputChange }: IProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Serch by title, author or genre..."
        className="border-2 rounded-full px-8 py-2 outline-none sm:w-64 md:w-80 lg:w-96"
        value={searchText}
        onChange={handleInputChange}
      />
      <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
        <FaSearch />
      </div>
    </div>
  );
};

export default SearchBox;
