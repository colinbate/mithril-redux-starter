import { combineReducers } from 'redux';
import * as Actions from './actions';

function name(state = '', action) {
  return state;
}

function age(state = 0, action) {
  switch (action.type) {
    case Actions.INCREMENT_AGE:
      return state + 1;
    case Actions.DECREMENT_AGE:
      return Math.max(0, state - 1);
    case Actions.RESET_AGE:
      return action.age;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  name,
  age
});

export default rootReducer;