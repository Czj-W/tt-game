import networkApi from '../../utils/api';

const app = getApp()

Page({
  data: {
    detail: {},
    adView: "",
    isShowResult: false,
    result: '',
    testList:[]
  },
  onLoad: function (option) {
    let {id,score} =option
    this.getResult(id, score)
    this.getDetail(id)
    this.getRandomTestList()
    this.setAd()
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
  getResult(id,score) {
    networkApi.quizzes_v1.result({ id, score }).then((res) => {
      console.log(res, '获取结果');
      this.setData({
        result:res.data
      })
    }).catch(err => {
      console.log(err,'err')
    }).finally(() => {

		});
  },
  getRandomTestList() {
		networkApi.quizzes_v1.randsList({page:1}).then((res) => {
      console.log(res, '随机列表');
      this.setData({
        testList:res.data
      })
    }).catch(err => {
      console.log(err,'err')
    }).finally(() => {

		});
  },
  showAd() {
    let that = this
    let adView = this.data.adView
    adView.show().then(() => {
      console.log('显示成功');
    }).catch((res) => {
      console.log('失败',res);
    })
    adView.onClose((res) => {
      if (res.isEnded) {
        that.setData({
          isShowResult:true
        })
        console.log('给予奖励');
      } else {
        that.setData({
          isShowResult:false
        })
        console.log('不能奖励');
      }
    })

  },
  setAd() {
    const adView = tt.createRewardedVideoAd({ adUnitId: '19h7nf14kpcb13a714' })
    console.log(adView,456);
    adView.onLoad(() => {

      console.log('====加载视频成功=====')
      this.setData({
        adView,
      })
  });
  
  adView.onError((res) => {
  
      console.log('====加载视频失败=====', res);
  
  });
  }
})
