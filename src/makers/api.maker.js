import axios from 'axios';

const api = axios.create({
  baseURL: 'https://todoo.5xcamp.us/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

function requestHandler(request) {
  const accessToken = localStorage.getItem('token');

  if (accessToken) {
    request.headers.Authorization = `${accessToken}`;
  }

  return request;
}

api.interceptors.request.use(requestHandler);

const getApi = (url, postData) => api.get(url, postData);
const postApi = (url, postData) => api.post(url, postData);
const putApi = (url, postData) => api.put(url, postData);
const deleteApi = (url) => api.delete(url);
const patchApi = (url, postData) => api.patch(url, postData);

export {
  getApi,
  postApi,
  putApi,
  deleteApi,
  patchApi
};
