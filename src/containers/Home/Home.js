import { useEffect, useState, useRef } from 'react';
import socket from '../../socket';

const Home = () => {

    const [nameSelected, setNameSelected] = useState(null);
    const nameInputRef = useRef(null);
    const messageInputRef = useRef(null);
    const [socketConnected, setSocketConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const messagesRef = useRef([]);
    const socketRef = useRef(null);

    useEffect(() => {
        if(nameSelected){
            socketRef.current = socket(nameSelected, setSocketConnected, messagesRef, setMessages);
        }
    }, [nameSelected]);

    useEffect(() => {
        if(!socketConnected){
            socketRef.current = null;
        }
    }, [socketConnected]);

    const joinToChat = (e) => {
        e.preventDefault();
        const value = nameInputRef.current.value;
        if(value.trim() !== ''){
            setNameSelected(value);
        } else {
            alert('El nombre no puede estar vacío.');
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        const value = messageInputRef.current.value;
        socketRef.current.emit('message', value);
        messageInputRef.current.value = '';
    }

    const renderJoinForm = () => (
        <form onSubmit={joinToChat}>
            <input ref={nameInputRef}/>
            <button type="submit">
                Entrar
            </button>
        </form>
    );

    const renderTryConnection = () => (
        <div>Conectando....</div>
    );

    const renderChat = () => {
        return (
            <form onSubmit={sendMessage}>
                <ul>
                    {
                        messages.map((m, i) => {
                            if(m.type === 'message'){
                                return <li key={`message_${i}`}> From { m.from }: {m.message} </li>
                            } else {
                                return <li key={`message_${i}`}>  {m.user} se unió a la sala.</li>
                            }
                        } )
                    }
                </ul>
                <input ref={messageInputRef}/>
                <button type="submit">
                    Enviar
                </button>
            </form>
        )
    };


    return (
        <div>
            {
                socketConnected && renderChat()
            }
            {
                !socketConnected && !nameSelected && renderJoinForm()
            }
            {
                !socketConnected && nameSelected && renderTryConnection()
            }
        </div>
    );
}

export default Home;