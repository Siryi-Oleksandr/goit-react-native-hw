import { useSelector } from "react-redux";
import {
  selectUserPosts,
  selectCurentPost,
  selectComments,
  selectIsRefresing,
  selectNumberComments,
} from "../redux/posts/selectors";

export const usePosts = () => {
  const userPosts = useSelector(selectUserPosts);
  const curentPost = useSelector(selectCurentPost);
  const allComments = useSelector(selectComments);
  const numberComments = useSelector(selectNumberComments);
  const isRefresing = useSelector(selectIsRefresing);

  return {
    userPosts,
    curentPost,
    allComments,
    isRefresing,
  };
};
