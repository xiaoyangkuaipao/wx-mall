const app = getApp()

// components/tickets-item/tickets-item.js
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
    ticketsInfo: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getTicket() {
      const self = this;
      app.globalData.showInfo = true;
      wx.request({
        url: app.globalData.env + "convertLink.php",
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          url: self.ticketsInfo.coupon_click_url,
          pic: self.ticketsInfo.pict_url,
          title: self.ticketsInfo.title,
        },
        success: function (resp) {
          if (resp.data.data.model) {
            wx.setClipboardData({
              data: resp.data.data.model,
            })
          }
        }
      });
    }
  },
  attached: function () {
    this.ticketsInfo = this.dataset.ticketsInfo;
    this.setData({
      ticketsInfo: this.ticketsInfo
    })
  } 
})
