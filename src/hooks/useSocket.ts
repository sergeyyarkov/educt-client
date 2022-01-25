import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

export const useSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketClient = io(url, { autoConnect: true });

    setSocket(socketClient);

    return () => {
      socket?.disconnect();
    };
  }, []);

  return socket;
};
