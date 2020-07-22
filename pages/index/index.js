const app = getApp()

Page({
  data: {
    classifyList: [
      { icon: 'https://img-gewu.jifenone.com/images/cart.png', name: '游戏' },
      { icon: 'https://img-gewu.jifenone.com/images/cart.png', name: '情感' },
      { icon: 'https://img-gewu.jifenone.com/images/cart.png', name: '性格' },
      { icon: 'https://img-gewu.jifenone.com/images/cart.png', name: '智商' },
      {icon:'https://img-gewu.jifenone.com/images/cart.png',name:'职场'},
    ],
    titleList: [
      { img: 'https://img-gewu.jifenone.com/images/bg-pro.png', title: '你的情商有多高', num: '22223',msg:'智能代理：意思就是说，中国的网站不走我们的代理，国外的网站走代理，' },
      { img: 'https://img-gewu.jifenone.com/images/bg-pro.png', title: '你的情商有多高', num: '22223',msg:'智能代理：意思就是说，中国的网站不走我们的代理，国外的网站走代理，' },
      { img: 'https://img-gewu.jifenone.com/images/bg-pro.png', title: '你的情商有多高', num: '22223', msg: '智能代理：意思就是说，中国的网站不走我们的代理，国外的网站走代理，' },

    ]
  },
  onLoad: function () {
    console.log('Welcome to Mini Code')
  },
})
