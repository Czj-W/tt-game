import networkApi from '../../utils/api';

const app = getApp()

Page({
  data: {
    classifyList: [],
    titleList: [],
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
      let base_url = 'https://img-gewu.jifenone.com/images/'
      classifyList.forEach((v, i) => {
        if (v.name === '游戏') {
          v.url = base_url+'adx-game.png'
        }
        if (v.name === '情感') {
          v.url = base_url+'adx-qinggan.png'
        }
        if (v.name === '性格') {
          v.url = base_url+'adx-xingge.png'
        }
        if (v.name === '智商') {
          v.url = base_url+'adx-iq.png'
        }
        if (v.name === '职场') {
          v.url = base_url+'adx-work.png'
        }
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
  },
  jumpCategory(e) {
    let id = e.currentTarget.dataset.item.id
    id = JSON.stringify(id)
    tt.setStorageSync('categoryID', id)
    tt.switchTab({ url: '/pages/classify/index' });
  },
})
