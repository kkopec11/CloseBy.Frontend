import {
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    SET_MESSAGE,
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
    SET_MESSAGE_SUCCESS,
    SET_MESSAGE_FAIL,
} from "../../Constants/actionTypes";
import {
    ADMIN_500,
    ERROR_400,
    USER_REG_SUCCESS_200,
    PROFILE_EDIT_SUCCESS_200
} from "../../Static/message";
import UserService from "../../Services/Profiles/user.service";
import { toast } from 'react-toastify';

export const registerUserDispatch = (firstName, lastName, gender, email, password) => (dispatch) => {
    return UserService.registerUserAPI(firstName, lastName, gender, email, password).then(
        (response) => {
            dispatch({
                type: REGISTER_USER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE_SUCCESS,
                payload: USER_REG_SUCCESS_200,
            });
            toast.success("Your account has been successfully registered!")

            return Promise.resolve();
        },
        (error) => {
            let message = "Error"
            if ((error.response.status === 400) || (error.response.data.message === "Email already in use")) {
                message = ERROR_400;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: REGISTER_USER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE_FAIL,
                payload: message,
            });
            toast.warn(message);

            return Promise.reject();
        }
    );
};

export const setUser = (user) => (dispatch) => {
    localStorage.setItem("User", JSON.stringify(user));

    dispatch({
        type: SET_USER,
        payload: user,
    });
};

export const clearUserId = () => (dispatch) => {
    dispatch({
        type: CLEAR_USER,
    });
};

export const editUser = (id, firstName, lastName, gender, email) => (dispatch) => {
    return UserService.updateUserAPI(id, firstName, lastName, gender, email).then(
        (response) => {
            dispatch({
                type: EDIT_USER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE_SUCCESS,
                payload: PROFILE_EDIT_SUCCESS_200,
            });

            toast.success("Your changes have been saved.")

            return Promise.resolve();
        },
        (error) => {
            let message = "Error"
            if ((error.response.status === 400) || (error.response.data.type === "validation") || (error.response.data.errors[0].errorMessage === "email has to be unique")) {
                message = ERROR_400;
            } else {
                message = ADMIN_500;
            }

            dispatch({
                type: EDIT_USER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE_FAIL,
                payload: message,
            });

            toast.error(message)

            return Promise.reject();
        }
    );
};

export const getUserListDispatch = (pageNumber, rowsPerPage, companyId) => (dispatch) => {
    return UserService.getUserListAPI(pageNumber, rowsPerPage, companyId).then(
        (response) => {
            dispatch({
                type: GET_USER_LIST_SUCCESS,
                payload: response.data,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve(response);
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: GET_USER_LIST_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            toast.error(message)

            return Promise.reject();
        }
    );
};

export const deleteUserDispatch = (id, companyId) => (dispatch) => {
    return UserService.deleteUserAPI(id, companyId).then(
        (response) => {
            dispatch({
                type: DELETE_USER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            toast.success("User has been successffuly deleted.")

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
                type: DELETE_USER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            toast.error(message)

            return Promise.reject();
        }
    );
};

export const getUserIdDispatch = (id) => (dispatch) => {
    return UserService.getUserIdAPI(id).then(
        (response) => {
            dispatch({
                type: GET_USER_ID_SUCCESS,
                payload: response.data,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve(response);
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: GET_USER_ID_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};