import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Check local storage for existing session
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('antigravity_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // In a real app, users would be fetched from the database. 
    // Here we use state initialized with mock data so admins can add managers during runtime.
    const [usersList, setUsersList] = useState(MOCK_USERS);

    const login = async (email, password) => {
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 800));

        const foundUser = usersList.find(u => u.email === email && u.password === password);

        if (foundUser) {
            // Don't store the password in local storage/context
            const { password: _, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            localStorage.setItem('antigravity_user', JSON.stringify(userWithoutPassword));
            return { success: true };
        }

        return { success: false, error: 'Invalid email or password' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('antigravity_user');
    };

    const addManager = (newManagerData) => {
        // Only admins should ideally call this, but we'll enforce that via UI
        const newManager = {
            id: `user-${Date.now()}`,
            role: 'manager',
            ...newManagerData
        };
        setUsersList(prev => [...prev, newManager]);
        return newManager;
    };

    return (
        <AuthContext.Provider value={{ user, usersList, login, logout, addManager }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
