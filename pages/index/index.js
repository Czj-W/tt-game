import networkApi from '../../utils/api';

const app = getApp()

Page({
  data: {
    classifyList: [],
    bannerList:[],
    titleList: [],
    list: [],
    page: 1,
  },
  onLoad: function () {
    this.getCategoryList()
    this.getRandomTestList()
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
        this.geList(v.id)
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
      console.log(res, '获取轮播图');
      this.setData({
        bannerList:res.data
      })
    }).catch(err => {
      console.log(err,'err')
    }).finally(() => {
		});
  },
  geList(id) {
		networkApi.quizzes_v1.list({page:1,category_id:id}).then((res) => {
      console.log(res, '列表');
      let list = this.data.list
      this.setData({
        list:[...list,res.data[0]]
      })
    }).catch(err => {
      console.log(err,'err')
    }).finally(() => {

		});
  },
  getRandomTestList() {
		networkApi.quizzes_v1.randsList({page:this.data.page}).then((res) => {
      let list = this.data.titleList
      if (res.data.length === 0&&this.data.page > 1) {
        this.setData({
          page:this.data.page-1
        })
        return false
      }
      if (this.data.page > 1){
        list = [...list,...res.data]
      } else {
        list = res.data
      }
      this.setData({
        titleList:list
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
  jumpTest(e) {
    let item = e.currentTarget.dataset.item
    if (item.action_type === 1) {
      tt.navigateTo({
        url: `${item.acction_path}?id=${item.action_resource_id}`
      });
    }
  },
  onReachBottom() {
    // 上拉加载下一页
		if (this.data.titleList.length > 0) {
      this.setData({
        page:this.data.page+1
      }, () => {
          this.getRandomTestList()
      })
		}
	},
})

