import { api } from "../../api/apiSlice";

const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: (wishlistData) => ({
        url: "/wishlist/add-to-wishlist",
        method: "POST",
        body: wishlistData,
      }),
      invalidatesTags: ["wishlist"],
    }),
    getWishlist: builder.query({
      query: (userEmail) => ({
        url: `/wishlist?email=${userEmail}`,
        method: "GET",
      }),
      providesTags: ["wishlist"],
    }),
    removeFromWishlist: builder.mutation({
      query: (itemId) => ({
        url: `/wishlist/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
    updateQuantity: builder.mutation({
      query: ({ itemId, action }) => ({
        url: `/wishlist/${itemId}`,
        method: "PATCH",
        body: { action },
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
  useUpdateQuantityMutation
} = wishlistApi;
