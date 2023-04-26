import { useSelector } from "react-redux";
import {
  selectUserPosts,
  selectCurentPost,
  selectComments,
  selectIsRefresing,
} from "../redux/posts/selectors";

export const usePosts = () => {
  const userPosts = useSelector(selectUserPosts);
  const curentPost = useSelector(selectCurentPost);
  const allComments = useSelector(selectComments);
  const isRefresing = useSelector(selectIsRefresing);

  return {
    userPosts,
    curentPost,
    allComments,
    isRefresing,
  };
};
