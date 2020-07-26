import handler from '../handler.js';

const { API_PREFIX } = require('./config.js');

let banners_v1 = {
  base_uri: `${API_PREFIX}/v1/banners`,
  list(data) {
    return handler.requestPromise({
      url: `${this.base_uri}`,
      method: 'GET',
      data: data,
    });
  },
}
let category_v1 = {
  base_uri: `${API_PREFIX}/v1/category`,
  list(data) {
    return handler.requestPromise({
      url: `${this.base_uri}`,
      method: 'GET',
      data: data,
    });
  },
}

module.exports = {
  banners_v1:banners_v1,
  category_v1:category_v1
};