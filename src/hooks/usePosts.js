import { useSelector } from "react-redux";
import {
  selectUserPosts,
  selectAllPosts,
  selectLikes,
  selectComments,
  selectIsRefresing,
} from "../redux/posts/selectors";

export const usePosts = () => {
  const userPosts = useSelector(selectUserPosts);
  const allPosts = useSelector(selectAllPosts);
  const likes = useSelector(selectLikes);
  const allComments = useSelector(selectComments);
  const isRefresing = useSelector(selectIsRefresing);

  return {
    userPosts,
    allPosts,
    likes,
    allComments,
    isRefresing,
  };
};
