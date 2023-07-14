import { api } from "../../api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (bookData) => ({
        url: "/book/add-book",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["books"],
    }),
    getLatestBooks: builder.query({
      query: () => ({
        url: "/book/latest-books",
        method: "GET",
      }),
      providesTags: ["books"],
    }),
    getAllBooks: builder.query({
      query: () => ({
        url: "/book/all-books",
        method: "GET",
      }),
      providesTags: ["books"],
    }),
    getSingleBook: builder.query({
      query: (id) => ({
        url: `/book/${id}`,
        method: "GET",
      }),
      providesTags: ["book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    editBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/edit-book/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["books", "book"],
    }),
    addComment: builder.mutation({
      query: ({ id, comment }) => ({
        url: `/book/comment/${id}`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["book"],
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
