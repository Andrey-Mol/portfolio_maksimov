import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();

        // Проверяем состояние авторизации при загрузке страницы
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                localStorage.setItem('user', JSON.stringify(user)); // Сохраняем пользователя в localStorage
            } else {
                setCurrentUser(null);
                localStorage.removeItem('user'); // Удаляем пользователя из localStorage
            }
            setLoading(false);
        });

        // Проверяем, есть ли сохранённый пользователь в localStorage
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }

        return () => unsubscribe();
    }, []);

    // Функция для выхода
    const logout = async () => {
        const auth = getAuth();
        await signOut(auth);
        localStorage.removeItem('user'); // Удаляем пользователя из localStorage
    };

    return (
        <AuthContext.Provider value={{ currentUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};