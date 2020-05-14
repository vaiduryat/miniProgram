// pages/goods_detail/goods_detail.js
import request from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    goods_id:0,
    goods_detail:{},
    isColected:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goods_id:options.goods_id
    })
    this.getGoodsDetail()
  },
  // 获取商品详情
  async getGoodsDetail(){
    const result=await request({
      url:'/goods/detail',
      data:this.data.goods_id
    })
    console.log(result.data)
    if(result.data.meta.status===200){
      var isColected=false
      var collections=wx.getStorageSync("collections")||[];
      isColected=collections.some(v=>v.goods_id==this.data.goods_id) 
      this.setData({
        goods_detail:result.data.message,
        isColected:isColected
      })
    }
  },
  // 放大图片
  preImage(event){
    var {index}=event.currentTarget.dataset
    var urls=this.data.goods_detail.pics.map(v=>v.pics_mid)
    wx.previewImage({
      urls,
      current:urls[index]
    })
  },
  // 点击加入购物车
  handleAddCart(){
    var cart=wx.getStorageSync("cart")||[]
    // if(!cart){
    //   console.log("haha")
    //   cart=[]
    // }
    var index=cart.findIndex(v=>v.goods_id===this.data.goods_detail.goods_id)
    var goods=JSON.parse(JSON.stringify(this.data.goods_detail))
    if(index===-1){
      goods.num=1
      goods.isChecked=true
      cart.push(goods)
    }else{
      cart[index].num++
    }
    wx.setStorageSync("cart",cart);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      mask: true,
    })
      
      

  },
  // 收藏商品
  handleCollect(){
    // var collections=wx.getStorageSync("collections")||[];
    var isColected=this.data.isColected
    isColected=!isColected
    this.setData({
      isColected:isColected
    })
    console.log(isColected)
    console.log(this.data.isColected)
    if(!isColected){
      console.log("hhahhf")
      var collections=wx.getStorageSync("collections");
      var index=collections.findIndex(v=>v.goods_id==this.data.goods_id)
      collections.splice(index,1)
      wx.setStorageSync("collections", collections); 
    }else{
      var collections=wx.getStorageSync("collections")||[];
      collections.push(this.data.goods_detail)
      wx.setStorageSync("collections", collections);
        
    }
      
  }
})