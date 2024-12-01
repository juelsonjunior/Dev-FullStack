import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContextLogin } from '../../context/contextLogin';
export function Admin() {
    const { handleLogout } = useContext(ContextLogin);
    const navigate = useNavigate();

    const logout = () => {
        handleLogout();
        navigate('/');
    };

    return (
        <div className="flex justify-center w-lvw relative">
            <div className="w-1/2 mt-11">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center justify-between w-full bg-slate-500 p-3 rounded-md">
                        <div>
                            <button
                                className="bg-red-500 px-5 py-2 absolute top-5 left-5 text-white"
                                onClick={logout}
                            >
                                Terminar sessão
                            </button>
                            <h3 className="text-white cursor-pointer text-center uppercase text-base">
                                Blog Pessoal
                            </h3>
                        </div>
                        <div>
                            <button className="bg-green-500 text-white p-2 rounded-md text-xs">
                                <Link to={'/new-article'}>Adicionar</Link>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 w-full overflow-y-auto h-96">
                        <div className="flex items-center justify-between bg-slate-800 p-3 rounded-md">
                            <div>
                                <h3 className="text-white cursor-pointer text-center capitalize text-base">
                                    Nome Blog
                                </h3>
                            </div>
                            <div className="flex gap-2">
                                <button className="bg-orange-500 text-white p-2 rounded-md text-xs">
                                    <Link to={'/edit-article/:23'}>Editar</Link>
                                </button>
                                <button className="bg-red-500 text-white p-2 rounded-md text-xs">
                                    Apagar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
