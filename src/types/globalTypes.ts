export interface IBook {
  _id?: number;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image?: string;
}

export interface IWishlistItem {
  _id?: string;
  userEmail: string;
  book: IBook;
  quantity: number;
}

export interface IReadingListItem {
  _id?: string;
  userEmail: string;
  book: IBook;
  hasRead: boolean;
}
