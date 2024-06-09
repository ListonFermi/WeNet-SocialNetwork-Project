import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSliceState {
  verifyUser: string | null;
  userLogged: string | null;
}

const initialState: UserSliceState = {
  verifyUser: null,
  userLogged: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    verifyUser: (state, action: PayloadAction<{ _id: string }>) => {
      state.verifyUser = action.payload._id;
    },
    loginUser: (state, action: PayloadAction<{ _id: string }>) => {
      state.userLogged = action.payload._id;
    },
    logoutUser: (state) => {
      state.userLogged = null;
    },
  },
});

export const { verifyUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
