// rootReducer.js
import { combineReducers } from 'redux';
import userReducer from '../reducers/userReducers'; // 导入 userReducer
import authReducer from './auth'; // 导入 authReducer

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});

export default rootReducer;
