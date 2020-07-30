import handler from '../handler.js';

const { API_PREFIX } = require('./config.js');

let user_v1 = {
  base_uri: `${API_PREFIX}/v1/dy_sessions`,
  code(data) { //获取code
    return handler.requestPromise({
      url: `${this.base_uri}/code`,
      method: 'POST',
      data: data,
    });
  },
  login(data) { //登录
    return handler.requestPromise({
      url: `${this.base_uri}/login`,
      method: 'POST',
      data: data,
    });
  },
  info(data) { //获取用户信息
    return handler.requestPromise({
      url: `${this.base_uri}`,
      method: 'POST',
      data: data,
    });
  },
}
let feedback_v1 = {
  base_uri: `${API_PREFIX}/v1/feedbacks
  `,
  feedback(data) { 
    return handler.requestPromise({
      url: `${this.base_uri}`,
      method: 'POST',
      data: data,
    });
  },
}

module.exports = {
  user_v1: user_v1,
  feedback_v1:feedback_v1
};