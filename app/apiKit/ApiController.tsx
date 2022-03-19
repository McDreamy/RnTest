import api from './ApiConfig';

export const getUserListApi = () => {
  return api.get('https://jsonplaceholder.typicode.com/users');
};
