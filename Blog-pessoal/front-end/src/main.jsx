import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { Home } from './routers/public/home.jsx';
import { Article } from './routers/public/article.jsx';
import { Admin } from './routers/private/admin.jsx';
import { EditArticle } from './routers/private/edit-article.jsx';
import { NewArticle } from './routers/private/new-article.jsx';
import { LoginProvider } from './context/contextLogin.jsx';
import PrivateRouter from './components/privateRoute.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/article/:id',
                element: <Article />,
            },
            {
                path: 'admin',
                element: (
                    <PrivateRouter>
                        <Admin />
                    </PrivateRouter>
                ),
            },
            {
                path: '/edit-article/:id',
                element: (
                    <PrivateRouter>
                        <EditArticle />
                    </PrivateRouter>
                ),
            },
            {
                path: 'new-article',
                element: (
                    <PrivateRouter>
                        <NewArticle />
                    </PrivateRouter>
                ),
            },
        ],
    },
]);
createRoot(document.getElementById('root')).render(
    <LoginProvider>
        <RouterProvider router={router} />
    </LoginProvider>
);
