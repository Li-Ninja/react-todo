import {
  deleteApi,
  getApi,
  postApi,
  patchApi
} from '../makers/api.maker';
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

function deleteTodo(id) {
  return deleteApi(`todos/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      const { data } = err.response;

      errorNotify(err.response.data.message);
      data.error.forEach((item) => errorNotify(item));
    });
}

function postTodoToggle(id) {
  return patchApi(`todos/${id}/toggle`)
    .then((res) => res.data)
    .catch((err) => {
      const { data } = err.response;

      errorNotify(err.response.data.message);
      data.error.forEach((item) => errorNotify(item));
    });
}

export {
  deleteTodo,
  fetchTodo,
  postTodo,
  postTodoToggle
};
