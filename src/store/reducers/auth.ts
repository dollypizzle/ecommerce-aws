import { SET_CURRENT_USER } from '../actions/actionTypes';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action: { type: any; user: any }) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      // console.log('Action', action);
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      };
    default:
      return state;
  }
};
