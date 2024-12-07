import { useRef } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";


function Register() {
  const input_class =
    "w-full px-3 py-2 border border-gray-300 roundend-md focus:outline-none";
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api.post('/cadastro', {
        email: emailRef.current.value,
        name: nameRef.current.value,
        password: passwordRef.current.value,
      });
      alert("Usuario cadastrado com sucesso");
    } catch (error) {
      alert(`Erro: ${error}`);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10  bg-slate-50 p-8 border-gray-200 rounded-lg shadow-lg">
      <h4 className="text-2xl font-bold text-center text-gray-800">
        Cadastro de usuarios
      </h4>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Nome"
          className={input_class}
          ref={nameRef}
        />
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
          to="/login"
          className="text-blue-700 block text-center hover:underline"
        >
          Já tem uma conta? Faça login
        </Link>
      </form>
    </div>
  );
}

export default Register;
