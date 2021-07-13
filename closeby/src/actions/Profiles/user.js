import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    SET_MESSAGE,
} from "../../Constants/actionTypes";

import AuthService from "../../Services/Profiles/user.service";

export const registerUser = (firstName, lastName, gender, email, password) => (dispatch) => {
    return AuthService.registerUser(firstName, lastName, gender, email, password).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};