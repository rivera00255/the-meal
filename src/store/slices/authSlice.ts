import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: { credential: '' },
    reducers: {
        login: (state, action) => {
            state.credential = action.payload.credential;
            return state;
        },
        logout: (state) => {
            state.credential = '';
            localStorage.removeItem('auth');
            localStorage.removeItem('bookmark');
            return state;
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;