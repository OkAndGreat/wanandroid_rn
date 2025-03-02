import {thunk} from 'redux-thunk'
import rootReducer from '../reducers';
import {configureStore} from "@reduxjs/toolkit";

//replace with configureStore instead
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;