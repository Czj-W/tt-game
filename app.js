import util from 'utils/util';

App({
  onLaunch: function () {
    this.login()
  },
	login() {
		let that = this;
		util.exchangeCode().then((result) => {
			tt.setStorageSync('localCode', result);
			let code = result;

			// 登录，同步绑定情况
			let result_data = null;
			util.loginApi({
        code: code,
				redirect: false,
			}).then((result) => {
				result_data = result;
        if (result.data.result_code === 1403) {
          tt.setStorageSync('auth_token', '');
				}
				else if (result.data.result_code === 1001) {
					util.generateLoginCode().then((result) => {
						that.login();
					});
				}
      }).catch(err => {
        console.log(err,123);
      });
		});
  },
  globalData: {
    info:''
  }
})
