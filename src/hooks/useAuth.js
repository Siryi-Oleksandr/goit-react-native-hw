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
  const isUserName = useSelector(selectUserName);
  const isUserEmail = useSelector(selectUserEmail);
  const isUserId = useSelector(selectUserId);
  const isAuth = useSelector(selectIsAuth);
  const isError = useSelector(selectIsError);
  const isRefresing = useSelector(selectIsRefresing);
  const textError = useSelector(selectTextError);

  return {
    isUserName,
    isUserEmail,
    isUserId,
    isAuth,
    isRefresing,
    isError,
    textError,
  };
};
