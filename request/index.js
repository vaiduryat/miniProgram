var ajaxTimes=0
export default function request(options){
    var header=options.header?{...options.header}:{}
    if(options.url.includes('/my/')){
        var token=wx.getStorageSync("token");
        header["Authorization"]=token  
    }
    var baseUrl='http://localhost:3004'
    ajaxTimes++
    wx.showLoading({
        title: "加载中ing",
        mask: true
    });
      
    return new Promise((resolve,reject)=>{
        wx.request({
            url:baseUrl+options.url,
            method:options.method||'get',
            data:options.data||{},
            header:header,
            success:function(res){
                ajaxTimes--
                if(ajaxTimes===0){
                    wx.hideLoading()
                }
                resolve(res)
            },
            fail:function(res){
                reject(res)
            }
        })
    })
}