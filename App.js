import React, { useCallback, useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/redux/store";
import { Main } from "./src/components/Main";

// ! Main logic

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
