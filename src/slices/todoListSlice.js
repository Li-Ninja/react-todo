import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import {
  deleteTodo,
  fetchTodo,
  postTodo,
  postTodoToggle
} from '../apis/todo.api';

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState: [],
  reducers: {
    getTodo: (_state, action) => action.payload
  }
});

export const getTodoAsync = createAsyncThunk(
  'todoList/getTodoAsync',
  async (_payload, { dispatch }) => {
    const { todos } = await fetchTodo();

    dispatch(todoListSlice.actions.getTodo(todos));
  }
);

export const addTodoAsync = createAsyncThunk(
  'todoList/addTodoAsync',
  async (payload) => {
    const postData = {
      todo: {
        content: payload
      }
    };

    const res = await postTodo(postData);

    return res;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todoList/deleteTodoAsync',
  async (payload) => {
    const res = await deleteTodo(payload);

    return res;
  }
);

export const postTodoToggleAsync = createAsyncThunk(
  'todoList/postTodoToggleAsync',
  async (payload) => {
    const res = await postTodoToggle(payload);

    return res;
  }
);

export const {
  getTodo,
  addTodo
} = todoListSlice.actions;

export default todoListSlice.reducer;
