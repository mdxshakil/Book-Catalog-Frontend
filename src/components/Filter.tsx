import { bookGenres } from "../constants";
import { yearOptions } from "../utils";

type IProps = {
  selectedGenre: string;
  handleGenreChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedYear: string;
  handleYearChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleClearFilters: () => void;
};

const Filter = ({
  selectedGenre,
  handleGenreChange,
  selectedYear,
  handleYearChange,
  handleClearFilters,
}: IProps) => {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="genre" className="text-gray-700 font-medium">
        Genre:
      </label>
      <select
        id="genre"
        className="border-2 rounded-full px-4 py-1 outline-none"
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
        className="border-2 rounded-full px-4 py-1 outline-none"
        value={selectedYear}
        onChange={handleYearChange}
      >
        <option value="">All Years</option>
        {yearOptions}
      </select>
      <button
        className="bg-red-500 text-white rounded-full py-1 px-4 hover:bg-red-600"
        onClick={handleClearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filter;
