import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from '../../utils/wx_utils.js'
import request from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async handleGetUserInfo(e){
    console.log(e.detail)
    var {encryptedData,rawData,iv,signature}=e.detail
    var {code}=await login()
    var res=await request({
      url:"/users/wxlogin",
      method:'post',
      data:{
        encryptedData,
        rawData,
        iv,
        signature,
        code
      }
    })
    var token=res.data.message.token
    wx.setStorageSync("token", token)
    wx.navigateBack({
      delta: 1
    });   
  }
})