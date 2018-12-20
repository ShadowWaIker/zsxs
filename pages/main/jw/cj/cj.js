var app = getApp();
Page({
  data: {
    server: app.server,
    help_status: false,
    tips: '加载中...',
    result: null
  },
  onShow:function(){
    // 页面显示
    var that = this;
    wx.request({
      url: app.server+"WeAPP_Jw_CJ_NEW.php",
      data: {
        openID: app.globalData.openID,
        usertype: app.globalData.usertype,
        nickname: app.globalData.userInfo.nickName,
        appver: app.appver,
        device: app.globalData.deviceInfo.model,
        vxversion: app.globalData.deviceInfo.version
      },
      method: 'POST',
      header: {"Content-Type":"application/x-www-form-urlencoded"},
      success: function(res){
        that.setData({
          tips: res.data.tips,
          result: res.data.result
        });
      },
      fail: function() {
        that.setData({
          tips: '网络请求出错！'
        });
        return "fail";
      }
    });
  },
  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  tapHelp: function(e){
    if(e.target.id == 'help'){
      this.hideHelp();
    }
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  },
  onShareAppMessage: function () {
    return {
      title: app.globalData.shareTitle.cj,
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})