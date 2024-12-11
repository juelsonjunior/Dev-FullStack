import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Encurtador from './pages/encurtador.jsx';
import EstatisticaURL from './pages/estatistica.jsx';
import Contacto from './pages/contacto.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Encurtador />,
            },
            {
                path: '/estatistica',
                element: <EstatisticaURL />,
            },
            {
                path: '/contacto',
                element: <Contacto />,
            },
        ],
    },
]);
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
