// pages/index/imgDetail/imgDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: {},
    images: [],
    collectName: '我的收藏'
  },
  to_search: function() {
    wx.navigateTo({
      url: '/pages/index/search/search',
    })
  },
  // 点击去图片详情
  to_imgDetail: function(event) {
    // console.log(event)
    wx.navigateTo({
      url: 'imgDetail',
      success: function(res) {
        // console.log(res)
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          image: event.target.dataset.image
        })
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
  // 收藏
  collect: function() {
    this.collectPopup.showPopup()
  },
  // 下载
  download: function() {
    var that = this
    wx.downloadFile({
      url: that.data.image.url, //仅为示例，并非真实的资源
      filePath: wx.env.USER_DATA_PATH + "/assets",
      success(res) {
        console.log("下载成功")
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          wx.showToast({
            title: '下载成功',
            icon: 'none',
            duration: 2000
          })
          // wx.playVoice({
          //   filePath: res.tempFilePath
          // })
        }
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      that.setData({
        image: data.image
      });
      // console.log(that.data.image)
    })
    wx.request({
      url: 'http://111.230.153.254/api/home',
      success: function(res) {
        // console.log(res.data.data)
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
    this.collectPopup = this.selectComponent("#collectPopup")
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