/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchTodo,
  postTodo
} from '../apis/todo.api';
import { logout } from '../apis/user.api';
import { notify, successNotify } from '../makers/notify.maker';
import TodoList from '../components/TodoList';
import TodoEmpty from '../components/TodoEmpty';
import { PageTypeEnum } from '../const';

export default function Home(props) {
  const { useEffect, useState } = React;
  const { nickname } = props;
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const [beFilterTodoList, setBeFilterTodoList] = useState([]);
  const [pageType, setPageType] = useState(PageTypeEnum.All);

  function handleLogout(e) {
    e.preventDefault();

    logout().then(() => {
      navigate('/Login');
      localStorage.setItem('token', '');
    });
  }

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

  return (
    <div>
      <div id="todoListPage" className="bg-half">
        <nav>
          <h1><a href="#">ONLINE TODO LIST</a></h1>
          <ul>
            <li className="todo_sm"><a href="#"><span>{`${nickname} 的代辦`}</span></a></li>
            <li>
              <a
                href="#"
                onClick={handleLogout}
              >
                登出
              </a>

            </li>
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
            {
              todoList.length === 0
                ? <TodoEmpty />
                : (
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

                    <TodoList
                      getTodo={getTodo}
                      getFilterList={getFilterList}
                      pageType={pageType}
                      list={beFilterTodoList}
                    />
                  </div>
                )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
