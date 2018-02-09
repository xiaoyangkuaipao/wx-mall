//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    goodsInfo: [],
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    category: [{
      icon: "icon-quanbu",
      text: "全部",
      active: "active"
    },{
      icon: "icon-changxiaoremai",
      text: "畅销",
    },{
      icon: "icon-lingshi",
      text: "零食",
    }, {
      icon: "icon-nvzhuang",
      text: "女装",
    }, {
      icon: "icon-nanzhuang",
      text: "男装",
    }, {
      icon: "icon-nvxie",
      text: "女鞋",
    }, {
      icon: "icon-nanxie",
      text: "男鞋",
    }, {
      icon: "icon-baobao",
      text: "箱包",
    }, {
      icon: "icon-meizhuang",
      text: "美妆",
    }, {
      icon: "icon-weibiaoti2fuzhi09",
      text: "电器",
    }]
  },
  //事件处理函数
  selectCategory: function(e) {
    const len = this.data.category.length;
    const index = e.target.dataset.index;
    for(let i=0; i<len; i++){
      if (index === i) {
        this.data.category[i].active = "active";
      }else{
        this.data.category[i].active = "";
      }
    }
    this.setData({
      category: this.data.category
    })
  },
  getGoodsItem: function() {
    const self = this;
    wx.request({
      url: "https://www.iamyangqi.cn/wx-new-mall/fileTest.php",
      success: function (resp) {
        self.goodsInfo = resp.data.results.n_tbk_item;
        self.setData({
          goodsInfo: self.goodsInfo
        })
      }
    });
  },
  onLoad: function () {
    this.getGoodsItem();

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
