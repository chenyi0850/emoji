// pages/index/emojiDetail/emojiDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    emojiId: undefined,
    emojis: [],
    images: [
      {url:"../../../assets/emoji.jpg"}
    ],
    page: 1
  },
  to_search:function(){
    wx.navigateTo({
      url: '/pages/index/search/search',
    })
  },
  // 点击去表情包详情
  to_emojiDetail: function (event) {
    console.log(event)
    wx.navigateTo({
      url: 'emojiDetail',
      success: function (res) {
        console.log(res)
        res.eventChannel.emit('acceptDataFromOpenerPage', { emojiId: event.target.dataset.emojiid })
      },
      fail: function (err) {
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
  //下滑查看剩余表情包
  scrollToLower:function(){
    var that = this
    wx.request({
      url: `http://111.230.153.254/api/category/${that.data.emojiId}`,
      data: {
        limit: 9,
        page: that.data.page
      },
      success: function (res) {
        that.setData({ images: that.data.images.concat(res.data.data) });
        that.data.page++
        console.log(that.data.images)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  collect:function(){
    this.collectPopup.showPopup()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    // eventChannel.emit('acceptDataFromOpenedPage', { data: 'test' });
    // eventChannel.emit('someEvent', { data: 'test' });
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data)
      that.setData({ emojiId: data.emojiId });
      // console.log(that.data.emojiId)
    })
    wx.request({
      url: `http://111.230.153.254/api/category/${that.data.emojiId}`, 
      data:{
        limit:9,
        page:that.data.page
      },
      success: function (res) {
        that.setData({ images: res.data.data });
        that.data.page++
        console.log(that.data.images)
      },
      fail: function(err){
        console.log(err)
      }
    })
    wx.request({
      url: 'http://111.230.153.254/api/category',
      method: 'get',
      data: {
        limit: 15,
        page: that.data.page
      },
      success: function (res) {
        // console.log(res.data.data)
        that.setData({ emojis: res.data.data });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.collectPopup = this.selectComponent("#collectPopup")
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