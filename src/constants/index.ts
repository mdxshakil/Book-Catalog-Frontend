export const bookGenres = [
  "Fiction",
  "Thriller",
  "Science Fiction",
  "Romance",
  "Historical Fiction",
  "Biography",
  "Young Adult",
  "Self-help",
  "Business",
  "Horror",
  "Travel",
  "Music",
];

export const currentDate = new Date().toISOString().split("T")[0];
export const minDate = new Date(1700, 0, 1).toISOString().split("T")[0];

export const navLinks = [
  { name: "Home", link: "/" },
  { name: "All Books", link: "/all-books" },
  { name: "Add New Book", link: "/add-new-book" },
  { name: "Wish List", link: "/wish-list" },
  { name: "Reading List", link: "/reading-list" },
];
