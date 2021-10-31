import { SET_USER_ID, CLEAR_USER_ID, SET_COMP_ADMIN_ID, CLEAR_COMP_ADMIN_ID } from "../Constants/actionTypes";


const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_USER_ID:
            return { id_user: payload };

        case CLEAR_USER_ID:
            return { id_user: "" };

        case SET_COMP_ADMIN_ID:
            return { id_comp_admin: payload };

        case CLEAR_COMP_ADMIN_ID:
            return { id_comp_admin: "" };

        default:
            return state;
    }
}