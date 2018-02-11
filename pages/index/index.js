//index.js
//获取应用实例
const app = getApp();

const devUrl = "http://127.0.0.1/wx-mall/";
const onlineUrl = "https://www.iamyangqi.cn/wx-new-mall/";
const env = onlineUrl;

app.globalData = {
  showInfo: false,
  env: env
};

Page({
  data: {
    env: app.globalData.env,
    userInfo: {},
    hasUserInfo: false,
    circular: true,
    showInfo: app.globalData.showInfo,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    goodsInfo: [],
    ticketsInfo: [],
    ticketsPage: 1,
    detailInfo: [],
    showDetail: false,
    isLast: false,
    imgUrls: [
      'https://www.iamyangqi.cn/wx-new-mall/pics/slogan-2.jpg',
      'https://www.iamyangqi.cn/wx-new-mall/pics/slogan-1.jpg',
      'https://www.iamyangqi.cn/wx-new-mall/pics/slogan-3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    timer: {},
    category: [{
      icon: "icon-quanbu",
      text: "全部",
      active: "active",
      q: ""
    },
    // {
    //   icon: "icon-changxiaoremai",
    //   text: "畅销",
    //   q: "销量"
    // },
    {
      icon: "icon-lingshi",
      text: "零食",
      q: "零食"
    }, {
      icon: "icon-nvzhuang",
      text: "女装",
      q: "女装"
    }, {
      icon: "icon-nanzhuang",
      text: "男装",
      q: "男装"
    }, {
      icon: "icon-nvxie",
      text: "女鞋",
      q: "女鞋"
    }, {
      icon: "icon-nanxie",
      text: "男鞋",
      q: "男鞋"
    }, {
      icon: "icon-baobao",
      text: "箱包",
      q: "箱包"
    }, {
      icon: "icon-meizhuang",
      text: "美妆",
      q: "美妆"
    }, {
      icon: "icon-weibiaoti2fuzhi09",
      text: "电器",
      q: "电器"
    }]
  },
  //事件处理函数
  selectCategory: function(e) {
    const len = this.data.category.length;
    const index = e.target.dataset.index;
    this.data.ticketsPage = 1;
    this.data.ticketsInfo = [];
    this.setData({
      ticketsInfo: this.data.ticketsInfo
    })
    for(let i=0; i<len; i++){
      if (index === i) {
        this.data.category[i].active = "active";
      }else{
        this.data.category[i].active = "";
      }
    }
    this.getTicketsItem(e.target.dataset.content.q);
    this.setData({
      category: this.data.category
    })
  },
  closeShowDetail: function(e) {
    if (e.currentTarget.dataset.selector === e.target.dataset.selector) {
      this.setData({
        showDetail: false
      });
      clearTimeout(this.timer);
    }
  },
  showDetailFn: function(e) {
    const self = this;
    this.showDetail = true;
    this.detailInfo = e.target.dataset.ticketsInfo.small_images.string;
    this.setData({
      detailInfo: this.detailInfo,
      showDetail: this.showDetail
    });
    this.timer = setTimeout(function(){
      self.setData({
        showDetail: false
      })
      clearTimeout(self.timer);
    }, 5000)
  },
  getTicketsItem: function(q) {
    wx.showLoading({
      title: "淘货er中。。。"
    });
    const self = this;
    q = !q ? "" : q;
    wx.request({
      url: self.data.env + "getTickets.php",
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        q: q,
        page: self.data.ticketsPage
      },
      success: function (resp) {
        let appendTickets = resp.data.results.tbk_coupon;
        const len = appendTickets.length;
        if(len < 20) {
          self.data.isLast = true;
          slef.setData({
            isLast: true
          })
        }
        for (let i = 0; i < len; i++) {
          const discount = appendTickets[i].coupon_info.match(/\d+/g);
          const discountPrice = discount[1]? discount[1]:discount[0];
          appendTickets[i].discountPrice = discountPrice;
          appendTickets[i].discount = (Number(appendTickets[i].zk_final_price) - discountPrice).toFixed(2);
        }
        self.data.ticketsInfo = self.data.ticketsInfo.concat(appendTickets);
        self.setData({
          ticketsInfo: self.data.ticketsInfo
        });
        wx.hideLoading();
      }
    });
  },
  scrollLoad: function(e) {
    if (e.detail.scrollTop > 30 * 19 * this.data.ticketsPage / 100 * e.detail.scrollWidth) {
      this.data.ticketsPage +=1;
      this.setData({
        ticketsPage: this.data.ticketsPage
      })
      this.getTicketsItem();
    }
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: "淘货er"
    })

    this.getTicketsItem("");
    
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
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getTicket: function(e) {
    const self = this;
    this.setData({
      showInfo: app.globalData.showInfo,
    })
    const timer = setTimeout(function(){
      self.setData({
        showInfo: false,
      })
      clearTimeout(timer);
    }, 1000)
  }
})
