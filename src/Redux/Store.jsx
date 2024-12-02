import { configureStore } from "@reduxjs/toolkit";
import LanguageReducer from "./LanguageReducer";
import LayoutReducer from "./LayoutReducer";

const store = configureStore({
  reducer: {
    LayoutReducer: LayoutReducer,
    LangReducer: LanguageReducer,
  },
});
export default store;
