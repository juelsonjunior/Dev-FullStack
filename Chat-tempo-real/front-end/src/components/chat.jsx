import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
function Chat() {
    const [nameUser, setNameUser] = useState("juelson junior");
    const messageInput = useRef('');
    const [messageChat, setMessageChat] = useState();
    const socket = io.connect('http://localhost:3001');

    const sendMessageInputChat = () => {
        if (messageInput.current.value == '') {
            console.log('Precisa escrevar uma mensagem');
            return;
        }
        socket.emit('chat message', messageInput.current.value);
        messageInput.current.value = '';
    };

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessageChat(msg);
            console.log(msg);
        });
    }, []);
    useEffect(() => {
        socket.on('login', (user) => {
            setNameUser(user);
            
        console.log('nome usuario', user);
        });

        
        
    }, [nameUser]);
    console.log(nameUser,"oh");
    return (
        <>
            <div className="flex justify-center text-3xl py-3">
                <h1>Bate papo</h1>
            </div>
            <div className="w-full flex items-center justify-center">
                <div className="w-4/5 flex justify-between flex-col md:flex-row gap-5">
                    <div className="bg-white rounded-md flex flex-col gap-5 w-full md:w-2/4 ">
                        <div className="bg-violet-500 px-5 py-2">
                            <span className="text-white font-bold text-lg">
                                Contactos
                            </span>
                        </div>
                        <div className="flex flex-col px-5 mb-5 gap-5">
                            <div className="flex items-center  gap-2">
                                <div className="w-14 h-14 bg-violet-500 inset-3 rounded-full"></div>
                                <div className="flex flex-col">
                                    <span className="text-violet-500">
                                        Juelson Junior
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        Teste de teste
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-md flex flex-col gap-5 w-full">
                        {nameUser ? (
                            <>
                                <div className="bg-violet-500 px-5 py-2">
                                    <div className="flex gap-1">
                                        <div className="bg-white w-10 h-10 rounded-full"></div>
                                        <div className="flex flex-col">
                                            <span className="text-white text-sm">
                                                {nameUser}
                                            </span>
                                            <span className="text-white text-xs">
                                                Online
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-end flex-col px-5  gap-5">
                                    <div className="bg-violet-500 rounded-full p-3 w-2/4">
                                        <p className="text-white text-sm">
                                            Teste de mensagem
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full px-5 mb-5">
                                    <div className="bg-gray-300 rounded-full w-full flex justify-between items-center px-3 py-3">
                                        <input
                                            type="text"
                                            className="bg-transparent w-full outline-none"
                                            ref={messageInput}
                                        />
                                        <FontAwesomeIcon
                                            icon={faPaperPlane}
                                            className="text-violet-500 text-1xl cursor-pointer"
                                            onClick={sendMessageInputChat}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p>Selecione um uma conversa</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chat;
