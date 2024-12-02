import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  i18LangStatus: "en",
};

const LangReducer = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.i18LangStatus = action.payload;
    },
  },
});

export const { setLanguage } = LangReducer.actions;

export default LangReducer.reducer;
export const selectCab = (state) => state.language;
