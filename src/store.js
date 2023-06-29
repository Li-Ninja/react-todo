import { configureStore } from '@reduxjs/toolkit';
import todoListReducer from './slices/todoListSlice';

export const store = configureStore({
  reducer: {
    todoList: todoListReducer
  }
});
