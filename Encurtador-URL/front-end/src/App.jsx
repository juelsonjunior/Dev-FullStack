import { useState } from 'react';
import Navbar from './components/navbar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
        <Toaster richColors position="top-center" />
            <Navbar />
            <Outlet />
        </>
    );
}

export default App;
