import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { Toaster, toast } from 'sonner';

export function EditArticle() {
    const title = useRef();
    const content = useRef();
    const { id } = useParams();

    const editArticle = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await api.put(
                `/edit-article/:${id.replace(':', '')}`,
                {
                    titleArticle: title.current.value,
                    contentArticle: content.current.value,
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status == 201) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Erro ao editar artigo');
            }
        }
    };

    const listArticleId = async () => {
        try {
            const response = await api.get('/list-articles', {
                params: {
                    idArticle: id.replace(':', ''),
                },
            });
            title.current.value = response.data.title;
            content.current.value = response.data.content;
        } catch (error) {
            toast.error(error);
        }
    };
    
    useEffect(() => {
        listArticleId();
    }, [id]);
    return (
        <div className="flex justify-center w-lvw">
            <Toaster position="top-center" richColors closeButton />
            <div className="flex gap-3 flex-col w-1/2 mt-5">
                <h3 className="text-slate-800 text-3xl">Editar artigo</h3>
                <input
                    type="text"
                    className="bg-slate-100 rounded-sm py-2 px-1 text-slate-800 outline-none"
                    placeholder="Titulo do artigo"
                    ref={title}
                />

                <textarea
                    className="bg-slate-100 rounded-sm  py-2 px-1 text-slate-800 outline-none h-64"
                    placeholder="Conteudo do artigo"
                    ref={content}
                ></textarea>
                <div className="flex  justify-center w-full">
                    <button
                        className="bg-slate-800 text-white mt-6 w-40 p-2 rounded-full hover:bg-slate-800"
                        onClick={editArticle}
                    >
                        Actualizar
                    </button>
                </div>
            </div>
        </div>
    );
}
