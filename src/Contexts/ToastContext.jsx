import React, { createContext, useState, useContext, useCallback } from 'react';
import Toast from '../Components/Toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({ isVisible: false, message: '', type: '' });

    const showToast = useCallback((message, type = 'success') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => {
            setToast({ isVisible: false, message: '', type: '' });
        }, 3000);
    }, []);

    const hideToast = () => {
        setToast({ isVisible: false, message: '', type: '' });
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={hideToast} />
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
