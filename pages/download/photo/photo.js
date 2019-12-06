// pages/download/photo/photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:'新建文件夹',
    images: [],
    emojis: []
  },

  // 上拉加载
  scrollToLower: function (e) {
    var that = this
    var Token = wx.getStorageSync('token');//获取token
    var collect_id = wx.getStorageSync('collect_id');//获取文件id
    wx.request({
      url: 'http://111.230.153.254/api/collection/collect_id',
      method:get,
      header:{
        'token': Token,
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({ images: that.data.images.concat(res.data.data) })
        console.log(that.data.images)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var Token = wx.getStorageSync('token');//获取token
    var collect_id = wx.getStorageSync('collect_id');//获取文件id
    wx.request({
      url: 'http://111.230.153.254/api/collection/collect_id',
      method: get,
      header: {
        'token': Token,
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          images: that.data.images.concat(res.data.data)
          })
        console.log(that.data.images)
      }
    })
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

  }
})