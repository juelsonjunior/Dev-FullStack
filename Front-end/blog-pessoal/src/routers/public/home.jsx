import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useEffect, useState } from 'react';
export function Home() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const listAllBlogs = async () => {
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

    useEffect(() => {
        listAllBlogs();
    }, []);
    return (
        <div className="flex justify-center w-lvw">
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
                                            <Link to={'/article/:23'}>
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
