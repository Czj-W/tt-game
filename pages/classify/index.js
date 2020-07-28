import networkApi from '../../utils/api';

const app = getApp()

Page({
  data: {
    classifyList: [],
    active: 0,
    titleList: [],
    type:1
  },
  onLoad: function () {

  },
  onShow() {
    let categoryID = tt.getStorageSync("categoryID") || '';
    if(categoryID!=='') categoryID = JSON.parse(categoryID)
    this.getCategoryList(categoryID)    
  },
  onHide: function () {
    tt.setStorageSync('categoryID', '')
  },
  getCategoryList(categoryID) {
		networkApi.category_v1.list().then((res) => {
      console.log(res, '获取分类');
      let classifyList = res.data
      if (classifyList.length > 0) {
        if (categoryID !== '') {
          classifyList.forEach((v,i) => {
            if (v.id === categoryID) {
              this.getRandomTestList(1, v.id) 
              this.setData({
                active:i
              })
            }
          });
        } else {
          this.getRandomTestList(1,classifyList[0].id)  
        }
      }
      this.setData({
        classifyList
      })
    }).catch(err => {
      console.log(err,'err')
    }).finally(() => {

		});
  },
  getRandomTestList(page,id) {
		networkApi.quizzes_v1.randsList({page,id}).then((res) => {
      console.log(res, '随机列表');
      this.setData({
        titleList:res.data
      })
    }).catch(err => {
      console.log(err,'err')
    }).finally(() => {

		});
  },
  handleType(e) {
    this.setData({
      type:+e.currentTarget.dataset.index
    })
  },
  handleClassify(e) {
    let item = e.currentTarget.dataset.item
    this.getRandomTestList(1,item.id)
    this.setData({
      active:+e.currentTarget.dataset.index
    })
  },
})
