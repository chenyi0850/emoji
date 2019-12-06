<<<<<<< HEAD
// pages/index/imgDetail/imgDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: {},
    images:[],
    collectName: '我的收藏'
  },

  // 点击去图片详情
  to_imgDetail: function(event){
    // console.log(event)
    wx.navigateTo({
      url: 'imgDetail',
      success: function (res) {
        console.log(res)
        res.eventChannel.emit('acceptDataFromOpenerPage', { image: event.target.dataset.image })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  // 收藏
  collect: function(){
    this.collectPopup.showPopup()
    var that = this
    wx.getStorage({
      key: 'token',
      success: function(res) {
        // console.log(res)
        let token = res.data
        // 获取所有收藏夹，判断是否有收藏夹
        wx.request({
          url: `http://111.230.153.254/api/collection`,
          header: {
            token: token
          },
          success: function (res) {
            console.log(res.data)
            //如果没有新建一个收藏夹
            if(res.data.data.length == 0) {
              wx.request({
                url: `http://111.230.153.254/api/collection`,
                header: {
                  token: token
                },
                data: {
                  collect_name: that.data.collectName
                },
                success: function (res) {
                  console.log(res.data)
                },
                fail: function (err) {
                  console.log(err)
                }
              })
            }
          },
          fail: function (err) {
            console.log(err)
          }
        })
        // 新建收藏
        wx.request({
          url: `http://111.230.153.254/api/collection/${that.data.image.sid}`,
          header: {
            token: token
          },
          success: function(res){
            console.log(res.data)
          },
          fail: function(err){
            console.log(err)
          }
        })
      },
    })
    // try {
    //   var token = wx.getStorageSync('token')
    //   if (value) {
    //     console.log('拿到token')
    //     wx.request({
    //       url: `http://111.230.153.254/api/collection/${that.data.image.sid}`,
    //       header: {
    //         token: token
    //       },
    //       // `http://111.230.153.254/api/category/${that.data.emojiId}`
    //       success: function (res) {
    //         console.log(res)
    //       },
    //       fail: function (err) {
    //         console.log(err)
    //       }
    //     })
    //   }
    // } catch (e) {
    //   console.log('拿token失败')
    // }
  },
  _error() {
    console.log('你点击了取消');
    this.collectPopup.hidePopup();
  },
  _success() {
    console.log('你点击了确定');
    this.collectPopup.hidePopup();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      that.setData({ image: data.image });
      console.log(that.data.image)
    })
    wx.request({
      url: 'http://111.230.153.254/api/home',
      success: function (res) {
        console.log(res.data.data)
        that.setData({ images: res.data.data });
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
=======
// pages/index/imgDetail/imgDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: {},
    images:[],
    collectName: '我的收藏'
  },

  // 点击去图片详情
  to_imgDetail: function(event){
    // console.log(event)
    wx.navigateTo({
      url: 'imgDetail',
      success: function (res) {
        console.log(res)
        res.eventChannel.emit('acceptDataFromOpenerPage', { image: event.target.dataset.image })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  // 收藏
  collect: function(){
    this.collectPopup.showPopup()
    var that = this
    wx.getStorage({
      key: 'token',
      success: function(res) {
        // console.log(res)
        let token = res.data
        // 获取所有收藏夹，判断是否有收藏夹
        wx.request({
          url: `http://111.230.153.254/api/collection`,
          header: {
            token: token
          },
          success: function (res) {
            console.log(res.data)
            //如果没有新建一个收藏夹
            if(res.data.data.length == 0) {
              wx.request({
                url: `http://111.230.153.254/api/collection`,
                header: {
                  token: token
                },
                data: {
                  collect_name: that.data.collectName
                },
                success: function (res) {
                  console.log(res.data)
                },
                fail: function (err) {
                  console.log(err)
                }
              })
            }
          },
          fail: function (err) {
            console.log(err)
          }
        })
        // 新建收藏
        wx.request({
          url: `http://111.230.153.254/api/collection/${that.data.image.sid}`,
          header: {
            token: token
          },
          success: function(res){
            console.log(res.data)
          },
          fail: function(err){
            console.log(err)
          }
        })
      },
    })
    // try {
    //   var token = wx.getStorageSync('token')
    //   if (value) {
    //     console.log('拿到token')
    //     wx.request({
    //       url: `http://111.230.153.254/api/collection/${that.data.image.sid}`,
    //       header: {
    //         token: token
    //       },
    //       // `http://111.230.153.254/api/category/${that.data.emojiId}`
    //       success: function (res) {
    //         console.log(res)
    //       },
    //       fail: function (err) {
    //         console.log(err)
    //       }
    //     })
    //   }
    // } catch (e) {
    //   console.log('拿token失败')
    // }
  },
  _error() {
    console.log('你点击了取消');
    this.collectPopup.hidePopup();
  },
  _success() {
    console.log('你点击了确定');
    this.collectPopup.hidePopup();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      that.setData({ image: data.image });
      console.log(that.data.image)
    })
    wx.request({
      url: 'http://111.230.153.254/api/home',
      success: function (res) {
        console.log(res.data.data)
        that.setData({ images: res.data.data });
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
>>>>>>> 1c4a0cfdc758b3ef796f23013e771ffd36c51028
})