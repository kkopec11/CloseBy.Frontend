import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    SET_MESSAGE,
} from "../../constants/actionTypes";

import CompanyAdminService from "../../services/Profiles/companyAdmin.service";

export const regCompAdmin = (firstName, lastName, gender, email, companyId) => (dispatch) => {
    return CompanyAdminService.registerCompanyAdmin(firstName, lastName, gender, email, companyId).then(
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