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
    checkedAll:false,
    totlePrice:0,
    totleNum:0
  },

  onShow:function(){
    var address=wx.getStorageSync("address")
    if(address.userName){
      this.setData({
        address:address
      })
    }
    var cart=wx.getStorageSync("cart")||[]
    this.setCart(cart) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 获取用户的收货地址
  async handleAddAddress() {

    // wx.getSetting({
    //   success: (result) => {
    //     const scopeAddress = result.authSetting["scope.address"]
    //     if (scopeAddress === true || scopeAddress === undefined) {
    //       wx.chooseAddress({
    //         success: (result1) => {
    //           console.log(result1)
    //         }
    //       })

    //     } else {
    //       wx.openSetting({
    //         success: (result3) => {
    //          wx.chooseAddress({
    //            success: (result) => {
    //              console.log(result)
    //            }
    //          });

    //         }, 
    //       });

    //     }
    //   }
    // });

    try {
      const res1 = await getSetting()
      const scopeAddress = res1.authSetting["scope.address"]
      if (scopeAddress === false) {
        const res2 = await openSetting()
      }
      const res3 = await chooseAddress()
      wx.setStorageSync("address", res3);
        
    } catch (err) {
      console.log(err)
    }

  },
  handleCheckboxChange(e){
    var goods_id=e.currentTarget.dataset.id
    var cart=this.data.cart
    var index=cart.findIndex(v=>v.goods_id===goods_id)
    cart[index].isChecked=!cart[index].isChecked
    this.setCart(cart)
  },
  setCart(cart){
    var checkedAll=true
    var totlePrice=0;
    var totleNum=0;
    cart.forEach(v => {
      if(v.isChecked){
        totlePrice+=v.goods_price*v.num
        totleNum+=v.num
      }else{
        checkedAll=false
      }
    })
    if(cart.length===0){
      checkedAll=false
    }
    this.setData({
      cart:cart,
      checkedAll:checkedAll,
      totlePrice:totlePrice,
      totleNum:totleNum
    })
    wx.setStorageSync("cart", cart);
      
  },
  handleItemAllChecked(e){
    var {cart,checkedAll}=this.data
    checkedAll=!checkedAll
    cart.forEach(v=>v.isChecked=checkedAll)
    this.setCart(cart)
  },
  async handleChangeNum(e){
    var {operation,id}=e.currentTarget.dataset
    var {cart}=this.data
    var index=cart.findIndex(v=>id===v.goods_id)
    if(cart[index].num===1&operation===-1){
      var res=await showModal("确定删除？")
      if(res.confirm){
        cart.splice(index,1)
        console.log(cart)
        this.setCart(cart)
      }
    }else{
    cart[index].num+=operation
    this.setCart(cart)
    }
    
  },
  async handlePay(){
    if(!this.data.address.userName){
      await showToast({title:'请选择收货地址！'})
      return;
    }
    if(this.data.totleNum===0){
      await showToast({title:'请选择商品！'})
      return;
    }
    wx.navigateTo({url: '/pages/pay/pay'})
      
  }
})