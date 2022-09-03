/** Required */
export const required = () => ({
  required: {
    value: true,
    message: '此欄位必填'
  }
});

/** Email */
export const email = () => ({
  pattern: {
    // eslint-disable-next-line no-useless-escape
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    message: '不符合 Email 規則'
  }
});

/** Password */
export const password = () => ({
  pattern: {
    value: /^.{6,}$/g,
    message: '密碼字數太少，至少需要 6 個字'
  }
});
