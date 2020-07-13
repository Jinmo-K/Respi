import {
  UPDATE_SETTING,
  RESET_SETTINGS,
} from '../actions/types';

const DEFAULT_INHALE_TIME = 1000;
const DEFAULT_EXHALE_TIME = 1000;
const DEFAULT_PAUSE_TIME = 0;
const DEFAULT_HOLD_TIME = 0;
const DEFAULT_NUM_CYCLES = 0;
const DEFAULT_NUM_ROUNDS = 0;
const DEFAULT_WHM = false;

const initialState = {
  inhaleTime: DEFAULT_INHALE_TIME,
  exhaleTime: DEFAULT_EXHALE_TIME,
  pauseTime: DEFAULT_PAUSE_TIME,
  holdTime: DEFAULT_HOLD_TIME,
  numCycles: DEFAULT_NUM_CYCLES,
  numRounds: DEFAULT_NUM_ROUNDS,
  whm: DEFAULT_WHM,
};

export default (state=initialState, action) => {
  const actionHandlers = {
    [RESET_SETTINGS]: initialState,
    [UPDATE_SETTING]: {
      [action.setting]: action.value
    }
  };

  return Object.assign({}, state, actionHandlers[action.type]);
};
