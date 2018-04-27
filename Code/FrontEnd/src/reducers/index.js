import { combineReducers } from 'redux';
import SearchReducer from './SearchReducer';
import MemberReducer from './MemberReducer';
import HistoryReducer from './HistoryReducer';
import HistoriesReducer from './HistoriesReducers';
import AuthReducers from './AuthReducers';

export default combineReducers({
    search: SearchReducer,
    members: MemberReducer,
    auth: AuthReducers,
    snackHistory:HistoryReducer,
    histories:HistoriesReducer
  });