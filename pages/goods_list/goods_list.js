import request from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    queryInfo:{
      query:'',
      cid:5,
      pageNum:1,
      pageSize:10
    },
    goodsList:[],
    total:0,
    pageTotle:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsList()
  },
  // 下拉到底部
  onReachBottom:function(){
    if(this.data.queryInfo.pageNum>=this.data.pageTotle){
      wx.showToast({
        title: '已经到底部啦！',
        mask:true
      })
        
    }else{
      this.data.queryInfo.pageNum++
      this.getGoodsList()
    }
  },
  // 用户下拉刷新
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.data.queryInfo.pageNum=1
    this.getGoodsList()
  },
  // 处理导航栏点击事件
  handleTitleTap(event){
    var {index}=event.detail
    this.data.tabs.forEach((v,i)=>{
      if(i===index){
        v.isActive=true
      }else{
        v.isActive=false
      }
    })
    var _tabs=this.data.tabs
    this.setData({
      tabs:_tabs
    })
  },
  // 获取分类列表
 async getGoodsList(){
   const result=await request({
      url:'/goods/search',
      data:this.data.queryInfo
    })
    console.log(result.data.message.goodsList)
    this.setData({
      goodsList:[...this.data.goodsList,...result.data.message.goodsList],
      total:result.data.message.total,
      pageTotle:Math.ceil(result.data.message.total/this.data.queryInfo.pageSize)
    })
    wx.stopPullDownRefresh()
  }
})