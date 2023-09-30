import { createSlice } from "@reduxjs/toolkit";

let gameSlice = createSlice({
    name: "game",
    initialState: {
        swapCheck: []
    },
    reducers: {
        check: (state, action) => {
            return {
                ...state,
                swapCheck: [...state.swapCheck, action.payload]
            }
        }
    }
})

export const { check } = gameSlice.actions

export default gameSlice.reducer