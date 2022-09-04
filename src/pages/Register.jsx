/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { postUser } from '../apis/user.api';
import { email, password, required } from '../makers/rule.maker';
import { successNotify } from '../makers/notify.maker';
import LoginImage from '../assets/images/login.png';
import TodoListImage from '../assets/images/online_todo_list.png';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  function submit() {
    const onValid = async (data) => {
      const postData = {
        user: {
          email: data.email,
          nickname: data.nickname,
          password: data.password
        }
      };

      postUser(postData).then((res) => successNotify(res.message));
    };
    const onInvalid = () => ({});

    return handleSubmit(onValid, onInvalid);
  }

  function goToLoginPage(e) {
    e.preventDefault();
    navigate('/Login');
  }

  return (
    <div id="signUpPage" className="bg-yellow">
      <div className="container signUpPage vhContainer">
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
              註冊帳號
            </h2>
            <label
              className="formControls_label"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="formControls_input"
              type="text"
              id="email"
              placeholder="請輸入 email"
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
              htmlFor="nickname"
            >
              您的暱稱
            </label>
            <input
              className="formControls_input"
              type="text"
              id="nickname"
              placeholder="請輸入您的暱稱"
              {...register(
                'nickname',
                {
                  ...required()
                }
              )}
            />
            <span style={{ color: 'red' }}>
              {errors.nickname ? errors.nickname.message : ''}
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
              id="password"
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
              {errors.password ? errors.password.message : ''}
            </span>
            <label
              className="formControls_label"
              htmlFor="passwordDoubleCheck"
            >
              再次輸入密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              id="passwordDoubleCheck"
              placeholder="請再次輸入密碼"
              {...register(
                'passwordDoubleCheck',
                {
                  ...required(),
                  ...password()
                  // TODO password double check
                }
              )}
            />
            <span style={{ color: 'red' }}>
              {errors.passwordDoubleCheck ? errors.passwordDoubleCheck.message : ''}
            </span>
            <input
              className="formControls_btnSubmit"
              type="submit"
              value="註冊帳號"
            />
            <a
              className="formControls_btnLink"
              href="#"
              onClick={goToLoginPage}
            >
              登入
            </a>
          </form>
        </div>
      </div>

    </div>
  );
}
