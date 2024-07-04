import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SocketState {
  isConnected: boolean;
}

const initialState: SocketState = {
  isConnected: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket(state) {
      state.isConnected = true;
    },
    disconnectSocket(state) {
      state.isConnected = false;
    },
  },
});

export const { setSocket, disconnectSocket } = socketSlice.actions;

export default socketSlice.reducer;
