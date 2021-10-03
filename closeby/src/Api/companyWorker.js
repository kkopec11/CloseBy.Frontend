import axios from "axios";
import authHeader from "../services/Auth/auth-header";

const API_URL = "http://localhost:5000/api/company-worker";

const getCompanyworkersList = (pageNumber, rowsPerPage, company) => {
    return axios.post(API_URL + "/list",
        {
            page: pageNumber,
            limit: rowsPerPage,
            id: "08101c44-477a-4c29-9004-6ec44808d96d"
        },
        {
            headers: authHeader()
        }
    );
};

export default {
    getCompanyworkersList,
};
