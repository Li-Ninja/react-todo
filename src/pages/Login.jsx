/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { postSignIn } from '../apis/user.api';
import { email, password, required } from '../makers/rule.maker';
import { successNotify } from '../makers/notify.maker';
import LoginImage from '../assets/images/login.png';
import TodoListImage from '../assets/images/online_todo_list.png';

export default function Login(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setNickname } = props;
  const navigate = useNavigate();

  function submit() {
    const onValid = async (data) => {
      const postData = {
        user: data
      };

      postSignIn(postData).then((res) => {
        localStorage.setItem('token', res.headers.authorization);
        setNickname(res.data.nickname);
        successNotify(res.data.message);
        navigate('/');
      });
    };
    const onInvalid = () => ({});

    return handleSubmit(onValid, onInvalid);
  }

  function goToRegisterPage(e) {
    e.preventDefault();
    navigate('/Register');
  }
  return (
    <div id="loginPage" className="bg-yellow">
      <div className="container loginPage vhContainer ">
        <div className="side">
          <a><img className="logoImg" src={TodoListImage} alt="" /></a>
          <img className="d-m-n" src={LoginImage} alt="workImg" />
        </div>
        <div>
          <form
            className="formControls"
            onSubmit={submit()}
          >
            <h2 className="formControls_txt">
              最實用的線上代辦事項服務
            </h2>
            <label
              className="formControls_label"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="formControls_input"
              id="email"
              placeholder="請輸入 Email"
              {...register('email', {
                ...required(),
                ...email()
              })}
            />
            <span style={{ color: 'red' }}>
              {errors.email ? errors.email.message : ''}
            </span>
            <label
              className="formControls_label"
              htmlFor="password"
            >
              密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              placeholder="請輸入密碼"
              {...register(
                'password',
                {
                  ...required(),
                  ...password()
                }
              )}
            />
            <span style={{ color: 'red' }}>
              {errors.passwordDoubleCheck ? errors.passwordDoubleCheck.message : ''}
            </span>
            <input
              className="formControls_btnSubmit"
              type="submit"
              value="登入"
            />
            <a
              className="formControls_btnLink"
              href="#"
              onClick={goToRegisterPage}
            >
              註冊帳號
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
