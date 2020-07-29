import networkApi from '../../utils/api';

const app = getApp()

Page({
  data: {
    classifyList: [],
    active: 0,
    titleList: [],
    type: 1,
    page: 1,
    scrollIntoView:'',
    id:''
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
          this.getRandomTestList(this.data.page,classifyList[0].id)  
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
  getRandomTestList(page,id,scrollIntoView='') {
    networkApi.quizzes_v1.list({ page, category_id: id, sort_type: this.data.type === 0 ? 'new' : 'hot' }).then((res) => {
      console.log(res.data,'分类列表');
      let list = this.data.titleList
      if (page > 1 && res.data.length > 0) {
        list = [...list, ...res.data]
        this.setData({
          page,
        })
      } else {
        this.setData({
          page:1
        })
        list = res.data
      }
      this.setData({
        titleList: list,
        id,
      }, () => {
          this.setData({
            scrollIntoView
          })
      })
    }).catch(err => {
      console.log(err,'err')
    }).finally(() => {

		});
  },
  next() {
    this.getRandomTestList(this.data.page+1,this.data.id)
  },
  handleType(e) {
    this.setData({
      type:+e.currentTarget.dataset.index
    })
    this.getRandomTestList(1,this.data.id)
  },
  handleClassify(e) {
    let item = e.currentTarget.dataset.item
    this.getRandomTestList(1,item.id,'id0')
    this.setData({
      active:+e.currentTarget.dataset.index
    })
  },
})
