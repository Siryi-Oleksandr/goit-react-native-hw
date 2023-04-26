import { useSelector } from "react-redux";
import {
  selectUserPosts,
  selectLikes,
  selectComments,
  selectIsRefresing,
} from "../redux/posts/selectors";

export const usePosts = () => {
  const userPosts = useSelector(selectUserPosts);
  const likes = useSelector(selectLikes);
  const allComments = useSelector(selectComments);
  const isRefresing = useSelector(selectIsRefresing);

  return {
    userPosts,
    likes,
    allComments,
    isRefresing,
  };
};
