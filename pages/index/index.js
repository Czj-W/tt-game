import networkApi from '../../utils/api';

const app = getApp()

Page({
  data: {
    classifyList: [],
    titleList: [
      { img: 'https://img-gewu.jifenone.com/images/bg-pro.png', title: '你的情商有多高', num: '22223',msg:'智能代理：意思就是说，中国的网站不走我们的代理，国外的网站走代理，' },
      { img: 'https://img-gewu.jifenone.com/images/bg-pro.png', title: '你的情商有多高', num: '22223',msg:'智能代理：意思就是说，中国的网站不走我们的代理，国外的网站走代理，' },
      { img: 'https://img-gewu.jifenone.com/images/bg-pro.png', title: '你的情商有多高', num: '22223', msg: '智能代理：意思就是说，中国的网站不走我们的代理，国外的网站走代理，' },

    ],
    list1: [],
    list2:[]
  },
  onLoad: function () {
    this.getCategoryList()
    this.getBanners()
  },
  getCategoryList() {
		networkApi.category_v1.list().then((res) => {
      console.log(res, '获取分类');
      let classifyList = res.data
      classifyList.forEach((v, i) => {
        this.getRandomTestList(1,v.id)
      })
      this.setData({
        classifyList
      })
    }).catch(err => {
      console.log(err,'err')
    }).finally(() => {

		});
  },
  getBanners() {
		networkApi.banners_v1.list().then((res) => {
      console.log(res,'获取轮播图');
    }).catch(err => {
      console.log(err,'err')
    }).finally(() => {
		});
  },
  getRandomTestList(page,id) {
		networkApi.quizzes_v1.randsList({page,id}).then((res) => {
      console.log(res, '随机列表');
      let {list1,list2} = this.data
      if (id%2===0) {
        list1 = [...list1,...res.data]
      } else {
        list2 = [...list2,...res.data]
      }
      this.setData({
        list1,
        list2
      })
    }).catch(err => {
      console.log(err,'err')
    }).finally(() => {

		});
  }
})
