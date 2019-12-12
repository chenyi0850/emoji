// pages/index/tipster/tipster.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input: '',
    sid: null,
    tid: null
  },
  before() {
    wx.navigateBack({

    });
  },
  submit() {
    let sid = this.data.sid;
    let text=this.data.input;
    wx.request({
      url: 'https://www.linjiale.xyz/api/report',
      method: 'post',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        text:text,
        sid: sid
      },
      success(res) {
        console.log(res.data)
      }
    })
  },
  handleInput(e) {
    this.setData({
      input: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      sid: (options.sid == undefined) ? null : options.sid,
      tid: (options.tid == undefined) ? null : options.tid
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
})