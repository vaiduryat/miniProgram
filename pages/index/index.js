//index.js
//获取应用实例
const app = getApp()
import request from '../../request/index.js'
//Page Object
Page({
  data: {
    swiperList: [],
    cateList:[],
    floorList:[]
  },
  //options(Object)
  onLoad: function (options) {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  },
  // 获取轮播图数据
  getSwiperList(){
    request({
      url: '/swipedata'
    }).then((result) => {
      this.setData({ 
        swiperList: result.data.message
      })
    });
  },
  // 获取分类导航数据
  getCateList(){
    request({
      url: '/cateitems'
    }).then((result) => {
      this.setData({ 
        cateList: result.data.message
      })
    });
  },
  getFloorList(){
    request({
      url: '/floordata'
    }).then((result) => {
      this.setData({ 
        floorList: result.data.message
      })
      console.log(this.data.floorList)
    })
  }
});

