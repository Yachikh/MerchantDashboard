import * as actionTypes from "./actionTypes";
import { xhrCallFailure } from "./xhrStatusActions";
import { router } from "react-router";
import axios from "axios";

export function loginSuccess(user) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        user
    };
}

export function loginRequested(user) {
    return {
        type: actionTypes.LOGIN_REQUEST,
        user
    };
}

export function loginRequest(email, password) {
    const user = { email, password };
    return function (dispatch) {
        dispatch(loginRequested(user));
    };
}

/* eslint-disable */
export function login(user) {
    return function (dispatch) {
        return axios
            .post("http://localhost:59947/api/dashboard/security",
            {
                email: user.email,
                password: user.password
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(user => {
                console.log(user.data);
                dispatch(loginSuccess(user.data))
            })
            .catch(error => {
                console.log(error);
            });
    }
}

// export function loadItems() {
//     return function (dispatch) {
//         return axios.get("/api/item")
//             .then(items => {
//                 dispatch(loadItemsSuccess(items.data));
//             })
//             .catch(error => {
//                 dispatch(xhrCallFailure);
//                 throw (error);
//             });
//     };
// }

// export function updateItem(item) {
//     return function (dispatch) {
//         dispatch(updateItemsSuccess(item));
//     };
// }

