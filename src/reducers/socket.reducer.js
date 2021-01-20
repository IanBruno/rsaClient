import {SAVE_SOCKET_IN_STORE, SET_CONNECTED} from "../actions/socket.actions";

const initialState = {
    connection: null,
    connected: false,
}

const socketReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_SOCKET_IN_STORE:
            return { ...state, connection: action.connection };
        case SET_CONNECTED:
            return { ...state, connected: action.connected }
        default:
            return state;
    }
}

export default socketReducer;