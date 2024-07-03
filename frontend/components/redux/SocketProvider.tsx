import { disconnectSocket, setSocket } from "@/redux/socketSlice";
import React, { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => useContext(SocketContext).socket;

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const socket = useSelector((state: any) => state.socket.socket);

  useEffect(() => {
    dispatch(setSocket({} as any));
    return () => {
      dispatch(disconnectSocket());
    };
  }, [dispatch]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
