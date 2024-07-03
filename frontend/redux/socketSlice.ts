import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
}

const initialState: SocketState = {
  socket: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<Socket | any>) => {
        state.socket = action.payload 
    },
    disconnectSocket: (state) => {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
      }
    },
  },
});

export const { setSocket, disconnectSocket } = socketSlice.actions;

export default socketSlice.reducer;
