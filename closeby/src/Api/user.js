import axios from "axios";
import authHeader from "../services/Auth/auth-header";

const API_URL = "http://localhost:5000/api/user";

const getUsersList = (pageNumber, rowsPerPage) => {
    return axios.post(API_URL + "/list",
        {
            page: pageNumber,
            limit: rowsPerPage
        },
        {
            headers: authHeader(),
        }
    );
};

export default {
    getUsersList,
};
