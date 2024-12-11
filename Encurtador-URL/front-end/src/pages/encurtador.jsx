import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { toast } from 'sonner';
import api from '../service/api';
function Encurtador() {
    const [codURLIsOn, setCodURLIsOn] = useState(false);
    const [urlUser, setUrlUser] = useState('');
    const [codPersonUser, setCodPersonUser] = useState('');
    const [urlShort, setUrlShort] = useState();
    const [isLoading, setIsloading] = useState(false);
    const [copyUrlShort, setCopyUrlShort] = useState('');

    const handleShortUrl = async () => {
        try {
            setIsloading(true);
            const response = await api.post('/short-url', {
                url: urlUser,
                codPerson: codPersonUser,
            });

            if (response.status == 201) {
                setUrlShort(response.data.message);
            } else if (response.status == 200) {
                toast.warning(response.data.message);
                setUrlShort(response.data.dataDuplicated);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Erro ao encurtar a url');
            }
        } finally {
            setIsloading(false);
        }
    };

    const copyShortURL = async () => {
        try {
            await navigator.clipboard.writeText(urlShort);
            setCopyUrlShort('Copiado');
        } catch (error) {
            toast.error('Falha ao copiar o texto');
        }
    };
    return (
        <div className="w-full flex items-center  flex-col gap-3">
            <h1 className="text-center text-3xl mt-5">Encurtador de URL</h1>
            <p className="w-2/4 text-center">
                Transforme seus links longos em algo elegante e perfeito para
                compartilhar nas suas redes ou com seus amigos.Experimente o meu
                encurtador de link grátis e simplifique sua presença online.
            </p>
            <div className="shadow-lg w-5/12 flex flex-col justify-center p-5 rounded-lg mt-3">
                <div className="flex items-center justify-between w-full h-10">
                    <input
                        type="text"
                        placeholder="Cole aqui a sua URL Exemplo: www.site.com"
                        className="w-full outline-none px-1 h-6"
                        value={urlUser}
                        onChange={(e) => setUrlUser(e.target.value)}
                    />
                    <button
                        className="px-3 py-3 rounded-md flex items-center justify-center cursor-pointer disabled:animate-pulse bg-slate-800"
                        disabled={isLoading}
                        onClick={handleShortUrl}
                    >
                        <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="text-green-600"
                        />
                    </button>
                </div>

                <hr className="mt-4" />

                {!urlShort > 0 ? (
                    <div>
                        <div className="mt-5">
                            <span>
                                Deseja personalizar o código do seu link
                            </span>
                            <p className="text-sm text-slate-400">
                                Quando não informado, o código é gerado
                                aleatoriamente
                            </p>
                            <div className="flex gap-4 mt-3">
                                <button
                                    className="bg-slate-300 text-slate-800 rounded-full px-4 py-1"
                                    onClick={() => setCodURLIsOn(false)}
                                >
                                    Não
                                </button>
                                <button
                                    className="bg-slate-300 text-slate-800 rounded-full px-4 py-1"
                                    onClick={() => setCodURLIsOn(true)}
                                >
                                    Sim
                                </button>
                            </div>
                        </div>

                        <hr className="mt-4 mb-5" />

                        <div
                            className={`flex items-center justify-between w-full h-10 ${
                                codURLIsOn ? 'opacity-100' : 'opacity-50'
                            }`}
                        >
                            <div className="bg-slate-800 text-green-600 h-full flex items-center rounded-s-md text-nowrap px-2 p-1 text-sm">
                                Código
                            </div>
                            <input
                                type="text"
                                placeholder="Seu codigo personalizado aqui"
                                className="w-full outline-none px-3 h-full text-slate-400"
                                disabled={!codURLIsOn}
                                value={codPersonUser}
                                onChange={(e) =>
                                    setCodPersonUser(e.target.value)
                                }
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <h6 className="mt-5 mb-5 text-center">
                            Sua URl encurtada
                        </h6>

                        <div className="flex items-center justify-between w-full h-10">
                            <div className="bg-slate-800 text-green-600 h-full flex items-center rounded-s-md text-nowrap px-2 p-1 text-sm">
                                URL
                            </div>
                            <div className="flex items-center w-full outline-none px-3 h-full text-slate-800">
                                {urlShort}
                            </div>
                        </div>
                        <div className="mt-3 flex items-end justify-end w-full">
                            <button
                                className="bg-slate-800 text-green-600 rounded-md px-3 py-2"
                                onClick={copyShortURL}
                            >
                                {copyUrlShort.length > 0
                                    ? copyUrlShort
                                    : 'Copiar'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Encurtador;
