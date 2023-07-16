import { api } from "../../api/apiSlice";

const readingListApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addToReadingList: builder.mutation({
      query: (readingListData) => ({
        url: "/readinglist/add-to-readingList",
        method: "POST",
        body: readingListData,
      }),
      invalidatesTags: ["readingList"],
    }),
    getReadingList: builder.query({
      query: (userEmail) => ({
        url: `/readinglist?email=${userEmail}`,
        method: "GET",
      }),
      providesTags: ["readingList"],
    }),
    removeFromreadingList: builder.mutation({
      query: (itemId) => ({
        url: `/readinglist/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["readingList"],
    }),
    updateReadStatus: builder.mutation({
      query: (itemId) => ({
        url: `/readinglist/${itemId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["readingList"],
    }),
  }),
});

export const {
  useAddToReadingListMutation,
  useGetReadingListQuery,
  useRemoveFromreadingListMutation,
  useUpdateReadStatusMutation,
} = readingListApi;
