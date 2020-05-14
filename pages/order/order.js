import request from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/wx_utils.js'
import {formatTime} from '../../utils/util.js'
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
    orders: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    this.getOrders()
  },
  // 获取订单
  async getOrders() {
    var token = wx.getStorageSync("token")
    await showToast({ title: "请先登录" })
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/auth'
      })

    }

    let Pages = getCurrentPages()
    var { type } = Pages[Pages.length - 1].options
    this.changeTitleByIndex(type)
    const res = await request({
      url: '/my/orders/all',
      data: {
        type: type
      }
    })
    var { orders } = res.data
    orders.forEach(v=>{
      v.create_time=formatTime(new Date(v.create_time))
      v.update_time=formatTime(new Date(v.update_time))
    })
    this.setData({
      orders: orders
    })




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
  },
  async handleTitleTap(event) {
    var { index } = event.detail
    this.changeTitleByIndex(index)
    const res = await request({
      url: '/my/orders/all',
      data: {
        type: index
      }
    })
    var { orders } = res.data
    orders.forEach(v=>{
      v.create_time=formatTime(new Date(v.create_time))
      v.update_time=formatTime(new Date(v.update_time))
    })
    this.setData({
      orders: orders
    })
  }



})