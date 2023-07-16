// Generate year options for the year selection dropdown on the filter of all books page
const currentYear = new Date().getFullYear();
export const yearOptions = Array.from(
  { length: currentYear - 1700 + 1 },
  (_, index) => (
    <option key={index} value={currentYear - index}>
      {currentYear - index}
    </option>
  )
);