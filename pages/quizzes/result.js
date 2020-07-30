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
  onShareAppMessage: function (shareOption) {
    console.log(shareOption, 123);
    if (shareOption.channel === 'video') {
      return {
        channel: 'video',
        title: '测试分享视频',
        desc: '测试描述',
        extra: {
          videoTopics: ['hello', 'hi'],
          withVideoId: true
        },
        success(res) {  /* res结构：{errMsg: string, videoId: string } */
            console.log(res.videoId)
        }
      }
    } else {
    return {
      title: '快来测试吧',
      // desc: '这是默认的转发文案，用户可以直接发送，也可以在发布器内修改',
      path: '/pages/index/index', // ?后面的参数会在转发页面打开时传入onLoad方法
      // imageUrl: 'https://e.com/e.png', // 支持本地或远程图片，默认是小程序 icon
      // templateId: '这是开发者后台设置的分享素材模板id',
      success () {
        console.log('转发发布器已调起，并不意味着用户转发成功，微头条不提供这个时机的回调');
      },
      fail () {
        console.log('转发发布器调起失败');
      }
    } 
    }
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
