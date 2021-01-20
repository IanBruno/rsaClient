import socketIOClient from "socket.io-client";
import socketMessages from './socket-messages';
import store from '../_store';

const ENDPOINT = "http://localhost:8000";

const createSocket = () => {
    const { dispatch } = store;
    const socket = socketIOClient(`${ENDPOINT}`);
    socketMessages.forEach((m) => {
        socket.on(m.message, m.cb);
    });

    socket.on('connect', () => {
        console.log("Established connection...");

    });

    socket.on('connect_error', (err) => {
        console.log('Connection failed retrying...', err);

    });

    socket.on("disconnect", () => {
        console.log("Disconnected...");
    });

    return socket;
};

export default createSocket;


