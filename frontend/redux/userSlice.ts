import { IUser } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSliceState {
  verifyUser: string | null;
  userLogged: string | null;
  userData : any,
  currentProfile: {userData : IUser | null}
}

const initialState: UserSliceState = {
  verifyUser: null,
  userLogged: null,
  userData: null,
  currentProfile: {userData : null}
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
    currentProfile  : (state, action: PayloadAction<{ userData: any }>) => {
      state.verifyUser = action.payload.userData;
    },
    loginUser: (state, action: PayloadAction<{ _id: string }>) => {
      state.userLogged = action.payload._id;
    },
    logoutUser: (state) => {
      state.userLogged = null;
    },
  },
});

export const { verifyUser, saveUser, currentProfile, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;


///   const  slice=      createSlice ({ name, initialstate, reducers })

/// slice = { actions, reducer   }