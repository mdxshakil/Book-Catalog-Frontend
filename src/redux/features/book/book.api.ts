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
  }),
});

export const { useAddBookMutation } = productApi;
