import axios, {AxiosInstance, AxiosPromise, Method} from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {HTTPMethod} from '../common/Enum';
import {TIMEOUT_TIME} from '../common/Constants';

const instance: AxiosInstance = axios.create({
  timeout: TIMEOUT_TIME,
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetchUrl = (
  method: Method,
  endpoint: string,
  data: any,
  headers: any,
): AxiosPromise => {
  return NetInfo.fetch()
    .then(networkStatus => {
      if (!networkStatus.isConnected) {
        throw 'No internet connection. Please try again later.';
      }

      if (method === HTTPMethod.GET) {
        return instance({
          method: method,
          url: endpoint,
          headers: headers,
        });
      }

      return instance({
        method: method,
        data: data,
        url: endpoint,
        headers: headers,
      });
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

const api = {
  get: (endpoint: string, data?: any, headers?: any): AxiosPromise =>
    fetchUrl(HTTPMethod.GET, endpoint, data, headers),
  post: (endpoint: string, data?: any, headers?: any): AxiosPromise =>
    fetchUrl(HTTPMethod.POST, endpoint, data, headers),
  put: (endpoint: string, data?: any, headers?: any): AxiosPromise =>
    fetchUrl(HTTPMethod.PUT, endpoint, data, headers),
  delete: (endpoint: string, data?: any, headers?: any): AxiosPromise =>
    fetchUrl(HTTPMethod.DELETE, endpoint, data, headers),
};

export default api;
