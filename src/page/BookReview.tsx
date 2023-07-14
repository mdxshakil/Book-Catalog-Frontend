import { useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";
import { useAddCommentMutation } from "../redux/features/book/book.api";
import { useEffect } from "react";

interface IProps {
  reviews: Array<string>;
  id: string;
}

interface IComment {
  comment: string;
}

const BookReview = ({ reviews, id }: IProps) => {
  const { register, handleSubmit, reset } = useForm<IComment>();
  const [addComment, { isLoading, isSuccess }] = useAddCommentMutation();

  const onSubmit = (comment: IComment) => {
    addComment({ id, comment });
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-5 items-center justify-center"
      >
        <textarea
          className="w-3/5 outline-none border-teal-500 border-2 rounded-full px-3"
          placeholder="Leave your review"
          {...register("comment")}
        />
        <button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
          disabled={isLoading}
        >
          <FiSend />
        </button>
      </form>
      <div className="mt-10">
        {reviews?.map((comment: string, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-2">
            <img
              src="https://github.com/shadcn.png"
              className="h-10 w-10 rounded-full border-2 border-teal-500"
            />
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookReview;
