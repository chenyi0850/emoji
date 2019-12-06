<<<<<<< HEAD
// pages/index/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    emojis: []
  },
  scrollToLower: function(e) {
    // this.setData({
    //   pageNo: this.data.pageNo + 1
    // })
    // this.getData(true);
    var that = this
    wx.request({
      url: 'http://111.230.153.254/api/home',
      success: function(res) {
        console.log(res.data.data)
        // console.log(that.images)
        that.setData({
          images: that.data.images.concat(res.data.data)
        })
        console.log(that.data.images)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://111.230.153.254/api/login',
            method: "post",
            data: {
              js_code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    var that = this
    wx.request({
      url: 'http://111.230.153.254/api/home',
      success: function(res) {
        console.log(res.data.data)
        that.setData({
          images: res.data.data
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
=======
// pages/index/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    emojis: []
  },
  scrollToLower: function(e) {
    // this.setData({
    //   pageNo: this.data.pageNo + 1
    // })
    // this.getData(true);
    var that = this
    wx.request({
      url: 'http://111.230.153.254/api/home',
      success: function(res) {
        console.log(res.data.data)
        // console.log(that.images)
        that.setData({
          images: that.data.images.concat(res.data.data)
        })
        console.log(that.data.images)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://111.230.153.254/api/login',
            method: "post",
            data: {
              js_code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    var that = this
    wx.request({
      url: 'http://111.230.153.254/api/home',
      success: function(res) {
        console.log(res.data.data)
        that.setData({
          images: res.data.data
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
>>>>>>> 1c4a0cfdc758b3ef796f23013e771ffd36c51028
})