import {
    combineReducers,
    configureStore,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Password from 'model/password';

type AppState = {
    passwords: Password[];
    isAddPasswordVisible: boolean;
    isEditPasswordVisible: boolean;
    isGeneratePasswordVisible: boolean;
    isViewPasswordVisible: boolean;
    focusedPasswordId: string | null;
};

const initialData: AppState = {
    passwords: [],
    isAddPasswordVisible: false,
    isEditPasswordVisible: false,
    isGeneratePasswordVisible: false,
    isViewPasswordVisible: false,
    focusedPasswordId: null,
};

const passwordSlice = createSlice({
    name: 'password',
    initialState: initialData,
    reducers: {
        addPassword(state: AppState, action: PayloadAction<Password>) {
            state.passwords = [...state.passwords, action.payload];
        },
        deletePassword(state: AppState, action: PayloadAction<string>) {
            state.passwords = state.passwords.filter(
                (password) => password.id !== action.payload
            );
        },
        updatePassword(state: AppState, action: PayloadAction<Password>) {
            for (let i = 0; i < state.passwords.length; i++) {
                const p = state.passwords[i];
                if (p.id === action.payload.id) {
                    p.domain = action.payload.domain;
                    p.login = action.payload.login;
                    p.password = action.payload.password;
                    p.updatedOn = new Date().toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                    });
                    break;
                }
            }
            state.focusedPasswordId = null;
        },
        closeAddPasswordModal(state: AppState) {
            state.isAddPasswordVisible = false;
        },
        openAddPasswordModal(state: AppState) {
            state.isAddPasswordVisible = true;
        },
        closeEditPasswordModal(state: AppState) {
            state.isEditPasswordVisible = false;
        },
        openEditPasswordModal(state: AppState) {
            state.isEditPasswordVisible = true;
        },
        closeGeneratePasswordModal(state: AppState) {
            state.isGeneratePasswordVisible = false;
        },
        openGeneratePasswordModal(state: AppState) {
            state.isGeneratePasswordVisible = true;
        },
        openViewPasswordModal(state: AppState) {
            state.isViewPasswordVisible = true;
        },
        closeViewPasswordModal(state: AppState) {
            state.isViewPasswordVisible = false;
        },
        setFocussedPasswordId(
            state: AppState,
            action: PayloadAction<string | null>
        ) {
            state.focusedPasswordId = action.payload;
        },
    },
});

const rootPersistConfig = {
    key: 'password-manager',
    storage,
    blacklist: ['password'],
};

const appPersistConfig = {
    key: 'password',
    storage,
    blacklist: [
        'isAddPasswordVisible',
        'isGeneratePasswordVisible',
        'focusedPasswordId',
        'isEditPasswordVisible',
        'isViewPasswordVisible',
    ],
};

const rootReducer = combineReducers({
    password: persistReducer(appPersistConfig, passwordSlice.reducer),
});

const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export const appActions = passwordSlice.actions;
export { store, persistor };
export type StoreStateType = { password: AppState };
