import { 
  UPDATE_SETTING,
} from './types';


export const updateSetting = (setting, value) => (dispatch) => {
  dispatch({
    type: UPDATE_SETTING,
    setting,
    value
  });
};