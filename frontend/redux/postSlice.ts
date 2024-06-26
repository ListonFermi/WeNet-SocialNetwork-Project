import { IPost } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostSliceState {
  postData : IPost | null
}

const initialState: PostSliceState = {
  postData: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    storePostData: (state, action: PayloadAction<{ postData: IPost }>) => {
      state.postData = action.payload.postData;
    }
  },
});

export const { storePostData} = postSlice.actions;
export default postSlice.reducer;
