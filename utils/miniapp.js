import promisify from './promisify.js';

const miniapp = {
	checkSession: (options) => {
			return tt.checkSession(options);
  },
	login: (options) => {
			return tt.login(options);
	},
}
miniapp.pro = {};
for (let key in miniapp) {
	if (miniapp.hasOwnProperty(key) && typeof miniapp[key] === 'function') {
		miniapp.pro[key] = promisify(miniapp[key]);
	}
}
export {
  miniapp as default,
};