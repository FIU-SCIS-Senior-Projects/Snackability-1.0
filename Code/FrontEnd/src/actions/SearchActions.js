
import { Actions } from 'react-native-router-flux';
import {
  SNACK_CHANGED,
  PORTION_CHANGED,
  UNITS_CHANGED,
  SEARCH_SUCCESS,
  PROCESSED_CHANGED,
  SEARCH_FAIL,
  SEARCH_SNACK
} from './types';
import { search } from '../util.js'

export const snackChanged = (text) => {
  return {
    type: SNACK_CHANGED,
    payload: text
  };
};

export const portionChanged = (text) => {
  return {
    type: PORTION_CHANGED,
    payload: text
  };
};

export const processedChanged = (boolean) => {
  return {
    type: PROCESSED_CHANGED,
    payload: boolean
  };
};

export const unitsChanged = (text) => {
  return {
    type: UNITS_CHANGED,
    payload: text
  };
};

export const searchForSnack = ({ snack, portion, processed, units }) => {
  return (dispatch) => {
    dispatch({ type: SEARCH_SNACK });

    search(snack, portion, processed, units)
      .then(data => {
        dispatch({ type: SEARCH_SUCCESS, payload: data })
      }
      )
      .catch(() => {
        console.log('catch exception');
        dispatch({ type: SEARCH_FAIL })
      }
      );
  }
};

