import { useRef, useState } from 'react';
import { toast } from 'sonner';
import api from '../service/api';

function Contacto() {
    const name = useRef('');
    const email = useRef('');
    const message = useRef('');
    const [isLoading, setIsloading] = useState(false);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            setIsloading(true);

            const response = await api.post('/contact-send', {
                email: email.current.value,
                name: name.current.value,
                message: message.current.value,
            });

            if (response.status != 200) {
                return toast.error(response.data.message);
            }
            email.current.value = '';
            name.current.value = '';
            message.current.value = '';
            toast.success(response.data.message);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Erro ao enviar mensagem! tente novamente');
            }
        } finally {
            setIsloading(false);
        }
    };
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-center text-3xl mt-5">Entre em contacto</h1>
            <p className="w-2/4 text-center">
                Em caso de falha ou qualquer problema entre em contacto comigo
                preenchendo o formulario abaixo.
            </p>
            <form
                className="shadow-lg w-2/4 mt-10 flex flex-col gap-5 p-5"
                onSubmit={handleSendMessage}
            >
                <input
                    type="text"
                    placeholder="Nome"
                    className="input-contact"
                    ref={name}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="input-contact"
                    ref={email}
                />
                <textarea
                    cols="40"
                    placeholder="Mensagem"
                    className="input-contact resize-none"
                    ref={message}
                ></textarea>

                <div className="flex items-center justify-center">
                    <button
                        className="bg-slate-800 text-green-600 rounded-full px-3 py-2 w-32 disabled:animate-pulse"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Enviando' : 'Enviar'}
                    </button>
                </div>
            </form>
        </div>
    );
}
export default Contacto;
