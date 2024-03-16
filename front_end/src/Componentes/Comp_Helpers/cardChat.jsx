import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Picker from 'emoji-picker-react'
import "../../Css/chat.css"
import { useAuth } from '../../context/provider.jsx';
const socket = io('http://localhost:5000');

function ChatClient() {
    const { user, messages, addMessage } = useAuth();
    const [userNombre, setUserNombre] = useState('Usuario no encontrado');
    const [messageInput, setMessageInput] = useState('');
    const [selectedOption, setSelectedOption] = useState('1');

    const getMessageBackgroundColor = () => {
        switch (selectedOption) {
            case '2':
                return 'red';
            case '3':
                return '#9d9d00';
            case '4':
                return 'blue';
            default:
                return 'rgb(28, 200, 138)';
        }
    };

    useEffect(() => {
        if (user && user.user && user.user.nombre) {
            setUserNombre(user.user.nombre);
        }
    }, [user]); 

    useEffect(() => {
        const messageListener = (message) => {
            console.log('Mensaje recibido:', message);
            if (typeof message === 'object' && message.text && message.time) {
                message.user = userNombre;

                addMessage(message);
            }
        };

        socket.on('message', messageListener);

        return () => {
            socket.off('message', messageListener);
        };
    }, [userNombre, addMessage]); // Removido 'messages' de las dependencias

    const sendMessage = () => {
        const newMessage = {
            text: messageInput,
            color: getMessageBackgroundColor(),
            time: new Date(),
            user: userNombre
        };
        addMessage(newMessage);
        setMessageInput('');
    
        socket.emit('message', newMessage);
    };

    return (
        <div className="col-md-6">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="text-success fw-bold m-0">Crear Notificacion</h6>
                </div>
                <ul className="list-group list-group-flush ul-chat chat-container">
                    <div className='contenedor-padre'>
                    {messages.map((message, index) => (
                            <div key={index} className="message-container">
                                <span className="name-user">
                                    {userNombre}
                                    </span>
                                <li className="message-item" style={{ backgroundColor: message.color, color: 'white' }}>
                                    {message.text}
                                    {message.time &&
                                        <span className="message-time">
                                            {new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                        </span>
                                    }
                                </li>
                            </div>
                        ))}
                    </div>
                    <div className='chat-container'>
                        <div className="messageBox">
                            <div className="fileUploadWrapper">
                                <div className="select1">
                                    <select onChange={(e) => setSelectedOption(e.target.value)}>
                                        <option value="1">Emergencias</option>
                                        <option value="2">Clase A</option>
                                        <option value="3">Clase B</option>
                                        <option value="4">Clase C</option>
                                    </select>
                                </div>
                            </div>
                            <input
                                required=""
                                placeholder="Message..."
                                type="text"
                                id="messageInput"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                            />
                            <button onClick={sendMessage} id="sendButton">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                                    <path fill="none" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path>
                                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="33.67" stroke="#6c6c6c" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default ChatClient;