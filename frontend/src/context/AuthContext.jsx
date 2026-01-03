import { createContext, useContext, useState, useEffect } from 'react';

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
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // TODO: Replace with actual API call
            // Mock login for now
            const mockUser = {
                id: '1',
                name: 'Travel Enthusiast',
                email: email,
                avatar: null
            };

            const mockToken = 'mock-jwt-token-' + Date.now();

            localStorage.setItem('user', JSON.stringify(mockUser));
            localStorage.setItem('token', mockToken);
            setUser(mockUser);

            return { success: true, user: mockUser };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const signup = async (name, email, password) => {
        try {
            // TODO: Replace with actual API call
            // Mock signup for now
            const mockUser = {
                id: Date.now().toString(),
                name: name,
                email: email,
                avatar: null
            };

            const mockToken = 'mock-jwt-token-' + Date.now();

            localStorage.setItem('user', JSON.stringify(mockUser));
            localStorage.setItem('token', mockToken);
            setUser(mockUser);

            return { success: true, user: mockUser };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    };

    const updateUser = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        updateUser,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
