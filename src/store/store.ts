import { configureStore } from "@reduxjs/toolkit";
import imageStoreSlice from "./Slices/imageStoreSlice";

export const store = configureStore({
    reducer : {
        imageList : imageStoreSlice
    }
})