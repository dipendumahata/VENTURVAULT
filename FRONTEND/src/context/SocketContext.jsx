import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { addNotification } from '../store/authSlice.js';
import { addChatMessage } from '../store/dataSlice.js';

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            const socketUrl = import.meta.env.VITE_API_BASE_URL
                ? import.meta.env.VITE_API_BASE_URL.replace('/api', '')
                : 'http://localhost:5001';

            const newSocket = io(socketUrl, {
                auth: { token }
            });

            newSocket.on('connect', () => console.log('Socket.IO Connected!'));
            
            // --- CENTRALIZED LISTENERS ---
            newSocket.on('new_notification', (notification) => {
                dispatch(addNotification(notification));
            });
            // THIS LISTENER WAS MISSING
            newSocket.on('new_chat_message', (message) => {
                dispatch(addChatMessage(message));
            });

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        }
    }, [token, dispatch]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
