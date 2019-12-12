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
  report(){
    let sid=this.data.image.sid;
    wx.navigateTo({
      url: `/pages/index/tipster/tipster?sid=${sid}`,
    })
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
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success(res) {
              // ...
              console.log(res)

              wx.downloadFile({
                url: that.data.image.url,
                success: function (res) {
                  console.log(res)
                  if (res.statusCode === 200) {
                    let img = res.tempFilePath;

                    wx.saveImageToPhotosAlbum({
                      filePath: img,
                      success(res) {
                        wx.showToast({
                          title: '下载成功',
                          icon: 'success',
                          duration: 2000
                        });
                      },
                      fail(res) {
                        console.log(res)
                        wx.showToast({
                          title: '下载失败',
                          icon: 'none',
                          duration: 2000
                        });
                      }
                    });
                  }
                }
              });
            },
            fail(err) {
              console.log(err)
            }
          });
        } 
        else{
          wx.downloadFile({
            url: that.data.image.url,
            success: function (res) {
              console.log(res)
              if (res.statusCode === 200) {
                let img = res.tempFilePath;

                wx.saveImageToPhotosAlbum({
                  filePath: img,
                  success(res) {
                    wx.showToast({
                      title: '下载成功',
                      icon: 'success',
                      duration: 2000
                    });
                  },
                  fail(res) {
                    console.log(res)
                    wx.showToast({
                      title: '下载失败',
                      icon: 'none',
                      duration: 2000
                    });
                  }
                });
              }
            }
          });
        }
      }
    });
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
      url: 'https://www.linjiale.xyz/api/home',
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