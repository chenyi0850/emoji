// pages/download/download.js
function Detail(text) {
  this.text = text;
}
function Info() {
  this.details = [];
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    showView:false,
    showView2: false,
    show_value:'未命名',
    text:'新建文件夹',
    input_value:null,
    input_val:null
  },
  // 初始化
  init: function () {
    let that = this;
    this.setData({
      info: new Info(),
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
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

  },
  // 获取input里面的值
  getValue:function(e){
    var Value = e.detail.value
    this.setData({
      input_value:Value
    })
  },
  alter_value:function(e){
    var Value = e.detail.value
    this.setData({
      input_val: Value
    })
  },
  create_folder: function(){
    this.setData({
      input_value:null,
      showView: (!this.data.showView)
    })
  },
  create_folder1: function (e) {
    this.setData({
      showView: (!this.data.showView),
      text:(this.data.input_value)
    })
  },
  // 修改文件
  alter_folder: function () {
    this.setData({
      showView2: (!this.data.showView2),
      text:(this.data.input_val)
    })
  },
  // 新增文件函数
  addItem1: function (e) {
    let info = this.data.info;
    info.details.push(new Detail());
    this.setData({
      info: info,
      showView: (!this.data.showView),
      text: (this.data.input_value)
    });
  },
  addItem2: function (e) {
    let info = this.data.info;
    info.details.push(new Detail());
    this.setData({
      info: info,
      showView2: (!this.data.showView2),
      text: (this.data.input_value)
    });
  },
  // 删除文件函数
  removeItem: function (e) {
    let info = this.data.info;
    info.details.pop();
    this.setData({
      info: info,
      showView2: (!this.data.showView2),
    });
  },
})