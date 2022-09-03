import { getApi, postApi } from '../makers/api.maker';
import { errorNotify } from '../makers/notify.maker';

function getCheck() {
  return getApi('check')
    .then((res) => res.data)
    .catch((err) => {
      errorNotify(err.message);
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

export {
  getCheck,
  postUser,
  postSignIn
};
