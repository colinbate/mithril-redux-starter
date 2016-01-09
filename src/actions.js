export const INCREMENT_AGE = 'INCREMENT_AGE';
export const DECREMENT_AGE = 'DECREMENT_AGE';
export const RESET_AGE = 'RESET_AGE';

export function incrementAge() {
  return {
    type: INCREMENT_AGE
  };
}

export function decrementAge() {
  return {
    type: DECREMENT_AGE
  };
}

export function resetAge() {
  return (dispatch) => {
    setTimeout(() => dispatch({
      type: RESET_AGE,
      redraw: true,
      age: 30
    }), 2000);
  };
}