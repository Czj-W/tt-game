import handler from '../handler.js';

const { API_PREFIX } = require('./config.js');

let meshes_v1 = {
  base_uri: `${API_PREFIX}/v1/meshes`,
  list(data) {
    return handler.requestPromise({
      url: `${this.base_uri}`,
      method: 'GET',
      data: data,
    });
  },
}

module.exports = {
	meshes_v1,
};