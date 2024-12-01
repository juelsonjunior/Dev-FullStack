import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Login from './routers/public/login';
function App() {
    return (
        <>
            <Login />
            <Outlet />
        </>
    );
}

export default App;
