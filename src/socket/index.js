import socketIOClient from "socket.io-client";
import socketMessages from './socket.messages';
import store from '../_store';
import {setConnected} from "../actions/socket.actions";

const ENDPOINT = "http://localhost:8000";

export default () => {
    const { dispatch } = store;
    const socket = socketIOClient(`${ENDPOINT}`);
    socketMessages.forEach((m) => {
        socket.on(m.message, m.cb);
    });

    socket.on('connect', () => {
        console.log("Established connection...");
        dispatch(setConnected(true));
    });

    socket.on('connect_error', () => {
        console.log('Connection failed retrying...');
        dispatch(setConnected(false));
    });

    socket.on("disconnect", () => {
        console.log("Disconnected...");
        dispatch(setConnected(false));
    });

    return socket;
}
