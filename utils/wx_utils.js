// 获取权限信息
export function getSetting(){
   return new Promise((resolve,reject)=>{
        wx.getSetting({
            success:function(res){
                resolve(res)
            },
            fail:function(res){
                reject(res)
            }
        })
    })
}

// 获取地址
export function chooseAddress(){
    return new Promise((resolve,reject)=>{
         wx.chooseAddress({
             success:function(res){
                 resolve(res)
             },
             fail:function(res){
                 reject(res)
             }
         })
     })
 }

//  打开权限设置
export function openSetting(){
    return new Promise((resolve,reject)=>{
         wx.openSetting({
             success:function(res){
                 resolve(res)
             },
             fail:function(res){
                 reject(res)
             }
         })
     })
 }

//  显示对话框

export function showModal(content){
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            content: content,
            success: res=> {
              resolve(res)
              },
            fail:res=>{
                reject(res)
            }
          })
     })
 }

export function showToast(options){
    return new Promise((resolve,reject)=>{
        wx.showToast({
            title: options.title,
            icon: options.icon||"none",
            mask: options.mask||false,
            success: result => {
                resolve(result)
            },
            fail: (res) => {
                reject(res)
            }
        })
    })
}

export function login(){
    return new Promise((resolve,reject)=>{
        wx.login({
            success: result => {
                resolve(result)
            },
            fail: (res) => {
                reject(res)
            }
        })
    })
}
   