import {createStore, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk'
import rootReducer from '../reducers';

//replace with configureStore instead
const index = createStore(rootReducer, applyMiddleware(thunk));
export default index;
