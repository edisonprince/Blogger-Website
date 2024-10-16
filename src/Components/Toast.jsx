import React, { useEffect, useState } from 'react';
import { CheckCircleFill, ExclamationTriangleFill, XCircleFill } from 'react-bootstrap-icons';
import '../Styles/Toast.css'; 

const Toast = ({ message, type, isVisible, onClose }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (isVisible) {
            setProgress(100);
            const timer = setInterval(() => {
                setProgress((prev) => {
                    if (prev <= 0) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 2; 
                });
            }, 100); 

            const timeout = setTimeout(onClose, 5000); 
            return () => {
                clearInterval(timer);
                clearTimeout(timeout);
            };
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div
            className={`toast show position-fixed top-0  end-0 m-3 ${type}-toast`}
            style={{ zIndex: 6000, minWidth: '300px' }}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className="toast-header">
                {type === 'success' ? (
                    <CheckCircleFill className="me-2 text-success" />
                ) : (
                    <ExclamationTriangleFill className="me-2 text-danger" />
                )}
                <strong className="me-auto">
                    {type === 'success' ? 'Success' : 'Error'}
                </strong>
                <button type="button" className="btn-close" onClick={onClose}>
                    <XCircleFill className="text-secondary" />
                </button>
            </div>
            <div className="toast-body">{message}</div>
            <div
                className={`progress-bar ${type}-progress`}
                style={{ width: `${progress}%` }} 
            ></div>
        </div>
    );
};

export default Toast;
