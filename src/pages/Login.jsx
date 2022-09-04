import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { postSignIn } from '../apis/user.api';
import { email, password, required } from '../makers/rule.maker';
import { successNotify } from '../makers/notify.maker';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  function submit() {
    const onValid = async (data) => {
      const postData = {
        user: data
      };

      postSignIn(postData).then((res) => {
        localStorage.setItem('token', res.headers.authorization);

        successNotify(res.data.message);
        navigate('/');
      });
    };
    const onInvalid = () => ({});

    return handleSubmit(onValid, onInvalid);
  }

  function goToRegisterPage() {
    navigate('/Register');
  }
  return (
    <div>
      <form onSubmit={submit()}>
        <div className="col-12">
          <div>
            Email
          </div>
          <input
            placeholder="請輸入 Email"
            {...register('email', {
              ...required(),
              ...email()
            })}
          />
          <span style={{ color: 'red' }}>
            {errors.email ? errors.email.message : ''}
          </span>
        </div>
        <div className="col-12">
          <div>
            密碼
          </div>
          <input
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
        </div>
        <div className="col-12">
          <input
            type="submit"
            style={{ display: 'block' }}
            value="登入"
          />
        </div>
      </form>
      <div>
        <input
          type="submit"
          style={{ display: 'block' }}
          value="註冊帳號"
          onClick={() => goToRegisterPage()}
        />
      </div>
    </div>
  );
}
