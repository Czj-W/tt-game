const app = getApp()

Page({
  data: {
    classifyList: [
      { name: '全部' },
      { name: '游戏' },
      { name: '情感' },
      { name: '性格' },
      { name: '智商' },
      { name: '职场' },
      { name: '星座' },
      { name: '影视' },
      { name: '娱乐' },
      { name: '其它' },
    ],
    active: 0,
    titleList: [
      { img: 'https://img-gewu.jifenone.com/images/bg-pro.png', title: '你的情商有多高', num: '22223',msg:'智能代理：意思就是说，中国的网站不走我们的代理，国外的网站走代理，' },
      { img: 'https://img-gewu.jifenone.com/images/bg-pro.png', title: '你的情商有多高', num: '22223',msg:'智能代理：意思就是说，中国的网站不走我们的代理，国外的网站走代理，' },
      { img: 'https://img-gewu.jifenone.com/images/bg-pro.png', title: '你的情商有多高', num: '22223', msg: '智能代理：意思就是说，中国的网站不走我们的代理，国外的网站走代理，' },
      { img: 'https://img-gewu.jifenone.com/images/bg-pro.png', title: '你的情商有多高', num: '22223',msg:'智能代理：意思就是说，中国的网站不走我们的代理，国外的网站走代理，' },
      { img: 'https://img-gewu.jifenone.com/images/bg-pro.png', title: '你的情商有多高', num: '22223',msg:'智能代理：意思就是说，中国的网站不走我们的代理，国外的网站走代理，' },
      { img: 'https://img-gewu.jifenone.com/images/bg-pro.png', title: '你的情商有多高', num: '22223', msg: '智能代理：意思就是说，中国的网站不走我们的代理，国外的网站走代理，' },
      { img: 'https://img-gewu.jifenone.com/images/bg-pro.png', title: '你的情商有多高', num: '22223',msg:'智能代理：意思就是说，中国的网站不走我们的代理，国外的网站走代理，' },
      { img: 'https://img-gewu.jifenone.com/images/bg-pro.png', title: '你的情商有多高', num: '22223',msg:'智能代理：意思就是说，中国的网站不走我们的代理，国外的网站走代理，' },
      { img: 'https://img-gewu.jifenone.com/images/bg-pro.png', title: '你的情商有多高', num: '22223', msg: '智能代理：意思就是说，中国的网站不走我们的代理，国外的网站走代理，' },
      { img: 'https://img-gewu.jifenone.com/images/bg-pro.png', title: '你的情商有多高', num: '22223',msg:'智能代理：意思就是说，中国的网站不走我们的代理，国外的网站走代理，' },
      { img: 'https://img-gewu.jifenone.com/images/bg-pro.png', title: '你的情商有多高', num: '22223',msg:'智能代理：意思就是说，中国的网站不走我们的代理，国外的网站走代理，' },
      { img: 'https://img-gewu.jifenone.com/images/bg-pro.png', title: '你的情商有多高', num: '22223',msg:'智能代理：意思就是说，中国的网站不走我们的代理，国外的网站走代理，' },
    ]
  },
  onLoad: function () {
    console.log('Welcome to Mini Code')
  },
  handleClassify(e) {
    this.setData({
      active:+e.currentTarget.dataset.index
    })
  },
})
