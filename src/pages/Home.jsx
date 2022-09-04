/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { deleteTodo, fetchTodo, postTodo } from '../apis/todo.api';
import { notify, successNotify } from '../makers/notify.maker';

export default function Home() {
  const { useEffect, useState } = React;
  const [todoList, setTodoList] = useState([]);

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

  return (
    <div>
      <div id="todoListPage" className="bg-half">
        <nav>
          <h1><a href="#link">ONLINE TODO LIST</a></h1>
          <ul>
            <li className="todo_sm"><a href="#link"><span>王小明的代辦</span></a></li>
            <li><a href="#loginPage">登出</a></li>
          </ul>
        </nav>
        <div className="conatiner todoListPage vhContainer">
          <div className="todoList_Content">
            <div className="inputBox">
              <input
                id="add-content"
                placeholder="請輸入待辦事項"
              />
              <a
                href="#link"
                onClick={handleAdd}
              >
                <i className="fa fa-plus" />
              </a>
            </div>
            <div className="todoList_list">
              <ul className="todoList_tab">
                <li><a href="#link" className="active">全部</a></li>
                <li><a href="#link">待完成</a></li>
                <li><a href="#link">已完成</a></li>
              </ul>
              <div className="todoList_items">
                <ul className="todoList_item">
                  {todoList.map((todo) => (
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
                        />
                        <span>{todo.content}</span>
                      </label>
                      <a
                        href="#link"
                        onClick={handleRemove(todo.id)}
                      >
                        <i className="fa fa-times" />
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="todoList_statistics">
                  <p> 5 個已完成項目</p>
                  <a href="#link">清除已完成項目</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
