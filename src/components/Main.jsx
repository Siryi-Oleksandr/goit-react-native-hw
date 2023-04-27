import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dimensions, StyleSheet } from "react-native";
import { useRoutes } from "../../router";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { setStateChangeUser } from "../redux/auth/authSlice";
import Spinner from "react-native-loading-spinner-overlay";
import { usePosts } from "../hooks/usePosts";
import { pallete } from "../helpers/variables";

export function Main() {
  const { isAuth } = useAuth();
  const { isRefresing } = usePosts();
  const router = useRoutes(isAuth);
  const [orientation, setOrientation] = useState("portrait");

  const dispatch = useDispatch();

  // *** listen change User
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userStateChangeAuth = {
          userId: user.uid,
          name: user.displayName,
          email: user.email,
          isAuth: true,
        };

        dispatch(setStateChangeUser(userStateChangeAuth));
      }
    });
  }, []);

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

  return (
    <NavigationContainer>
      <Spinner
        visible={isRefresing}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
        animation="fade"
      />
      {router}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: pallete.accent,
  },
});
