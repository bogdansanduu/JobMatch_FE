import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

export interface UIState {
  userSearchOpen: boolean;
}

const initialState: UIState = {
  userSearchOpen: false,
};

export const UISlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setUserSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.userSearchOpen = action.payload;
    },
  },
});

export const { setUserSearchOpen } = UISlice.actions;
export const getUserSearchOpen = (state: RootState) => state.ui.userSearchOpen;

export default UISlice.reducer;
