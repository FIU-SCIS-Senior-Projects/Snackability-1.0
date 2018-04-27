import {
    HISTORY_UPDATE,
    HISTORY_CREATE,
    HISTORY_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    consumed: false,
    loading2: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HISTORY_UPDATE:
            return { ...INITIAL_STATE, loading2: true }
        case HISTORY_CREATE:
            return { ...INITIAL_STATE, consumed: true, loading2: false }
        case HISTORY_SAVE_SUCCESS:
            return { consumed: true, loading2: false }
        default:
            return state;
    }
};
