// pages/diy/editPhoto/editPhoto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    ifBorder: true,
    x: 0,
    y: 0,
    index: -1,
    input: '',
    inputArray: [

    ],
    scale: 1,
    color: 'black',
    colorArray: [
      'red',
      'blue',
      'black',
      'white',
      'gray',
      'yellow',
      'green'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      imgSrc: options.src
    });
  },
  add() {
    let arr = this.data.inputArray;
    if (this.data.input.length > 0) {
      arr.push({
        word: this.data.input,
        x: 100,
        y: 100
      })
      this.setData({
        inputArray: arr
      })
    }
    this.setData({
      input: '',
      index:-1,
    })
  },
  bigger() {
    let sc = this.data.scale + 0.1;
    this.setData({
      scale: sc
    })
  },
  changeColor(e) {
    this.setData({
      color: e.currentTarget.dataset.color
    })
  },
  smaller() {
    let sc = this.data.scale - 0.1;
    this.setData({
      scale: sc
    })
  },
  move(e) {
    let index = e.currentTarget.dataset.index;
    let arr = this.data.inputArray;
    arr[index].x = e.detail.x;
    arr[index].y = e.detail.y;
    this.setData({
      inputArray: arr
    })
  },
  chooseText(e) {
    this.setData({
      input: e.currentTarget.dataset.word,
      index: e.currentTarget.dataset.index,
    })
  },
  handleInput(e) {
    if (this.data.index >= 0) {
      let arr = this.data.inputArray;
      arr[this.data.index].word = e.detail.value
      this.setData({
        inputArray: arr
      })
    }
    this.setData({
      input: e.detail.value,
    })
  },
  dld() {
    wx.showLoading({
      title: '生成中。。。',
    })
    let that = this;
    const ctx = wx.createCanvasContext('firstCanvas');
    let dldFile = function() {
      return new Promise((resolve, reject) => {
        wx.downloadFile({
          url: that.data.imgSrc, //仅为示例，并非真实的资源
          success(res) {
            if (res.statusCode === 200) {
              resolve(res)
            }
          }
        })
      })
    }
    dldFile().then(res => {
      ctx.drawImage(res.tempFilePath, 0, 0, 300, 300);
      ctx.setFontSize(75 * that.data.scale / 2)
      ctx.fillStyle = that.data.color;
      that.data.inputArray.map(item => {
        ctx.fillText(item.word, item.x, item.y + 75 * that.data.scale / 2)
        ctx.draw(true)
      })
      setTimeout(() => {
        wx.canvasToTempFilePath({
          canvasId: 'firstCanvas',
          fileType: 'jpg',
          quality: 1,
          success(res) {
            wx.hideLoading();
            wx.previewImage({
              current: res.tempFilePath, // 当前显示图片的http链接
              urls: [res.tempFilePath] // 需要预览的图片http链接列表
            })
          }
        })
      }, 500)
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