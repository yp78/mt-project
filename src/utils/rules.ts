const mobileRules = [
  { required: true, message: '请输入手机号' },
  { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机号格式不正确' }
]
const passwordRules = [
  { required: true, message: '请输入密码' },
  { pattern: /^\w{8,24}$/, message: '密码需8-24个字符' }
]
const codeRules = [
  { required: true, message: '请输入验证码' },
  { pattern: /^\d{6}$/, message: '验证码错误' }
]
export { mobileRules, passwordRules, codeRules }
