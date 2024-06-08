import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSliceState {
  verifyUser: string | null;
  userLogged: boolean;
}

const initialState: UserSliceState = {
  verifyUser: null,
  userLogged: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    verifyUser: (state, action: PayloadAction<{ _id: string }>) => {
      state.verifyUser = action.payload._id;
    },
    loginUser: (state, action: PayloadAction<{ _id: string }>) => {
      state.userLogged = true;
    },
    logoutUser: (state) => {
      state.userLogged = false;
    },
  },
});

export const { verifyUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
