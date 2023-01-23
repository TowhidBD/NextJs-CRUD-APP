import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialState {
    users?: string[];
    successMessage?: string;
    errorMessage?: string;
}

const initialState: InitialState = {
    users: [],
    successMessage: '',
    errorMessage: '',
}

const appSlice = createSlice({
    name: 'crudapp',
    initialState,
    reducers: {
        getUsersSuccess: (state, action: PayloadAction<InitialState>) => {
            const { payload } = action;

            return {
                ...state,
                users: payload.users,
                successMessage: payload.successMessage,
            }

        },
        getUsersFailed: (state, action: PayloadAction<InitialState>) => {
            const { payload } = action;
            return {
                ...state,
                errorMessage: payload.errorMessage,
            }
        },
        addUsersSuccess: (state, action: PayloadAction<InitialState>) => {
            const { payload } = action;

            return {
                ...state,
                successMessage: payload.successMessage,
            }

        },
        addUsersFailed: (state, action: PayloadAction<InitialState>) => {
            const { payload } = action;

            return {
                ...state,
                errorMessage: payload.errorMessage,
            }
        },
        updateUserSuccess: (state, action: PayloadAction<InitialState>) => {
            const { payload } = action;

            return {
                ...state,
                successMessage: payload.successMessage,
            }

        },
        updateUserFailed: (state, action: PayloadAction<InitialState>) => {
            const { payload } = action;

            return {
                ...state,
                errorMessage: payload.errorMessage,
            }
        },
        deleteUserSuccess: (state, action: PayloadAction<InitialState>) => {
            const { payload } = action;

            return {
                ...state,
                successMessage: payload.successMessage,
            }

        },
        deleteUserFailed: (state, action: PayloadAction<InitialState>) => {
            const { payload } = action;

            return {
                ...state,
                errorMessage: payload.errorMessage,
            }
        },
        deleteMultipleUsersSuccess: (state, action: PayloadAction<InitialState>) => {
            const { payload } = action;

            return {
                ...state,
                successMessage: payload.successMessage,
            }

        },
        deleteMultipleUsersFailed: (state, action: PayloadAction<InitialState>) => {
            const { payload } = action;

            return {
                ...state,
                errorMessage: payload.errorMessage,
            }
        },

        successMessageClear: (state) => {
            return {
                ...state,
                successMessage: ''
            }
        },
        errorMessageClear: (state) => {
            return {
                ...state,
                errorMessage: ''
            }
        },
    }
})

export const {
    getUsersSuccess,
    getUsersFailed,
    addUsersSuccess,
    addUsersFailed,
    successMessageClear,
    errorMessageClear,
    updateUserSuccess,
    updateUserFailed,
    deleteUserSuccess,
    deleteUserFailed,
    deleteMultipleUsersSuccess,
    deleteMultipleUsersFailed,
} = appSlice.actions;

export default appSlice.reducer;