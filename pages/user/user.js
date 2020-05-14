// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    collectNum:0
  },
  onShow: function () {
    var collections=wx.getStorageSync("collections")||[]
    var collectNum=collections.length
    this.setData({
      userInfo:wx.getStorageSync("userInfo"),
      collectNum
    })
         
  }
  
  
})