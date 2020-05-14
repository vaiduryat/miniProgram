import request from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, chooseAddress, openSetting,showModal,showToast } from '../../utils/wx_utils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    totlePrice:0,
    totleNum:0
  },

  onShow:function(){
    var address=wx.getStorageSync("address")
    var _address={
      userName:address.userName,
      telNumber:address.telNumber,
      detailAddress:address.provinceName+address.cityName+address.countyName+address.detailInfo
    }
    if(address.userName){
      this.setData({
        address:_address
      })
    }
    var cart=wx.getStorageSync("cart")
    cart=cart.filter(v=>v.isChecked)
    this.setCart(cart) 
  },
  setCart(cart){
    var totlePrice=0;
    var totleNum=0;
    cart.forEach(v => {
        totlePrice+=v.goods_price*v.num
        totleNum+=v.num
    })
    this.setData({
      cart:cart,
      totlePrice:totlePrice,
      totleNum:totleNum
    })   
  },

 async handleCreateOrder(){
    var token=wx.getStorageSync("token") 
    if(!token){
      wx.navigateTo({url: '/pages/auth/auth'})
    }
    var order_price=this.data.totlePrice
    var consignee_addr=this.data.address
    var goods=[]
    var cart=this.data.cart
    cart.forEach(v=>{
      goods.push({
        goods_id:v.goods_id,
        goods_number:v.num,
        goods_price:v.goods_price
      })
    })
    const res=await request({
      url:'/my/orders/create',
      data:{order_price:order_price,consignee_addr:consignee_addr,goods},
      method:'post'
    })
    var order_number=res.data.order_number
    const res1=await showModal("是否确认支付")
    if(res1.confirm){
      const res2=await request({
        url:'/my/orders/zhifu',
        data:{order_number},
        method:'post'
      })
      await showToast({title:res2.data.message,icon:'success'})
      var newCart=wx.getStorageSync("cart")
      newCart=newCart.filter(v=>!v.isChecked)
      wx.setStorageSync("cart", newCart)  
      wx.navigateTo({url: '/pages/order/order'})  
    }else{
      await showToast({title:"已取消支付"})
    }  
  }
})