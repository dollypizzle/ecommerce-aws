import axios from 'axios';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import cookie from 'js-cookie';
import { SET_CURRENT_USER } from './actionTypes';

export function setCurrentUser(user: any) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function userSignupRequest(userData: any) {
  return (dispatch: (arg0: { type: string; user: any }) => void) => {
    return axios.post('/api/register', userData).then(res => {
      const token = res.data.token;
      const user = res.data.user;
      cookie.set('jwtToken', token);
      cookie.set('user', user);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  };
}
