import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) {
            const newSocket = io('http://localhost:5001', {
                auth: { token }
            });
            setSocket(newSocket);

            return () => newSocket.close();
        }
    }, [token]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
