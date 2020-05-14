// pages/category/category.js
import request from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _cates = wx.getStorageSync("cates");
    if (!_cates) {
      this.getCates()
    } else {
      if ((Date.now() - _cates.time) > 1000 * 60 * 5) {
        this.getCates()
      }
      else {
        this.setData({
          cateList: _cates.cates.data
        })
        this.getCateContent()
      }
    }
    // this.getCates()
  },

  async getCates() {
    const result = await request({ url: '/categories' })
    this.setData({
      cateList: result.data
    })
    this.getCateContent()
    var catesValue = { time: Date.now(), cates: result }
    wx.setStorageSync("cates", catesValue);
    // }).then((result) => {
    //   this.setData({
    //     cateList: result.data
    //   })
    //   this.getCateContent()
    //   var catesValue = { time: Date.now(), cates: result }
    //   wx.setStorageSync("cates", catesValue);

    // })
  },
  getCateContent() {
    var index = this.data.currentIndex
    var content = this.data.cateList[index].children
    this.setData({
      rightContent: content
    })
  },
  handleLftMenuTap(event) {
    var index = event.currentTarget.dataset.index
    this.setData({
      currentIndex: index,
      scrollTop: 0
    })
    this.getCateContent()
  }
})