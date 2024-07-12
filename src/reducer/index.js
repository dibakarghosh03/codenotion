import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import courseSlice from "../slices/courseSlice";
import viewCourseSlice from "../slices/viewCourseSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'profile', 'cart', 'course','viewCourse'] 
};

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course: courseSlice,
    viewCourse: viewCourseSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;