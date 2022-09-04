import React from 'react';

export default function Home() {
  const todoList = [
    {
      id: 0,
      content: '把冰箱發霉的檸檬拿去丟'
    },
    {
      id: 1,
      content: '打電話叫媽媽匯款給我'
    },
    {
      id: 2,
      content: '整理電腦資料夾'
    },
    {
      id: 3,
      content: '繳電費水費瓦斯費'
    },
    {
      id: 4,
      content: '約vicky禮拜三泡溫泉'
    },
    {
      id: 5,
      content: '約ada禮拜四吃晚餐'
    }
  ];
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
              <input type="text" placeholder="請輸入待辦事項" />
              <a href="#link">
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
                      <a href="#link">
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
