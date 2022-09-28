import axios from '../../axios-order';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER } from './actionTypes';

export function setCurrentUser(user: {}) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function login(data: {}) {
  return (dispatch: (arg0: { type: string; user: {} }) => void) => {
    return axios.post('/login', data).then(res => {
      const token = res.data.token;
      const user = res.data.user;
      cookie.set('jwtToken', token);
      cookie.set('user', user);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  };
}
