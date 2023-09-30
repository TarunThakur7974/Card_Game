import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";

let store = configureStore({
    reducer: {
        game: gameSlice
    }
})

export default store