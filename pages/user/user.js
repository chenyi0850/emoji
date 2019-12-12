// pages/user/user.js

var app = getApp
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 跳转到我的收藏夹页面
  toCollection: function () {
    wx.navigateTo({
      url: 'collection/collection',
    })
  },
  toDiy: function (){
    wx.navigateTo({
      url: 'myDiy/myDiy',
    })
  },
  clear:function(){
    // wx.clearStorage({
    //   succes: function(res){
    //     wx.showToast({
    //       title: '清除成功',
    //       icon: 'success',
    //       duration: 2000
    //     }),
    //   },
    //     fail: function(){
    //       console.log("清除失败")
    //     }
    // })
    wx.clearStorage()
    wx.showToast({
          title: '清除成功',
          icon: 'success',
          duration: 2000
        })
  },
  aboutUs:function(){
    wx.navigateTo({
      url: 'aboutUs/aboutUs',
    })
  }
})