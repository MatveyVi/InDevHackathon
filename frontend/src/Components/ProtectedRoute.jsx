import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/auth');
        } else {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, [navigate]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>;
    }

    return isAuthenticated ? children : null;
}; 