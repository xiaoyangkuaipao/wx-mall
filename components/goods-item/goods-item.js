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

  },
  attached: function () {
    this.goodsInfo = this.dataset.goodsInfo;
    this.setData({
      goodsInfo: this.goodsInfo
    })
  } 
})
