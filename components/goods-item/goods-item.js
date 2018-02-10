const app = getApp()

// components/good-item/good-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    goodsInfo: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getTicket() {
      const self = this;
      app.globalData.showInfo = true;
      wx.request({
        url: "https://www.iamyangqi.cn/wx-new-mall/convertLink.php",
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          url: self.goodsInfo.item_url
        },
        success: function (resp) {
          if (resp.data.model) {
            wx.setClipboardData({
              data: resp.data.model,
            })
          }
        }
      });
    }
  },
  attached: function () {
    this.goodsInfo = this.dataset.goodsInfo;
    this.setData({
      goodsInfo: this.goodsInfo
    })
  } 
})
