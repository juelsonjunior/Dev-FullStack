import { useContext, useEffect } from 'react';
import { useRef } from 'react';
import { ContextLogin } from '../../context/contextLogin';
import { useNavigate } from 'react-router-dom';

function Login() {
    const email = useRef();
    const password = useRef();
    const { login, isAuthenticated } = useContext(ContextLogin);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        login(email.current.value, password.current.value);
    };
    useEffect(() => {
        if (isAuthenticated) {
            email.current.value = '';
            password.current.value = '';
            navigate('/admin');
        }
        
    }, [isAuthenticated]);

    return (
        <div
            className={`absolute top-11 right-5 ${
                isAuthenticated ? 'hidden' : 'block'
            }`}
        >
            <div className="flex flex-col justify-center items-center gap-3 bg-slate-500 p-4 rounded-md w-64">
                <h5 className="text-white uppercase text-xs">Acessar painel</h5>
                <form
                    className="flex flex-col gap-4 w-full"
                    onSubmit={handleLogin}
                >
                    <input
                        type="text"
                        placeholder="Email admin"
                        className="input-login"
                        ref={email}
                    />
                    <input
                        type="password"
                        placeholder="Senha do admin"
                        className="input-login"
                        ref={password}
                    />
                    <button className="bg-slate-800 rounded-md px-4 py-1 text-white text-sm">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
