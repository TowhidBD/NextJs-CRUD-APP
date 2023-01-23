import { addUsersFailed, addUsersSuccess, updateUserSuccess, updateUserFailed, deleteUserSuccess, deleteMultipleUsersSuccess, deleteMultipleUsersFailed } from "@/slices/userSlice";
import { BASE_URL } from "@/utils/constant";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { Data } from "types";
import { IUsers } from '../../types';

const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const getUsers = async () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = axios.get('/api/users');

            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }
}

const addUser = (formData: any) => {

    return async (dispatch: Dispatch<AnyAction>) => {
        try {

            const response = await axios.post('/api/users', formData, config);

            dispatch(addUsersSuccess({
                successMessage: response.data.successMessage
            }))

        } catch (error: any) {
            dispatch(addUsersFailed({
                errorMessage: error?.response?.data?.error
            }))

        }
    }
}

const updateUser = (userId: string, formData: Data) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {

            const response = await axios.put(`/api/user/${userId}`, formData, config);

            dispatch(updateUserSuccess({
                successMessage: response.data.successMessage
            }))

        } catch (error: any) {
            dispatch(updateUserFailed({
                errorMessage: error?.response?.data?.error
            }))

        }
    }

}

const deleteUser = (userId: string) => {

    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            const response = await axios.delete(`/api/user/${userId}`, config);

            dispatch(deleteUserSuccess({
                successMessage: response.data.successMessage
            }))
        } catch (error: any) {
            dispatch(deleteUserSuccess({
                errorMessage: error?.response?.data?.error
            }))
        }
    }

}

const deleteUsers = (ids: Array<Object>) => {

    return async (dispatch: Dispatch<AnyAction>) => {

        try {
            const response = await axios.delete(`/api/users/${ids}`, config);

            dispatch(deleteMultipleUsersSuccess({
                successMessage: response.data.successMessage
            }))
        } catch (error: any) {
            dispatch(deleteMultipleUsersFailed({
                errorMessage: error?.response?.data?.error
            }))
        }
    }

}

export { getUsers, addUser, deleteUser, updateUser, deleteUsers }