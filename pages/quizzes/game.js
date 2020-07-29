const app = getApp()

Page({
  data: {
    activeID: '',
    quesList: [],
    num: 0,
    score: 0,
    letter: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    id: ''
  },
  onLoad: function (option) {
    let id = option.id || ''
    this.setData({
      id
    })
  },
  onShow: function () {
    let quesList = tt.getStorageSync("quesList") || [];
    if (quesList.length > 0) {
      quesList = JSON.parse(quesList)
    }
    this.setData({
      quesList
    })
    console.log(quesList, 123);
  },
  check(e) {
    let item = e.currentTarget.dataset.item
    let { score, num, quesList } = this.data
    let that = this
    this.setData({
      activeID: e.currentTarget.dataset.item.id
    }, () => {
      let scores = score + Number(item.store)
      if (quesList[num].question_type === 2) {
        if (quesList.length === num + 1) {
          tt.navigateTo({
            url: `/pages/quizzes/result?id=${this.data.id}&score=${scores}` // 指定页面的url
          });
          return false
        }
        setTimeout(() => {
          that.setData({
            num: num + 1,
            score: scores
          })
        }, 300)
      } else {
        let nums = Number(item.next) - 1
        if (nums < 0) {
          tt.navigateTo({
            url: `/pages/quizzes/result?id=${this.data.id}&score=${nums}` // 指定页面的url
          });
          return false
        }
        setTimeout(() => {
          that.setData({
            num: nums,
            score: scores
          })
        }, 300)
      }
    })
  }
})
