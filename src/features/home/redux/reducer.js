import initialState from './initialState';
import tokenReducer from './getTokenSlice'
import productsReducer from './productsSlice'
import searchReducer from './searchSlice';


const reducers = [
  tokenReducer,
  productsReducer,
  searchReducer
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
