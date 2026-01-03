import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            // Optionally verify token with backend
            verifyToken();
        } else {
            setLoading(false);
        }
    }, []);

    const verifyToken = async () => {
        try {
            const response = await authAPI.getMe();
            if (response.data.success) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error('Token verification failed:', error);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await authAPI.login({ email, password });

            if (response.data.success) {
                const { token, user } = response.data;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
                setUser(user);
                return { success: true, user };
            }

            return { success: false, error: 'Login failed' };
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Login failed';
            return { success: false, error: message };
        }
    };

    const signup = async (name, email, password, contactNumber) => {
        try {
            const response = await authAPI.signup({
                name,
                email,
                password,
                contactNumber
            });

            if (response.data.success) {
                const { token, user } = response.data;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
                setUser(user);
                return { success: true, user };
            }

            return { success: false, error: 'Signup failed' };
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Signup failed';
            return { success: false, error: message };
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    const updateUser = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    const forgotPassword = async (email) => {
        try {
            const response = await authAPI.forgotPassword(email);
            return {
                success: response.data.success,
                message: response.data.message
            };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to send reset email';
            return { success: false, error: message };
        }
    };

    const resetPassword = async (token, password) => {
        try {
            const response = await authAPI.resetPassword(token, password);
            return {
                success: response.data.success,
                message: response.data.message
            };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to reset password';
            return { success: false, error: message };
        }
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        updateUser,
        forgotPassword,
        resetPassword,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
