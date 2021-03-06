import networkApi from '../../utils/api';

const app = getApp()

Page({
  data: {
    detail:''
  },
  onLoad: function (option) {
    console.log(option, 'id')
    let id = option.id || ''
    this.getDetail(id)
  },
  getDetail(id) {
		networkApi.quizzes_v1.detail({id}).then((res) => {
      console.log(res, '获取题目详情');
      this.setData({
        detail:res.data
      })
    }).catch(err => {
      console.log(err,'err')
    }).finally(() => {

		});
  },
  setQues() {
    let quesList = JSON.stringify(this.data.detail.questions)
    tt.setStorageSync('quesList', quesList)
    tt.navigateTo({ url: '/pages/quizzes/game?id='+this.data.detail.id });
  },
})
