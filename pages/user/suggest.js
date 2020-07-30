
import networkApi from '../../utils/api';

const app = getApp()

Page({
  data: {
    num: 0,
    content:''
  },
  onLoad: function () {
  },
  bindComtent: function (e) {
    let value = e.detail.value
    this.setData({
      num: value.length,
    });
  },
  formSubmit(e) {
    console.log(e);
    let content = e.detail.value.content
    if (content === '') {
      tt.showToast({
        title: "请填写意见",
        icon:"fail",
        duration: 2000,
        success(res) {
          console.log(`${res}`);
        },
        fail(res) {
          console.log(`showToast调用失败`);
        },
      });
      return false
    }
    this.setFeedback(content)
  },
  setFeedback(content) {
    networkApi.feedback_v1.feedback({content}).then((res) => {
      console.log(res, '发送意见');
      tt.showModal({
        content: '提交成功',
        showCancel: false,
        confirmText: '好的',
        success: function(result) {
          if (result.confirm) {
            tt.navigateBack();
          }
        }
      })
    }).catch(err => {
      console.log(err,'err')
    }).finally(() => {
		});
  },
})
