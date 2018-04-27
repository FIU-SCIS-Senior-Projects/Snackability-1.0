import {
  SNACK_CHANGED,
  PORTION_CHANGED,
  UNITS_CHANGED,
  SEARCH_SUCCESS,
  PROCESSED_CHANGED,
  SEARCH_FAIL,
  SEARCH_SNACK
} from '../actions/types';

const INITIAL_STATE = {
  snack: '',
  portion: '',
  units: '',
  processed: false,
  snack_info: '',
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SNACK_CHANGED:
     console.log(action.payload)
      return { ...state, snack: action.payload };
    case PORTION_CHANGED:
      return { ...state, portion: action.payload };
    case UNITS_CHANGED:
      return { ...state, units: action.payload };
    case PROCESSED_CHANGED:
      return { ...state, processed: action.payload };
    case SEARCH_SNACK:
      return { INITIAL_STATE, loading: true };
    case SEARCH_SUCCESS:
      return { ...INITIAL_STATE, snack_info: action.payload };
    case SEARCH_FAIL:
      console.log('search failed dispatch')
      return { ...INITIAL_STATE, snack_info: 'No results' };
    default:
      return state;
  }
};
