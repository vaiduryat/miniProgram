// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }

    ],
    collect:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var collect=wx.getStorageSync("collections")||[]
    this.setData({
      collect
    })
      
  },
  async handleTitleTap(event) {
    var { index } = event.detail
    this.changeTitleByIndex(index)
  },
  changeTitleByIndex(index) {
    this.data.tabs.forEach((v, i) => {
      if (v.id == index) {
        v.isActive = true
      } else {
        v.isActive = false
      }
    })
    var _tabs = this.data.tabs
    this.setData({
      tabs: _tabs
    })
  }

  
})