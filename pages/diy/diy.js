// pages/diy/diy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArray:[
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  routergo(e){
    wx.navigateTo({
      url: `/pages/diy/editPhoto/editPhoto?src=${e.currentTarget.dataset.src}`,
    })
  },
  onLoad: function (options) {
    let that=this;
    wx.request({
      url: `http://111.230.153.254/api/temps?limit=${30}&page=${0}`, 
      success(res){
        console.log(res.data.data)
        that.setData({
          imgArray:res.data.data
        })
      }
    })
  },
})