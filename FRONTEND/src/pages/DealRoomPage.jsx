import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDealRoomDetails, clearCurrentDealRoom, addChatMessage } from '../store/dataSlice.js';
import { useSocket } from '../context/SocketContext.jsx';
import PageLoader from '../components/layout/PageLoader.jsx';
import API from '../services/api.js';
import { motion, AnimatePresence } from 'framer-motion';

// SVG icon for the Send button
const SendIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className=""><path fill="currentColor" d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>
);

const DealRoomPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentDealRoom, loading, error } = useSelector((state) => state.data);
    const { user } = useSelector((state) => state.auth);
    const socket = useSocket();
    const [message, setMessage] = useState('');
    const chatEndRef = useRef(null);

    useEffect(() => {
        // Fetch initial data for the deal room
        if (id) {
            dispatch(fetchDealRoomDetails(id));
        }

        // Set up socket listeners
        if (socket) {
            socket.emit('join_deal_room', id);

            const handleNewMessage = (newMessage) => {
                // Check if the message belongs to the current room to avoid mix-ups
                if (newMessage.dealRoomId === id) {
                    dispatch(addChatMessage(newMessage));
                }
            };
            
            socket.on('new_chat_message', handleNewMessage);

            // Cleanup function to remove the listener when the component unmounts
            return () => {
                socket.off('new_chat_message', handleNewMessage);
            };
        }
    }, [id, dispatch, socket]);
    
    // Separate effect to clear data on unmount
    useEffect(() => {
        return () => {
            dispatch(clearCurrentDealRoom());
        }
    }, [dispatch]);

    useEffect(() => {
        // Scroll to the bottom of the chat on new message
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentDealRoom?.messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        try {
            // The API call saves the message and triggers the backend to emit the socket event.
            // The UI update is handled by the socket listener, not here.
            await API.post(`/deal-rooms/${id}/messages`, { message });
            setMessage('');
        } catch (err) {
            console.error("Failed to send message:", err);
        }
    };

    if (loading || !currentDealRoom) return <PageLoader />;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    const { dealRoom, messages } = currentDealRoom;
    const otherParty = user._id === dealRoom.businessId._id ? dealRoom.investorId : dealRoom.businessId;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-2xl flex flex-col h-[85vh] overflow-hidden border">
                {/* Header */}
                <div className="p-4 border-b bg-gray-50 flex items-center space-x-4">
                     <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </span>
                    <div>
                        <h1 className="text-lg font-bold text-slate-900">{otherParty.profile.firstName} {otherParty.profile.lastName}</h1>
                        <p className="text-sm text-slate-500">Regarding: {dealRoom.proposalId.title}</p>
                    </div>
                </div>
                
                {/* Chat Area with WhatsApp-like background */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-100" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d1d5db' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")` }}>
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div 
                                key={msg._id} 
                                className={`flex my-2 items-end ${msg.senderId._id === user._id ? 'justify-end' : 'justify-start'}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={`px-4 py-2 rounded-xl max-w-md md:max-w-lg shadow ${msg.senderId._id === user._id ? 'bg-teal-600 text-white rounded-br-none' : 'bg-white text-slate-800 rounded-bl-none'}`}>
                                    <p>{msg.message}</p>
                                    <p className={`text-xs mt-1 ${msg.senderId._id === user._id ? 'text-teal-100' : 'text-slate-400'} text-right`}>
                                        {new Date(msg.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={chatEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-gray-50">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                        <input 
                            type="text" 
                            placeholder="Type a message..." 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                        />
                        <button type="submit" className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-transform transform hover:scale-110">
                            <SendIcon />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DealRoomPage;
