import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string | null = localStorage.getItem("jwt");

const jwtSlice = createSlice({
  name: "jwt",
  initialState,

  reducers: {
    setJwt: (state, action: PayloadAction<string>) => {
      localStorage.setItem("jwt", action.payload);
      return action.payload;
    },

    removeJwt: () => {
      localStorage.removeItem("jwt");
      return null;
    },
  },
});

export const { setJwt, removeJwt } = jwtSlice.actions;

export default jwtSlice.reducer;