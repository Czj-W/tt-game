import miniapp from './miniapp';
import networkApi from './api';
import handler from './handler.js';
const { API_PREFIX } = require('./network/config.js')

function exchangeCode(option) {
  let localCode = tt.getStorageSync('localCode');
  let promise = new Promise((resolve, reject) => {
    miniapp.pro.checkSession().then((result) => {
      if (localCode && localCode !== '' && localCode !== undefined) {
        resolve(localCode)
      } else {
        generateLoginCode().then((result) => {
          resolve(result);
        })
      }
    }).catch((error) => {
      console.log(error)
      generateLoginCode().then((result) => {
        console.log(result, 'result');
        resolve(result);
      })
    })
  })
  return promise;
}

function generateLoginCode() {
  let promise = new Promise((resolve, reject) => {
    miniapp.pro.login().then((result) => {
      networkApi.user_v1.code({
        code: result.code
      }).then(function (res) {
        console.log(res,123);
        if (res.result_code === 0) {
          resolve(result.code);
          tt.setStorageSync('localCode', result.code);
        }
      }).catch(function (err) {
        console.error(err, '更新code失败')
        // generateLoginCode()
      })
    });
  })
  return promise
}
function setUserInfo(option) {
  let that = this
  return new Promise(function (resolve, reject) {
    networkApi.user_v1.info(option).then((result) => {
      let info = JSON.stringify(result.data)
      tt.setStorageSync('userInfo', info);
      resolve(result.data);
    }).catch((error) => {
      console.error(error);
    });
  });
}
function loginApi(option) {
  let login_result = null;
  return handler.requestPromise({
    url: `${API_PREFIX}/v1/dy_sessions/login`,
    method: 'POST',
    data: {
      ...option
    },
  }).then((result) => {
    // 储存 auth_token
    tt.setStorageSync('auth_token', result.data.auth_token);
    let userInfo = JSON.stringify(result.data)
    tt.setStorageSync('userInfo',userInfo);
    login_result = result;
    return Promise.resolve(result);
  }).then((result) => {
    // 登录成功, 获取会员基本信息
    // return setUserInfo();
  }).then(() => {
    return Promise.resolve(login_result);
  }).catch((e) => {
    return Promise.resolve(e);
  });
}

export default {
  exchangeCode,
  generateLoginCode,
  loginApi
}