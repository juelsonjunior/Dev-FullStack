import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
function Login() {
    const nameUser = useRef('');
    const [login, setLogin] = useState();
    const navigate = useNavigate()
    const socket = io.connect('http://localhost:3001');

    const handleLogin = () => {
        if (nameUser.current.value == '') {
            console.log('Preencha um nome usuario');
            return;
        }
        socket.emit('register-user', nameUser.current.value);
    };

    useEffect(() => {
        socket.on('login', (user) => {
            if (user) {
                setLogin(true);
                navigate('/chat')
            } else {
                setLogin(false);
            }
        });
    }, [login]);
    return (
        <div className="flex justify-center items-center h-full">
            <div className="bg-white rounded-md flex flex-col gap-5 w-96">
                <div className="bg-violet-500 py-3 flex justify-center">
                    <span className="text-white font-bold text-2xl">
                        Cadastro
                    </span>
                </div>
                <div className="px-5 flex flex-col gap-4 w-full">
                    <input
                        type="text"
                        placeholder="Nome de usuario"
                        className="outline-none bg-gray-300 px-3 py-3 rounded-full"
                        ref={nameUser}
                    />
                    <div className="flex items-center justify-center mb-4 w-full">
                        <button
                            className="bg-violet-500 text-white rounded-full px-3 py-3 w-40"
                            onClick={handleLogin}
                        >
                            Entrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
