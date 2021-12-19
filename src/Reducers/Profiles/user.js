import {
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    SET_USER,
    CLEAR_USER,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAIL,
    GET_USER_LIST_SUCCESS,
    GET_USER_LIST_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    GET_USER_ID_SUCCESS,
    GET_USER_ID_FAIL,
    CLEAN_USER_LIST,
} from "../../Constants/actionTypes";

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case REGISTER_USER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case EDIT_USER_SUCCESS:
            return {
                ...state,
            };
        case EDIT_USER_FAIL:
            return {
                ...state,
            };
        case SET_USER:
            return { ...state, user: payload };

        case CLEAR_USER:
            return { ...state, user: "" };
        case GET_USER_LIST_SUCCESS:
            return {
                ...state,
                user_list: payload
            };
        case GET_USER_LIST_FAIL:
            return {
                ...state,
            };
        case CLEAN_USER_LIST:
            return {
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
            };
        case DELETE_USER_FAIL:
            return {
                ...state,
            };
        case GET_USER_ID_SUCCESS:
            return {
                ...state,
                get_user_id: payload
            };
        case GET_USER_ID_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
}