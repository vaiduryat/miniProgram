import request from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/wx_utils.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      goods:[],
      timeId:0,
      inpValue:'',
      isFocus:false
    },
    onShow: function () {

    },

   handleInput(e){
     clearTimeout(this.data.timeId)
      var {value}=e.detail
      if(!value.trim()){
        return;
      }
      this.setData({
        inpValue:value,
        isFocus:true
      })
      this.data.timeId=setTimeout(()=>{
        this.getGoods(value)
      },1000)
    },
    async getGoods(query){
      var res=await request({
      url:'/goods/qsearch',
      data:{
        query:query
      } 
    })
    this.setData({
      goods:res.data.message
    })
    console.log(this.data.goods)

  },
  handleCancel(){
    this.setData({
      goods:[],
      isFocus:false,
      inpValue:''
    })
  }
})