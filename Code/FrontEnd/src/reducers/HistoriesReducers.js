import {
    HISTORYS_FETCH_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
    list: [],
    loading:true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HISTORYS_FETCH_SUCCESS:
        return {...state,loading:false,list: action.payload};
        default:
            return state;
    }
};
