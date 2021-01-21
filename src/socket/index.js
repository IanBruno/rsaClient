import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8000";

const createSocket = (nameSelected, setSocketConnected, messagesRef, setMessages) => {
    const socket = socketIOClient(`${ENDPOINT}?name=${nameSelected}`);

    socket.on('newMessage', (message) => {
        const m = [...messagesRef.current];
        m.push({ type: 'message', message: JSON.parse(message) });
        messagesRef.current = m;
        setMessages(m);
    });

    socket.on('userConnected', (user) => {
        const m = [...messagesRef.current];
        m.push({ type: 'user', user: user });
        messagesRef.current = m;
        setMessages(m);
    });

    socket.on('connect', () => {
        console.log("Established connection...");
        setSocketConnected(true);
    });

    socket.on('connect_error', (err) => {
        console.log('Connection failed retrying...', err);
        setSocketConnected(false);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected...");
        setSocketConnected(false);
    });

    return socket;
};

export default createSocket;


