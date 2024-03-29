import { SET_EDIT_MODE } from "../../Constants/actionTypes";

const initialState = {};

// eslint-disable-next-line
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_EDIT_MODE:
            return { status: payload };

        default:
            return state;
    }
}