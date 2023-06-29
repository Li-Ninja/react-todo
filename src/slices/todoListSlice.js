import { createReducer } from '@reduxjs/toolkit';

export const todoListSlice = createReducer({
  name: 'todoList',
  initialState: []
});

export default todoListSlice.reducer;
