const TEST_ACTION = 'salsify/filter/TEST_ACTION';

const initialState = {

};

export default function filter(state = initialState, action) {
  switch(action.type) {
    case TEST_ACTION:
      return {
        ...state,
      };
    default:
      return state;
  }
};

// export function
