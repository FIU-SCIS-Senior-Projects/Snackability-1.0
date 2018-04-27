import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  HISTORY_UPDATE,
  HISTORY_CREATE,
  HISTORYS_FETCH_SUCCESS,
  HISTORY_SAVE_SUCCESS
} from './types';

// export const historyUpdate = ({ prop, value }) => ({
//   type: HISTORY_UPDATE,
//   payload: { prop, value }
// });

export const historyCreate = (ndbno, portion, processed, units, name) => {
  console.log('in the create' + ndbno)
  const { currentUser } = firebase.auth();
  console.log(currentUser.uid)
  return (dispatch) => {
    dispatch({ type: HISTORY_UPDATE });
    firebase.database().ref(`/users/${currentUser.uid}/historys`)
      .push({ ndbno, portion, processed, units })
      .then(() => {
        dispatch({ type: HISTORY_CREATE});
       
      });
  }
}

  export const historysFetch = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/historys`)
        .on('value', snapshot => {
          let pay=[];
          snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var data_val = childSnapshot.val();
            pay.push({id:key,data:data_val})
        });
        console.log()
          dispatch({ type: HISTORYS_FETCH_SUCCESS, payload: pay.reverse() });
        });
    };
  };

// export const historySave = ({ name, phone, shift, uid }) => {
//   const { currentUser } = firebase.auth();

//   return (dispatch) => {
//     firebase.database().ref(`/users/${currentUser.uid}/historys/${uid}`)
//       .set({ name, phone, shift })
//       .then(() => {
//         dispatch({ type: HISTORY_SAVE_SUCCESS });
//         Actions.historyList({ type: 'reset' });
//       });
//   };
// };

// export const historyDelete = ({ uid }) => {
//   const { currentUser } = firebase.auth();

//   return () => {
//     firebase.database().ref(`/users/${currentUser.uid}/historys/${uid}`)
//       .remove()
//       .then(() => {
//         Actions.historyList({ type: 'reset' });
//       });
//   };
// };
