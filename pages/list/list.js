// pages/list/list.js
const Api = require('../../utils/api.js');
const wxRequest = require('../../utils/wxRequest.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listCates: [],
    page: 1,
    pageCount: 0,
    currentList: [],
    padd: 120,  //星球间距
    numc: 5, // 控制单个页面星球的数量
    speed: 9, // 旋转的速度
    ballsize: 70, // 初始化小球的大小
    roratedelay: 5, // 旋转进入页面的延迟倍数
    isabout: false, // 控制关于页面的显示与隐藏
    isclickimg: false, // 控制全部分类列表的显示与隐藏
    isflag: false, // 判断用户是否点击了头像框
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlistcates()
  },
  // 请求分类的列表
  getlistcates() {
    wxRequest.getRequest(Api.getCategories())
      .then(res => {
        if (res.statusCode == 200) {
          this.setData({
            pageCount: Math.ceil(res.data.length / this.data.numc),
            listCates: res.data
          })
          this.getsliceList(this.data.page)
        }
      })
  },
  // 请求当前页面列表
  getsliceList(page) {
    let news = [...this.data.listCates]
    if (news.length !== 0) {
      let currentList = news.splice((page - 1) * this.data.numc, this.data.numc)
      this.setData({
        currentList
      })
    }
  },
  flag: false,
  // 上下页面切换
  next() {
    if (this.flag) return
    setTimeout(() => {
      if (this.data.page < this.data.pageCount) {
        let page = ++this.data.page;
        this.setData({
          page
        })
        this.getsliceList(page)
      } else {
        wx.showToast({
          title: '已到达最后一页',
          icon: 'none',
          duration: 1500
        });
      }
      this.flag = false
    }, 300)
    this.flag = true
  },
  pre() {
    if (this.flag) return
    setTimeout(() => {
      if (this.data.page > 1) {
        let page = --this.data.page;
        this.setData({
          page
        })
        this.getsliceList(page)
      } else {
        wx.showToast({
          title: '当前页面为第一页',
          icon: 'none',
          duration: 1500
        });
      }
      this.flag = false
    }, 500)
    this.flag = true
  },
  // 分类详情页面的跳转
  navTo(e) {
    let { name } = e.currentTarget.dataset
    if (name) {
      wx.navigateTo({
        url: `/pages/category/category?cateName=${name}`
      });
    }
  },
  // 关于页面的弹窗
  remindModuel() {
    this.setData({
      isabout: !this.data.isabout
    })
  },
  // 点击头像的事件
  clickImg() {
    this.setData({
      isclickimg: !this.data.isclickimg,
      isflag: true
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