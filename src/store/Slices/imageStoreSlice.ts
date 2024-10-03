import { createSlice } from "@reduxjs/toolkit";
interface InitialStateInterface {
    images: any
}
const initialState: InitialStateInterface = {
    images: {}
};

const imageListSlice = createSlice({
    name: 'imageList',
    initialState,
    reducers: {
        setImageList(state: any, action: { payload: any, type: string }) {
            const { key, images } = action.payload;
            state.images[key?.toLowerCase()] = images;
        },

        clearImageList(state) {
            state.images = {};
        }
    }
});

export const { setImageList, clearImageList } = imageListSlice.actions;
export default imageListSlice.reducer;
