/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { successNotify } from '../makers/notify.maker';
import { PageTypeEnum } from '../const';
import {
  deleteTodoAsync,
  getTodoAsync,
  postTodoToggleAsync
} from '../slices/todoListSlice';

export default function TodoList(props) {
  // eslint-disable-next-line react/prop-types
  const {
    getFilterList, list, pageType
  } = props;
  const dispatch = useDispatch();

  function handleRemove(id) {
    return async (e) => {
      e.preventDefault();

      const { payload } = await dispatch(deleteTodoAsync(id));

      successNotify(payload.message);
      dispatch(getTodoAsync());
    };
  }

  function handleToggle(id, isComplete) {
    return async (e) => {
      e.preventDefault();

      const { payload } = await dispatch(postTodoToggleAsync(id));

      if (isComplete) {
        successNotify(`已完成 ${payload.content}`);
      } else {
        successNotify(`待完成 ${payload.content}`);
      }

      dispatch(getTodoAsync());
    };
  }

  function getCompleteCount() {
    return getFilterList(PageTypeEnum.Complete).length;
  }

  function deleteAllCompleteTodo() {
    return new Promise((resolve) => {
      const completeTodoList = getFilterList(PageTypeEnum.Complete);

      completeTodoList.forEach(async (todo) => {
        await dispatch(deleteTodoAsync(todo.id));
      });

      resolve('');
    });
  }

  function handleDeleteAllCompleteTodo(e) {
    e.preventDefault();

    // TODO
    /** when then is happen, the deleteTodo not yet, but I wish it is be deleted,
     * use setTimeout temporarily
    */
    deleteAllCompleteTodo().then(() => {
      setTimeout(async () => {
        successNotify('清除成功');
        await dispatch(getTodoAsync());
      }, 1000);
    });
  }
  return (
    <div className="todoList_items">
      <ul className="todoList_item">
        {list.map((todo) => (
          <li key={todo.id}>
            <label
              htmlFor={todo.id}
              className="todoList_label"
            >
              <input
                id={todo.id}
                className="todoList_input"
                type="checkbox"
                value="true"
                checked={!!todo.completed_at}
                onChange={handleToggle(todo.id, !todo.completed_at)}
              />
              <span>{todo.content}</span>
            </label>
            <a
              href="#"
              onClick={handleRemove(todo.id)}
            >
              <i className="fa fa-times" />
            </a>
          </li>
        ))}
      </ul>
      <div
        className="todoList_statistics"
        style={{ display: pageType !== PageTypeEnum.All ? 'none' : '' }}
      >
        <p>
          { `${getCompleteCount()} 個已完成項目` }
        </p>
        <a
          href="#"
          onClick={handleDeleteAllCompleteTodo}
        >
          清除已完成項目
        </a>
      </div>
    </div>
  );
}
