import { useSelector } from "react-redux";
import {
  selectUserName,
  selectUserEmail,
  selectUserId,
  selectIsAuth,
  selectIsError,
  selectTextError,
  selectIsRefresing,
} from "../redux/auth/selectors";

export const useAuth = () => {
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userId = useSelector(selectUserId);
  const isAuth = useSelector(selectIsAuth);
  const isError = useSelector(selectIsError);
  const isRefresing = useSelector(selectIsRefresing);
  const textError = useSelector(selectTextError);

  return {
    userName,
    userEmail,
    userId,
    isAuth,
    isRefresing,
    isError,
    textError,
  };
};
