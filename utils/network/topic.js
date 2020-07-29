import handler from '../handler.js';

const { API_PREFIX } = require('./config.js');

let quizzes_v1 = {
  base_uri: `${API_PREFIX}/v1/quizzes`,
  list(data) {//测试题目列表
    return handler.requestPromise({
      url: `${this.base_uri}`,
      method: 'GET',
      data: data,
    });
  },
  randsList(data) {//随机测试题目列表
    return handler.requestPromise({
      url: `${this.base_uri}/rands`,
      method: 'GET',
      data: data,
    });
  },
  detail(data) {//测试题目详情接口
    return handler.requestPromise({
      url: `${this.base_uri}/${data.id}`,
      method: 'GET',
      data: data,
    });
  },
  result(data) {//测试结果
    return handler.requestPromise({
      url: `${this.base_uri}/${data.id}/result`,
      method: 'POST',
      data: data,
    });
  },
  history(data) {//查看历史结果
    return handler.requestPromise({
      url: `${this.base_uri}/history`,
      method: 'GET',
      data: data,
    });
  },
}

module.exports = {
	quizzes_v1,
};