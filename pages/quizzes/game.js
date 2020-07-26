const app = getApp()

Page({
  data: {
    activeID:''
  },
  onLoad: function () {
    console.log('Welcome to Mini Code')
  },
  check(e) {
    this.setData({
      activeID:e.currentTarget.dataset.index
    })
  }
})
