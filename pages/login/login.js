import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, chooseAddress, openSetting,showModal,showToast } from '../../utils/wx_utils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async handleGetUserInfo(e){
    var {userInfo}=e.detail
    wx.setStorageSync("userInfo", userInfo);
    await showToast({title:"登录成功",icon:"success"})
    wx.navigateBack({
      delta: 1
    });
        
  }
})