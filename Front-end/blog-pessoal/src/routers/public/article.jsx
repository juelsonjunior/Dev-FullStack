import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';
import { Toaster, toast } from 'sonner';
import { useEffect, useState } from 'react';
export function Article() {
    const [title, setTitle] = useState();
    const [createAt, setCreateAt] = useState();
    const [content, setContent] = useState();
    const { id } = useParams();

    const listArticles = async () => {
        try {
            const response = await api.get('/list-articles', {
                params: {
                    idArticle: id.replace(':', ''),
                },
            });
            setTitle(response.data.title)
            setCreateAt(response.data.createAt)
            setContent(response.data.content)
        } catch (error) {
            toast.error('Falhar ao carregar os artigos');
        }
    };

    useEffect(() => {
        listArticles();
    }, []);
    return (
        <div className="flex justify-center w-lvw">
            <Toaster position="top-center" richColors closeButton />
            <div className="flex flex-col w-1/2 mt-5">
                <h3 className="text-slate-800 text-3xl">{title}</h3>
                <p className="text-slate-500">{createAt}</p>
                <p className="mt-3 text-justify">{content}</p>

                <div className="flex  justify-center w-full">
                    <button className="bg-slate-500 text-white mt-6 w-40 p-2 rounded-full hover:bg-slate-800">
                        <Link to={'/'}>Voltar a Home</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
