import { AuthTokenError, ServerError, LogicError } from './error.js';
import promisify from './promisify.js';

function checkStatus(response, options) {

  let statusCode = response.statusCode;
  let error = null;
  let _p = null;
  if (statusCode >= 200 && statusCode < 300) {
    if (options.header['content-type'].indexOf('text/html') >= 0) {
      _p = Promise.resolve(response.data);
    }
    else {
      response.data = response.data || {};
      let code = response.data.result_code
      if (response.data.meta) {
        code = response.data.meta.code
      }
      switch (code) {
        case 0:
          // 请求成功，返回一个Promise对象
          _p = Promise.resolve(response.data);
          break;
        case 1403:
          // 处理token过期的情况
          console.error('auth_token无效');
          error = new AuthTokenError(response.data);
          _p = Promise.reject(error);
          break;
        case 1001:
          error = new LogicError(response.data);
          _p = Promise.reject(error);
          break;
        default:
          error = new LogicError(response.data);
          _p = Promise.reject(error);
          tt.showToast({
            icon: 'none',
            title: response.data.result,
            duration: 2000,
          });
          break;
      }
    }
  }
  else {
    tt.showToast({
      icon: 'none',
      title: '服务器异常',
      duration: 3000,
    });
    error = new ServerError({ result: '服务器异常' });
    _p = Promise.reject(error);
  }
  return _p;
}
const miniapp = {
  request: (options) => {
    return tt.request(options);
  }
}
miniapp.pro = {};
for (let key in miniapp) {
  if (miniapp.hasOwnProperty(key) && typeof miniapp[key] === 'function') {
    miniapp.pro[key] = promisify(miniapp[key]);
  }
}

export default {
  requestPromise: (options) => {
    options.data = options.data || {};
    if (options.data.redirect === false) {
      // 不跳转
    }
    else {
      options.data.redirect = true;
    }
    options.header = {
      'client-info': 'miniapp/7.3.0',
      'content-type': 'application/json',
    };
    return miniapp.pro.request(options).then((response) => {
      return checkStatus(response, options);
    }).catch((e) => {
      console.error(e);
      return Promise.reject(e);
    });
  },
};
