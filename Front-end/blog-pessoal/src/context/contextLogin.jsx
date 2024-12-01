import { createContext, useEffect, useState } from 'react';
import api from '../services/api';

export const ContextLogin = createContext();

export const LoginProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const saveIsAuthenticated = sessionStorage.getItem('isAuthenticated');
        return saveIsAuthenticated === 'true' && isTokenValid();
    });

    const login = async (emailLog, passLog) => {
        try {
            const response = await api.post('/login', {
                email: emailLog,
                password: passLog,
            });

            if (response.status != 200) {
                return console.log('Erro: não foii retornado um token');
            }

            sessionStorage.setItem('token', response.data);
            setIsAuthenticated(true);
            sessionStorage.setItem('isAuthenticated', 'true');
        } catch (error) {
            console.log('Erro ao efetuar login no painel do Admin');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setIsAuthenticated(false);
        sessionStorage.removeItem('isAuthenticated');
    };

    useEffect(() => {
        if (!isTokenValid()) {
            handleLogout();
        } else {
            setIsAuthenticated(true);
        }
        const intervalId = setInterval(() => {
            if (!isTokenValid()) {
                handleLogout();
            }
        }, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <ContextLogin.Provider value={{ login, isAuthenticated, handleLogout }}>
            {children}
        </ContextLogin.Provider>
    );
};

const isTokenValid = () => {
    const token = sessionStorage.getItem('token');
    if (!token) return false;

    try {
        const payload = token.split('.')[1];

        if (!payload) return false;
        const decodePayload = atob(payload);
        const { exp } = JSON.parse(decodePayload);
        const expireyDate = exp * 1000;
        return Date.now() < expireyDate;
    } catch (error) {
        console.log('Token inválido:', error);
        return false;
    }
};
