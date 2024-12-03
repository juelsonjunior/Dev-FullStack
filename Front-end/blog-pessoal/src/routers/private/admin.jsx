import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContextLogin } from '../../context/contextLogin';
import api from '../../services/api';
import { Toaster, toast } from 'sonner';
export function Admin() {
    const { handleLogout } = useContext(ContextLogin);
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const logout = () => {
        handleLogout();
        navigate('/');
    };

    const listAllBlogs = async () => {
        let toastLoading;
        try {
            setIsLoading(true);
            const { data } = await api.get('/list-articles');
            setArticles(data);
        } catch (error) {
            console.log('Erro grave');
        } finally {
            setIsLoading(false);
        }
    };

    const delArticle = async (id) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await api.delete(`/del-article/:${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status == 200) {
                listAllBlogs();
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            if (error.response == 200) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.response.data.message);
            }
        }
    };

    const showToastDel = (id) => {
        toast('Tem certeza que deseja apagar o artigo', {
            action: {
                label: 'Deletar',
                onClick: () => delArticle(id),
            },
        });
    };

    useEffect(() => {
        listAllBlogs();
    }, []);

    return (
        <div className="flex justify-center w-lvw relative">
            <Toaster position="top-center" richColors closeButton />
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
                        {isLoading
                            ? <p className='text-center'>Carregando lista de artigos...</p>
                            : articles.map((article) => (
                                  <div
                                      className="flex items-center justify-between bg-slate-800 p-3 rounded-md"
                                      key={article.id}
                                  >
                                      <div>
                                          <h3 className="text-white cursor-pointer text-center capitalize text-base">
                                              {article.title}
                                          </h3>
                                      </div>
                                      <div className="flex gap-2">
                                          <button className="bg-orange-500 text-white p-2 rounded-md text-xs">
                                              <Link
                                                  to={`/edit-article/:${article.id}`}
                                              >
                                                  Editar
                                              </Link>
                                          </button>
                                          <button
                                              className="bg-red-500 text-white p-2 rounded-md text-xs"
                                              onClick={() =>
                                                  showToastDel(article.id)
                                              }
                                          >
                                              Apagar
                                          </button>
                                      </div>
                                  </div>
                              ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
