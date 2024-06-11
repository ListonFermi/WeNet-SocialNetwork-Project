import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSliceState {
  verifyUser: string | null;
  userLogged: string | null;
  userData : any
}

const initialState: UserSliceState = {
  verifyUser: null,
  userLogged: null,
  userData: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<{ userData: any }>) => {
      state.verifyUser = action.payload.userData;
    },
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

export const { verifyUser, saveUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
