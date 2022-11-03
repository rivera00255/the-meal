import { createSlice } from "@reduxjs/toolkit";
import { MealType } from "src/pages/Recipe";

export const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState: [] as MealType[],
    reducers: {
        add: (state, action) => {
            const meals = state.find((item) => item.idMeal === action.payload.idMeal);
            if(!meals) {
                state.push(action.payload);
            }
            return state;
        },
        reset: (state) => {
            state = [];
            localStorage.removeItem('bookmark');
            return state;
        }
    }
})

export const { add, reset } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;