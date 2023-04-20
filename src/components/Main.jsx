import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions } from "react-native";
import { useRoutes } from "../../router";
import { NavigationContainer } from "@react-navigation/native";
import { authStateChangeUser } from "../redux/auth/authOperations";

export function Main() {
  const selectIsAuth = useSelector((state) => state.auth.isAuth);
  const router = useRoutes(selectIsAuth);
  const [orientation, setOrientation] = useState("portrait");

  const dispatch = useDispatch();

  // *** listen change User
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [authStateChangeUser]);

  const getOrientation = useCallback(() => {
    const { width, height } = Dimensions.get("window");
    if (width > height) {
      setOrientation("landscape");
    } else {
      setOrientation("portrait");
    }
  }, []);

  useEffect(() => {
    getOrientation();
    const subscription = Dimensions.addEventListener("change", getOrientation);

    return () => subscription?.remove();
  }, [getOrientation]);

  return <NavigationContainer>{router}</NavigationContainer>;
}
