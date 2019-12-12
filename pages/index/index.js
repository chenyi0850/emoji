Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_index: true, 
    page: 1,
    images: [],
    emojis: []
  },
  // 上拉加载
  scrollToLower: function (e) {
    this.setData({
      page: this.data.page + 1
    })
    var that =this
    // this.getData(true);
    wx.request({
      url: 'https://www.linjiale.xyz/api/category',
      method: 'get',
      data: {
        limit: 15,
        page: that.data.page
      },
      success: function (res) {
        // console.log(res.data.data)
        that.setData({ emojis: that.data.emojis.concat(res.data.data) });
      }
    })
    
  },
  
  // 点击去分类页面
  to_sort: function(event){
    this.setData({ is_index: false }) 
    // console.log(this.data.is_index)
    var that = this
    wx.request({
      url: 'https://www.linjiale.xyz/api/category',
      method: 'get',
      data:{
        limit: 15,
        page: that.data.page
      },
      success: function (res) {
        // console.log(res.data.data)
        that.setData({ emojis: res.data.data });
      }
    })
  },

  // 点击去首页
  to_index: function(event){
    // console.log(event)
    this.setData({ is_index: true })
    // console.log(this.data.is_index)
  },
  to_search:function(){
    wx.navigateTo({
      url: 'search/search',
    })
  },
  // 点击查看图片详情
  to_imgDetail: function(event){
    console.log(event)
    wx.navigateTo({
      url: 'imgDetail/imgDetail',
      success: function(res){
        console.log(event.target.dataset.image)
        res.eventChannel.emit('acceptDataFromOpenerPage', { image: event.target.dataset.image })
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  //点击查看表情包详情
  to_emojiDetail: function(event){
    console.log(event)
    wx.navigateTo({
      url: 'emojiDetail/emojiDetail',
      success: function(res){
        console.log(res)
        res.eventChannel.emit('acceptDataFromOpenerPage', { emojiId: event.target.dataset.emojiid })
      },
      fail: function(err){
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://www.linjiale.xyz/api/login',
            method: "post",
            data: {
              js_code: res.code
            },
            success:function(res){
              console.log('登录成功')
              console.log(res.data.token)
              wx.setStorageSync('token', res.data.token)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    var that = this
    wx.request({
      url: 'https://www.linjiale.xyz/api/home',
      success: function(res){
        // console.log(res.data.data)
        that.setData({ images: res.data.data });
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
    var that = this
    wx.request({
      url: 'https://www.linjiale.xyz/api/home',
      success: function (res) {
        // console.log(res.data.data)
        that.setData({ images: res.data.data });
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    wx.request({
      url: 'https://www.linjiale.xyz/api/home',
      success: function (res) {
        // console.log(res.data.data)
        // console.log(that.images)
        that.setData({ images: that.data.images.concat(res.data.data) })
        console.log(that.data.images)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})