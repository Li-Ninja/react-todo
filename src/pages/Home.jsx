/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  deleteTodo,
  fetchTodo,
  postTodo,
  postTodoToggle
} from '../apis/todo.api';
import { notify, successNotify } from '../makers/notify.maker';

const PageTypeEnum = Object.freeze(
  { All: 'All', Complete: 'Complete', NotComplete: 'NotComplete' }
);

export default function Home() {
  const { useEffect, useState } = React;
  const [todoList, setTodoList] = useState([]);
  const [beFilterTodoList, setBeFilterTodoList] = useState([]);
  const [pageType, setPageType] = useState(PageTypeEnum.All);

  function getFilterList(type) {
    switch (type) {
      case PageTypeEnum.Complete:
        return todoList.filter((todo) => todo.completed_at);

      case PageTypeEnum.NotComplete:
        return todoList.filter((todo) => !todo.completed_at);
      default:
        return todoList;
    }
  }

  useEffect(() => {
    setBeFilterTodoList(getFilterList(pageType));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoList, pageType]);

  function changePageType(type) {
    // TODO click once to but it will execute three times
    return (e) => {
      e.preventDefault();
      setPageType(type);
    };
  }

  function getTodo() {
    fetchTodo().then((res) => {
      const { todos } = res;

      setTodoList(todos);
    });
  }

  useEffect(() => {
    getTodo();
  }, []);

  function addTodo(content) {
    const postData = {
      todo: {
        content
      }
    };

    postTodo(postData).then((res) => {
      successNotify(`新增成功，${res.content}`);

      document.getElementById('add-content').value = '';
      getTodo();
    });
  }

  function handleAdd(e) {
    e.preventDefault();

    const content = document.getElementById('add-content').value;

    if (!content) {
      return notify('請輸入代辦事項');
    }

    return addTodo(content);
  }

  function removeTodo(id) {
    deleteTodo(id).then((res) => {
      successNotify(res.message);
      getTodo();
    });
  }

  function handleRemove(id) {
    return (e) => {
      e.preventDefault();
      removeTodo(id);
    };
  }

  function handleToggle(id, isComplete) {
    return (e) => {
      e.preventDefault();
      postTodoToggle(id).then((res) => {
        if (isComplete) {
          successNotify(`已完成 ${res.content}`);
        } else {
          successNotify(`待完成 ${res.content}`);
        }

        getTodo();
      });
    };
  }

  function getCompleteCount() {
    return getFilterList(PageTypeEnum.Complete).length;
  }

  function deleteAllCompleteTodo() {
    return new Promise((resolve) => {
      const completeTodoList = getFilterList(PageTypeEnum.Complete);

      completeTodoList.forEach((todo) => {
        deleteTodo(todo.id);
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
      setTimeout(() => {
        successNotify('清除成功');
        getTodo();
      }, 1000);
    });
  }

  return (
    <div>
      <div id="todoListPage" className="bg-half">
        <nav>
          <h1><a href="#">ONLINE TODO LIST</a></h1>
          <ul>
            <li className="todo_sm"><a href="#"><span>王小明的代辦</span></a></li>
            <li><a href="#loginPage">登出</a></li>
          </ul>
        </nav>
        <div className="container todoListPage vhContainer">
          <div className="todoList_Content">
            <div className="inputBox">
              <input
                id="add-content"
                placeholder="請輸入待辦事項"
              />
              <a
                href="#"
                onClick={handleAdd}
              >
                <i className="fa fa-plus" />
              </a>
            </div>
            <div className="todoList_list">
              <ul className="todoList_tab">
                <li>
                  <a
                    href="#"
                    className={pageType === PageTypeEnum.All ? 'active' : ''}
                    onClick={changePageType(PageTypeEnum.All)}
                  >
                    全部
                  </a>

                </li>
                <li>
                  <a
                    href="#"
                    className={pageType === PageTypeEnum.NotComplete ? 'active' : ''}
                    onClick={changePageType(PageTypeEnum.NotComplete)}
                  >
                    待完成
                  </a>

                </li>
                <li>
                  <a
                    href="#"
                    className={pageType === PageTypeEnum.Complete ? 'active' : ''}
                    onClick={changePageType(PageTypeEnum.Complete)}
                  >
                    已完成
                  </a>

                </li>
              </ul>
              <div className="todoList_items">
                <ul className="todoList_item">
                  {beFilterTodoList.map((todo) => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
