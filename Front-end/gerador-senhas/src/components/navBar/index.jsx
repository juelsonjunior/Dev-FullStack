import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="w-full p-3 flex justify-around bg-slate-900">
      <h4 className="uppercase text-purple-500">Gerador de senha</h4>
      <div>
        <ul className="flex gap-5">
          <li className="cursor-pointer hover:text-purple-500 transition duration-200 ease-in-out">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer hover:text-purple-500 transition duration-200 ease-in-out">
            <Link to="/list-pass">Lista de senhas</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
