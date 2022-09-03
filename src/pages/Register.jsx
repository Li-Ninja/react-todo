import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { postUser } from '../apis/user.api';
import { email, password, required } from '../makers/rule.maker';
import { successNotify } from '../makers/notify.maker';

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

  function goToLoginPage() {
    navigate('/Login');
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
            您的暱稱
          </div>
          <input
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
            {errors.password ? errors.password.message : ''}
          </span>
        </div>
        <div className="col-12">
          <div>
            再次輸入密碼
          </div>
          <input
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
        </div>
        <div className="col-12">
          <input
            type="submit"
            style={{ display: 'block' }}
            value="提交"
          />
        </div>
      </form>
      <div>
        <input
          type="submit"
          style={{ display: 'block' }}
          value="登入"
          onClick={() => goToLoginPage()}
        />
      </div>
    </div>
  );
}
