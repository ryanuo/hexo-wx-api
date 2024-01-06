/***
 * @Description: 分类详情页
 * @Author: Harry
 * @Date: 2021-09-04 22:36:55
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-09-20 08:56:55
 * @LastEditors: Harry
 */
// pages/category/category.js
const appInst = getApp();
const { config, Api, wxRequest } = appInst.globalData
let { getAd: ad } = config
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    dataList: [],
    isAd: ad,
    avatarUrl: '',
    skeletonVisibleMap: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let { cateName } = options
    if (cateName) {
      this.getcates(cateName)
    }
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        avatarUrl: userInfo.avatarUrl
      })
    }
  },
  // 获取到某个分类的文章信息
  getcates(options) {
    wxRequest.getRequest(Api.getCateDetail(options))
      .then(res => {
        if (res.statusCode == 200) {
          const skeletonVisibleMap = this.data.skeletonVisibleMap
          res.data.postlist.forEach(item => {
            skeletonVisibleMap[item.slug] = true
          });
          this.setData({
            title: res.data.name,
            dataList: res.data.postlist,
            skeletonVisibleMap
          })
        }
      })
  },
  // 图片加载失败
  imgerror(e) {
    let { index } = e.currentTarget.dataset
    let dataList = this.data.dataList
    dataList[index].cover = '../../static/images/default_404_img.png'
    this.setData({
      dataList
    })
  },
  imgload(e) {
    let { slug } = e.currentTarget.dataset
    const skeletonVisibleMap = this.data.skeletonVisibleMap
    skeletonVisibleMap[slug] = false
    this.setData({
      skeletonVisibleMap
    })
  },
  // 页面的跳转
  nav_page(e) {
    let { slug } = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/articles/articles?id=' + slug
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