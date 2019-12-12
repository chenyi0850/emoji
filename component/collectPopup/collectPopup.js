Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    image: {
      type: Object,
      value: '内容'
    },
    emojiId: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: true,
    newFlag: true,
    token: '',
    collections: [],
    collect_id: '',
    newCollectName: ''
  },

  /**
   * 组件的方法列表
   */
  attached:function() {
    var that = this
    this.data.token = wx.getStorageSync('token')
    // 获取收藏夹列表
    wx.request({
      url: `https://www.linjiale.xyz/api/collection`,
      method: 'get',
      header: {
        token: that.data.token
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({ collections:res.data.data })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  methods: {
    //隐藏弹框
    hidePopup: function () {
      this.setData({
        flag: !this.data.flag
      })
    },
    //展示弹框
    showPopup() {
      this.setData({
        flag: !this.data.flag
      })
    },
    // 新建收藏夹
    setNewCollect() {
      var that = this
      this.setData({
        newFlag: !this.data.newFlag
      })
    },
    getName: function(e) {
      this.setData({ newCollectName: e.detail.value })
      // console.log(newCollectName)
    },
    // 发送新建收藏夹请求
    newConfirm() {
      let nameFlag = false 
      for(let i = 0; i < this.data.collections.length; i++){
        if (this.data.newCollectName === this.data.collections[i].collect_name){
          nameFlag = true
        }
      }
      if(this.data.newCollectName === ''){
        wx.showToast({
          title: '名字不能为空',
          icon: 'none',
          duration: 2000
        })
      }
      else if(nameFlag){
        wx.showToast({
          title: '该收藏夹已存在',
          icon: 'none',
          duration: 2000
        })
      }
      else {
        var that = this
        console.log(that.data.newCollectName)
        wx.request({
          url: `https://www.linjiale.xyz/api/collection`,
          method: 'post',
          header: {
            token: that.data.token
          },
          data: {
            collect_name: that.data.newCollectName
          },
          success: function (res) {
            console.log(res.data)
          },
          fail: function (err) {
            console.log(err)
          }
        })
        // 新建收藏夹后重新发送获取收藏夹列表的请求
        wx.request({
          url: `https://www.linjiale.xyz/api/collection`,
          method: 'get',
          header: {
            token: that.data.token
          },
          success: function (res) {
            console.log(res.data.data)
            that.setData({ collections: res.data.data })
          },
          fail: function (err) {
            console.log(err)
          }
        })
        this.setData({
          newFlag: !this.data.newFlag
        })
      }
    },
    // 取消新建收藏夹
    newCancel(){
      this.setData({
        newFlag: !this.data.newFlag
      })
    },
    cancel() {
      this.setData({
        flag: !this.data.flag
      })
    },
    confirm() {
      var that = this
      if(this.data.collect_id.length === 0){
        wx.showToast({
          title: '请选择收藏夹',
          icon: 'none',
          duration: 2000
        })
      }
      else{
        // 新建收藏
        if (!this.data.emojiId){
          wx.request({
            url: `https://www.linjiale.xyz/api/collection/${that.data.collect_id}`,
            method: 'post',
            header: {
              token: that.data.token
            },
            data: {
              sid: that.data.image.sid
            },
            success: function (res) {
              console.log(res.data)
            },
            fail: function (err) {
              console.log(err)
            }
          })
          this.setData({
            flag: !this.data.flag
          })
        }
        else{
          wx.request({
            url: `https://www.linjiale.xyz/api/collection/${that.data.collect_id}`,
            method: 'post',
            header: {
              token: that.data.token
            },
            data: {
              cid: that.data.emojiId
            },
            success: function (res) {
              console.log(res.data)
            },
            fail: function (err) {
              console.log(err)
            }
          })
          this.setData({
            flag: !this.data.flag
          })
        }
      }
    },
    checkboxChange(e) {
      console.log(e.detail.value)
      this.setData({ collect_id: e.detail.value })
    }
  }
})