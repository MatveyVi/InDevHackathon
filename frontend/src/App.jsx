import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import HomePage from './pages/Landing/Landing';
import RoomPage from './pages/RoomPage/RoomPage';
import BookingPage from './pages/Booking/booking';
import AuthPage from './pages/Auth/Auth';
import AdminPage from './pages/Admin';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route 
                    path="/room" 
                    element={
                        <ProtectedRoute>
                            <RoomPage />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin" 
                    element={
                        <ProtectedRoute>
                            <AdminPage />
                        </ProtectedRoute>
                    } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App; 