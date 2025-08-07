import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markNotificationsRead } from '../../store/authSlice';
import { BellIcon } from '../../assets/icons';

const NotificationBell = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { notifications } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const unreadCount = notifications.filter(n => !n.read).length;

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (!isOpen && unreadCount > 0) {
            dispatch(markNotificationsRead());
        }
    };

    return (
        <div className="relative">
            <button onClick={handleToggle} className="relative text-slate-500 hover:text-teal-600">
                <BellIcon className="h-6 w-6" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {unreadCount}
                    </span>
                )}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-3 font-semibold text-sm border-b">Notifications</div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map(n => (
                                <div key={n._id} className="p-3 text-sm hover:bg-gray-50 border-b">
                                    <p>{n.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <p className="p-4 text-sm text-gray-500">No new notifications.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;