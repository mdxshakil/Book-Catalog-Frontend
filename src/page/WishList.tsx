import Spinner from "../components/Spinner";
import WishlistCard from "../components/WishlistCard";
import ErrorElement from "../components/ui/ErrorElement";
import { useGetWishlistQuery } from "../redux/features/wishlist/wishlist.api";
import { useAppSelector } from "../redux/hooks";
import { IWishlistItem } from "../types/globalTypes";

const WishList = () => {
  const { user } = useAppSelector((state) => state.auth);
  const {
    data: wishlist,
    isLoading,
    isError,
  } = useGetWishlistQuery(user?.email);
  const { data } = wishlist || {};

  let content = null;
  if (isLoading) {
    content = <Spinner />;
  } else if (!isLoading && isError) {
    content = <ErrorElement message="Failed to load wishlist" />;
  } else if (!isLoading && !isError && !data?.length) {
    content = <p>Wishlist is empty</p>;
  } else if (!isLoading && !isError && data?.length > 0) {
    content = data?.map((item: IWishlistItem) => (
      <WishlistCard item={item} key={item._id} />
    ));
  }

  return (
    <>
      <div className="h-screen bg-gray-100 pt-20">
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            <h1 className="text-2xl font-bold mb-8 text-blue-900">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                Wish List
              </span>
            </h1>
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
