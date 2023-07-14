import { api } from "../../api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (bookData) => ({
        url: "/book/add-book",
        method: "POST",
        body: bookData,
      }),
    }),
    getLatestBooks: builder.query({
      query: () => ({
        url: "/book/latest-books",
        method: "GET",
      }),
    }),
    getAllBooks: builder.query({
      query: () => ({
        url: "/book/all-books",
        method: "GET",
      }),
    }),
    getSingleBook: builder.query({
      query: (id) => ({
        url: `/book/${id}`,
        method: "GET",
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
    }),
    editBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/edit-book/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    addComment: builder.mutation({
      query: ({ id, comment }) => ({
        url: `/book/comment/${id}`,
        method: "POST",
        body: comment,
      }),
    }),
  }),
});

export const {
  useAddBookMutation,
  useGetLatestBooksQuery,
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useDeleteBookMutation,
  useEditBookMutation,
  useAddCommentMutation,
} = productApi;
