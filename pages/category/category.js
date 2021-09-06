/***
 * @Description: 分类详情页
 * @Author: Harry
 * @Date: 2021-09-04 22:36:55
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-09-06 15:21:47
 * @LastEditors: Harry
 */
// pages/category/category.js
const Api = require('../../utils/api.js');
const wxRequest = require('../../utils/wxRequest.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {cateName} = options
    if(cateName){
      this.getcates(cateName)
    }
  },
  // 获取到某个分类的文章信息
  getcates(options){
    wxRequest.getRequest(Api.getCateDetail(options))
    .then(res=>{
      if(res.statusCode==200){
        console.log(res);
      }
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