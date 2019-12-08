// pages/index/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_search: true, 
    images: [],
    emojis: [],
    results: [],
    key: ''
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
  getKey: function (e) {
    this.setData({ key: e.detail.value })
    console.log(this.data.key)
  },
  search: function(e){
    var that =this
    wx.request({
      url: 'http://111.230.153.254/api/search',
      method: 'get',
      data: {
        kw: that.data.key,
        limit: 18,
        page:1
      },
      success(res){
        that.setData({ results: res.data.data })
        that.setData({ is_search: false })
        console.log(that.data.results)
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  // 点击去图片详情
  to_imgDetail: function (event) {
    console.log(event)
    wx.navigateTo({
      url: '../imgDetail/imgDetail',
      success: function (res) {
        // console.log(res)
        res.eventChannel.emit('acceptDataFromOpenerPage', { image: event.target.dataset.image })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
})