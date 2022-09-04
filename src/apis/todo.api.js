import { getApi, postApi } from '../makers/api.maker';
import { errorNotify } from '../makers/notify.maker';

function fetchTodo() {
  return getApi('todos')
    .then((res) => res.data)
    .catch((err) => {
      errorNotify(err.message);
    });
}

function postTodo(postData) {
  return postApi('todos', postData)
    .then((res) => res.data)
    .catch((err) => {
      const { data } = err.response;

      errorNotify(err.response.data.message);
      data.error.forEach((item) => errorNotify(item));
    });
}

export {
  fetchTodo,
  postTodo
};
