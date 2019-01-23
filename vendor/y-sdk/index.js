
/**
 * Author：yangjianmin
 *参考自腾讯云小程序demo
 */
var constants = require('./lib/constants');
var login = require('./lib/login');
var Session = require('./lib/session');
var request = require('./lib/request');
var upfile = require('./lib/upimg');
var exports = module.exports = {
  login: login.login,
  setLoginUrl: login.setLoginUrl,
  setUserInfoUrl: login.setUserInfoUrl,
  LoginError: login.LoginError,
  requestLogin: login.requestLogin,
  session: Session,
  upimg: upfile,
  clearSession: Session.clear,

  request: request.request,
  // RequestError: request.RequestError,
};

// 导出错误类型码
// Object.keys(constants).forEach(function (key) {
//   if (key.indexOf('ERR_') === 0) {
//     exports[key] = constants[key];
//   }
// });