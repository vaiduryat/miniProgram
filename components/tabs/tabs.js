// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTitleTap(event){
      var {index}=event.currentTarget.dataset
      this.triggerEvent('titleTap',{index},{})
    }
  }
})
