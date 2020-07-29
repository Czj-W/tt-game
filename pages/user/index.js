import util from '../../utils/util';
import networkApi from '../../utils/api';

const app = getApp()

Page({
  data: {
    userInfo: '',
    historyList:[]
  },
  onLoad: function () {
  },
  onShow: function () {
    let auth_token = tt.getStorageSync("auth_token");
    let userInfo = tt.getStorageSync("userInfo")
    if (!auth_token || auth_token === '' || auth_token === undefined) {
      this.handleShowModal()
    } else {
      userInfo = JSON.parse(userInfo)
      this.getHistory()
      this.setData({
        userInfo,
      })
    }
  },
  handleShowModal() {
    let that = this
    tt.showModal({
      title: "提示",
      content: "获得你的登录授权能够更好的为你提供服务",
      success(res) {
        if (res.confirm) {
          tt.getUserInfo({
            withCredentials: true,
            success(res) {
              let localCode = tt.getStorageSync("localCode");
              let option = {
                code: localCode,
                encryptedData: res.encryptedData,
                iv: res.iv
              }
              that.setUserInfo(option)
            },
            fail(res) {
              console.log(`getUserInfo 调用失败`);
            },
          });
        }
      },
      fail(res) {
        console.log(`showModal调用失败`);
      },
    });

  },
  setUserInfo(option) {
    networkApi.user_v1.info(option).then((result) => {
      console.log(result, 456);
      tt.setStorageSync('auth_token', result.data.auth_token);
      let userInfo = JSON.stringify(result.data)
      tt.setStorageSync('userInfo', userInfo);
      this.setData({ userInfo: result.data }, () => {
        this.getHistory()
      })
    }).catch((error) => {
      console.log(error);
    });
  },
  getHistory() {
    networkApi.quizzes_v1.history().then((res) => {
      this.setData({
        historyList:res.data
      })
      console.log(res, 456);
    }).catch((error) => {
      console.log(error);
    });
  },
  getPhoneNumberHandler(e) {
    console.log(e, 123);
  },
})
