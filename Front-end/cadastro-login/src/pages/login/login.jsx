import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";


function Login() {
  const input_class =
    "w-full px-3 py-2 border border-gray-300 roundend-md focus:outline-none";
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const {data:token} = await api.post('/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      localStorage.setItem('token', token)
      
      navigate("/list-users")
    } catch (error) {
      alert(`Erro: ${error}`);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10  bg-slate-50 p-8 border-gray-200 rounded-lg shadow-lg">
      <h4 className="text-2xl font-bold text-center text-gray-800">
        Login
      </h4>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Email"
          className={input_class}
          ref={emailRef}
        />
        <input
          type="password"
          placeholder="Senha"
          className={input_class}
          ref={passwordRef}
        />
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400">
          Cadastrar
        </button>
        <Link
          to="/"
          className="text-blue-700 block text-center hover:underline"
        >
          Não tem uma conta? Cadastre-se
        </Link>
      </form>
    </div>
  );
}

export default Login;
