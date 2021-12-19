import {
    REGISTER_COMP_ADMIN_SUCCESS,
    REGISTER_COMP_ADMIN_FAIL,
    SET_COMP_ADMIN,
    CLEAR_COMP_ADMIN,
    EDIT_COMP_ADMIN_SUCCESS,
    EDIT_COMP_ADMIN_FAIL,
    GET_COMP_ADMIN_LIST_SUCCESS,
    GET_COMP_ADMIN_LIST_FAIL,
    DELETE_COMP_ADMIN_SUCCESS,
    DELETE_COMP_ADMIN_FAIL,
    GET_COMP_ADMIN_ID_SUCCESS,
    GET_COMP_ADMIN_ID_FAIL,
    CLEAN_COMP_ADMIN_LIST
} from "../../Constants/actionTypes";

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_COMP_ADMIN_SUCCESS:
            return {
                ...state,
            };
        case REGISTER_COMP_ADMIN_FAIL:
            return {
                ...state,
            };
        case EDIT_COMP_ADMIN_SUCCESS:
            return {
                ...state,
            };
        case EDIT_COMP_ADMIN_FAIL:
            return {
                ...state,
            };
        case SET_COMP_ADMIN:
            return { ...state, comp_admin: payload };
        case CLEAR_COMP_ADMIN:
            return { ...state, comp_admin: "" };
        case GET_COMP_ADMIN_LIST_SUCCESS:
            return {
                ...state,
                comp_admin_list: payload
            };
        case GET_COMP_ADMIN_LIST_FAIL:
            return {
                ...state,
            };
        case CLEAN_COMP_ADMIN_LIST:
            return {
            };
        case DELETE_COMP_ADMIN_SUCCESS:
            return {
                ...state,
            };
        case DELETE_COMP_ADMIN_FAIL:
            return {
                ...state,
            };
        case GET_COMP_ADMIN_ID_SUCCESS:
            return {
                ...state,
                get_comp_admin_id: payload
            };
        case GET_COMP_ADMIN_ID_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
}
