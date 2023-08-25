const mobileRules = [
  { required: true, message: '请输入手机号' },
  { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, massage: '手机号格式不正确' }
]
const passwordRules = [
  { required: true, message: '请输入密码' },
  { pattern: /^\w{8,24}$/, massage: '密码需8-24个字符' }
]
export { mobileRules, passwordRules }
