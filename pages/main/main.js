/***
 * @Description: 个人主页的登录设计
 * @Author: Harry
 * @Date: 2021-09-04 16:25:15
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-09-07 21:39:08
 * @LastEditors: Harry
 */
// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  // 登录
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.setStorageSync("userInfo", res.userInfo);
        this.setData({
          hasUserInfo: res.userInfo,
          isLogin: true
        })
        wx.showToast({
          title: '更新成功',
          icon: 'none',
          duration: 1000
        });
      }
    })
  },
  closeLoginPopup() {
    this.setData({
      hasUserInfo: !this.data.hasUserInfo
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
    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      this.setData({
        hasUserInfo: false,
        isLogin: false
      })
    } else {
      this.setData({
        hasUserInfo: userInfo,
        isLogin: true
      })
    }
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
})