/***
 * @Description: 个人主页的登录设计
 * @Author: Harry
 * @Date: 2021-09-04 16:25:15
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-09-08 14:16:12
 * @LastEditors: Harry
 */
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';

// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    isLogin: false,
    isEditUserName: false,
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        nickName: userInfo.nickName
      })
    }
  },
  onChooseAvatar(e) {
    if (!this.data.nickName) {
      // 危险通知
      Notify({ type: 'danger', message: '用户昵称未填写，请填写后确认！' });
      return
    }

    const { avatarUrl } = e.detail
    const userInfo = {
      avatarUrl,
      nickName: this.data.nickName
    }

    wx.setStorageSync("userInfo", userInfo);
    this.setData({
      hasUserInfo: userInfo,
      isLogin: true
    })
  },
  closeLoginPopup() {
    this.setData({
      hasUserInfo: !this.data.hasUserInfo
    })
  },
  opTapUsername() {
    this.setData({
      isEditUserName: true
    })
  },
  onInputUsername(e) {
    this.setData({
      nickName: e.detail.value
    })
  },
  // 退出登录
  closeF() {
    this.setData({
      nickName: ''
    })
    wx.clearStorage();
    wx.switchTab({
      url: '/pages/index/index',
      success: (result) => {
        wx.showToast({
          title: '退出成功',
          icon: 'none',
          duration: 1500
        });
      }
    });
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