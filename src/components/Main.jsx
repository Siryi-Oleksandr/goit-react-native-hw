import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dimensions } from "react-native";
import { useRoutes } from "../../router";
import { NavigationContainer } from "@react-navigation/native";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { useAuth } from "../hooks/useAuth";

export function Main() {
  const { isAuth } = useAuth();
  const router = useRoutes(isAuth);
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
