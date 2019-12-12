// pages/diy/diy.js
Page({
  data: {
    imgArray: [],
    input: '',
    index: 1,
  },
  routergo(e) {
    wx.navigateTo({
      url: `/pages/diy/editPhoto/editPhoto?src=${e.currentTarget.dataset.src}`,
    })
  },
  scrollToLower: function(e) {
    this.data.index++;
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `https://www.linjiale.xyz/api/temps?limit=${18}&page=${that.data.index}`,
      success(res) {
        let arr = that.data.imgArray.concat(res.data.data);
        that.setData({
          imgArray: arr
        })
        setTimeout(wx.hideLoading(), 1500)
      }
    })

  },
  handleInput(e) {
    this.setData({
      input: e.detail.value
    })
  },
  search() {
    let that = this;
    wx.showLoading({
      title: '搜索中',
    })
    wx.request({
      url: 'https://www.linjiale.xyz/api/temps/search',
      data: {
        kw: that.data.input,
        limit: 18,
        page: 1
      },
      success(res) {
        that.setData({
          imgArray: res.data.data
        })
        wx.hideLoading()
      }
    })
  },
  onLoad: function(options) {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `https://www.linjiale.xyz/api/temps?limit=${30}&page=${0}`,
      success(res) {
        that.setData({
          imgArray: res.data.data
        })
        setTimeout(wx.hideLoading(), 1500)
      }
    })
  },
})