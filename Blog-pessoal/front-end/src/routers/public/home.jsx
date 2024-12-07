import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
export function Home() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const listAllBlogs = async () => {
        try {
            setIsLoading(true);
            const { data } = await api.get('/list-articles');
            setArticles(data);
        } catch (error) {
            toast.error("Falhar ao carregar os artigos")
        } finally {
            setIsLoading(false);
        }
    };
    console.log("teste render");
    
    useEffect(() => {
        listAllBlogs();
    }, []);
    return (
        <div className="flex justify-center w-lvw">
            <Toaster position="top-center" richColors closeButton />
            <div className="w-1/2 mt-11">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-full bg-slate-500 p-3 rounded-md">
                        <div>
                            <h3 className="text-white cursor-pointer text-center uppercase text-base">
                                Blog Pessoal
                            </h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full overflow-y-auto h-96">
                        {isLoading ? (
                            <p>Carregando dados...</p>
                        ) : (
                            articles.map((article) => (
                                <div className="flex justify-between bg-slate-800 p-3 rounded-md" key={article.id}>
                                    <div>
                                        <h3 className="text-white cursor-pointer text-center capitalize text-base">
                                            <Link to={`/article/:${article.id}`}>
                                                {article.title}
                                            </Link>
                                        </h3>
                                    </div>
                                    <div>
                                        <p className="text-white">
                                            {article.createAt}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
