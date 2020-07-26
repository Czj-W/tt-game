import networkApi from '../../utils/api';

const app = getApp()

Page({
  data: {

  },
  onLoad: function (option) {
    console.log(option, 'id')
    let id = option.id||''
    this.getDetail(id)
  },
  getDetail(id) {
		networkApi.quizzes_v1.detail({id}).then((res) => {
      console.log(res, '获取题目详情');
    }).catch(err => {
      console.log(err,'err')
    }).finally(() => {

		});
  }
})
