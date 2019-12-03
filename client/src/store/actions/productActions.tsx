import axios from '../../axios-order';
import cookie from 'js-cookie';

export function createProduct(event: {}) {
  return (dispatch: any) => {
    const token = cookie.get('jwtToken');
    return axios.post('/products', event, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
}
