// pages/download/download.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: [{
      'name': "",
      'ID':""
    }],
    // ID: [],
    Id:"",
    showView: false,
    showView2: false,
    show_value: '未命名',
    info: [],
    input_value: null,
    input_val: null,
    currentSelect: 'data'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var Token = wx.getStorageSync('token'); //获取token
    wx.request({
      url: 'http://111.230.153.254/api/collection',
      method: "get",
      header: {
        'token': Token,
        'content-type': 'application/json'
      },
      data: {},
      success: function(res) {
        console.log(res.data.data)
        let text = [];
        let id = [];
        res.data.data.forEach(item => {
          var obj={};
          obj.name = item.collect_name;
          obj.ID = item.collect_id;
          text.push(obj);
          // text.push(item.collect_name);
          // id.push(item.collect_id);
        })
        that.setData({
          text: text
          // ID: id
        })
        for (var index in res.data) {
          var info = that.data.info;
          var title = that.data.title;
          info.push(title);
          info: info;
          text: res.data.collect_name
        }
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

  },
  // 更新data 切换选中状态
  selectdata: function(e) {
    this.setData({
      currentSelect: e.currentTarget.dataset.id
    })
  },
  selectname: function(e) {
    this.setData({
      currentSelect: e.currentTarget.dataset.id
    })
  },
  // 获取input里面的值
  getValue: function(e) {
    console.log(e);
    var Value = e.detail.value
    this.setData({
      input_value: Value
    })
  },
  alter_value: function(e) {
    var Value = e.detail.value
    this.setData({
      input_val: Value
    })
  },
  create_folder: function() {
    this.setData({
      input_value: null,
      showView: (!this.data.showView)
    })
  },
  create_folder1: function(e) {
    this.setData({
      showView: (!this.data.showView),
      text: (this.data.input_value)
    })
  },
  // 长按事件修改文件
  alter_folder: function(e) {
    var that=this;
    console.log(that.data.Id);
    var index = that.data.Id;
    var altertext='text['+index+'].name';
    console.log([altertext]);
    this.setData({
      showView2: (!this.data.showView2),
      [altertext]: (this.data.input_val),
    })
    // that.onLoad();
  },
  //复制即将修改或删除的文件ID
  alter_folder1: function (e) {
    this.setData({
      showView2: (!this.data.showView2),
      Id: e.currentTarget.dataset.id.ID
    })
    console.log(e.currentTarget.dataset.id.ID)
  },
  // 新增文件函数
  addItem1: function(e) {
    var info = this.data.info;
    var title = this.data.title;
    info.push(title);
    var that = this;
    let arr = that.data.text;
    console.log(that.data);
    arr.name = that.data.input_value;
    var updata = arr.name;
    arr.push(updata)
    this.setData({
      info: info,
      showView: (!this.data.showView),
      text: arr
    });

    //与后台数据连接
    var that = this
    var Token = wx.getStorageSync('token'); //获取token
    wx.request({
      url: 'http://111.230.153.254/api/collection',
      method: "post",
      header: {
        'token': Token,
        'content-type': 'application/json'
      },
      data: {
        collect_name: that.data.input_value
      },
      success: function(res) {
        if (!res.code) {
          wx.showToast({
            title: '新建文件夹成功',
            icon: 'success',
            duration: 2000 //持续的时间
          })
        } else {
          wx.showToast({
            title: '新建文件夹失败',
            icon: 'error',
            duration: 2000 //持续的时间
          })
        }
      }
    })
  },
  // 删除文件函数
  removeItem: function(e) {
    console.log(e)
    let info = this.data.info;
    info.pop();
    this.setData({
      info: info,
      showView2: (!this.data.showView2),
    });
    //与后台数据连接
    var that = this
    var Token = wx.getStorageSync('token'); //获取token
    wx.request({
      url: 'http://111.230.153.254/api/collection',
      method: "delete",
      header: {
        'token': Token,
        'content-type': 'application/json'
      },
      data: {
        collect_id: that.data.Id
      },
      success: function(res) {
        if (!res.code) {
          wx.showToast({
            title: '删除文件夹成功',
            icon: 'success',
            duration: 2000 //持续的时间
          })
          that.onLoad()
        } else {
          wx.showToast({
            title: '删除文件夹失败',
            // icon: 'error',
            duration: 2000 //持续的时间
          })
        }
      }
    })
  },
  // 单击事件
   gotophoto: function(e) {
    var that=this;
    wx.navigateTo({
      url: 'photo/photo'
    })
    console.log(e.currentTarget.dataset.id.ID);
    wx.setStorageSync('collect_id',e.currentTarget.dataset.id.ID)
  }

})