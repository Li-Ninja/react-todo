import { deleteApi, getApi, postApi } from '../makers/api.maker';
import { errorNotify } from '../makers/notify.maker';

function getCheck() {
  return getApi('check')
    .then((res) => res.data)
    .catch((err) => {
      errorNotify(`${err.response.data.message}，請重新登入帳號`);
    });
}

function postUser(postData) {
  return postApi('users', postData)
    .then((res) => res.data)
    .catch((err) => {
      const { data } = err.response;

      errorNotify(err.response.data.message);
      data.error.forEach((item) => errorNotify(item));
    });
}

function postSignIn(postData) {
  return postApi('users/sign_in', postData)
    .then((res) => res)
    .catch((err) => {
      errorNotify(err.message);
    });
}

function logout() {
  return deleteApi('users/sign_out')
    .then((res) => res)
    .catch((err) => {
      errorNotify(err.response.data.message);
    });
}

export {
  getCheck,
  logout,
  postUser,
  postSignIn
};
