import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ContextLogin } from '../context/contextLogin';

function PrivateRouter({ children }) {
    const { isAuthenticated } = useContext(ContextLogin);

    return isAuthenticated ? children : <Navigate to="/" replace />;
}
export default PrivateRouter;
