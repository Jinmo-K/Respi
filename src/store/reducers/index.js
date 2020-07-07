import { combineReducers } from 'redux';
import settingReducer from './settingReducer';

export default combineReducers({
  settings: settingReducer,
});