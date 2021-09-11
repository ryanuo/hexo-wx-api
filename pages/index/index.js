
const Api = require('../../utils/api.js');
const wxRequest = require('../../utils/wxRequest.js')
import config from '../../config/config.js'
var webSiteName = config.getWebsiteName;
// var domain = config.getDomain;
let topNav = config.getIndexNav;
let ad = config.getAd

Page({
  data: {
    postsList: [],  // 文章列表
    postsShowSwiperList: [],  //轮播i图列表
    isLastPage: false,
    page: 1, // 请求页数
    pageCounts: 0,  // 总的页数
    showerror: "none",  // 网络加载失败问题
    showallDisplay: "block",
    displaySwiper: "none",
    floatDisplay: "none",  // 底部文章的提示
    topNav: topNav,  // 导航栏配置
    webSiteName: webSiteName,  // 网站的名称
    isFirst: false, // 右上角,
    isLoading: false,
    isAd: ad,
    // 轮播
    indicatorDots: true, //是否显示圆点
    autoplay: true, //是否自动滚动
    interval: 3000, //轮播时间
    duration: 500,
    indicator_color: "rgba(217, 217, 217, 1)", //指示点颜色
    indicator_active_color: "#3F91F0", //指示点选中颜色
  },
  onShareAppMessage: function () {
    return {
      title: `你必须非常努力,才能看起来毫不费力."---${webSiteName}"`,
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onShareTimeline() {
  	return {
  		title: `你必须非常努力,才能看起来毫不费力."---${webSiteName}"`,
  		imageUrl: '../../static/images/logo-icon.png'
  	}
  },
  onPullDownRefresh: function () {
    let self = this;
    self.setData({
      isLoading: true,
      postsList: [],
      showerror: "none",
      showallDisplay: "block",
      displaySwiper: "none",
      floatDisplay: "none",
      isLastPage: false,
      page: 1,
      postsShowSwiperList: [],
      listAdsuccess: true
    });
    this.fetchTopFivePosts();
    this.fetchPostsData();
  },
  onReachBottom: function () {
    let self = this;
    if (!self.data.isLastPage && this.data.page < this.data.pageCounts) {
      self.setData({
        page: self.data.page + 1,
        isLoading: true
      });
      this.fetchPostsData();
    } else {
      self.setData({
        floatDisplay: 'block',
        isLoading: false,
        isLastPage: true,
        showerror: 'none'
      })
    }
  },
  onLoad: function (options) {
    let self = this;
    self.fetchTopFivePosts();
    self.fetchPostsData();
    self.setData({
      isFirst: true
    });
    // 打开小程序右上角提示
    setTimeout(function () {
      self.setData({
        isFirst: false
      });
    }, 5000)
  },
  fetchTopFivePosts: function () {
    let self = this;
    //获取滑动图片的文章
    wxRequest.getRequest(Api.getswiper())
      .then(response => {
        // console.log(response);
        if (response.statusCode == '200' && response.data.length > 0) {
          self.setData({
            displaySwiper: 'block',
            postsShowSwiperList: response.data
          })
        } else {
          self.setData({
            displaySwiper: "none"
          });
        }
      }).catch(function (response) {
        // console.log(response);
        self.setData({
          showerror: "block",
          floatDisplay: "none"
        });
      }).final(function () { });;
  },
  // 跳转至查看小程序列表页面或文章详情页
  redictAppDetail: function (e) {
    // console.log(e);
    let { url } = e.currentTarget.dataset
    if (url) {
      wx.navigateTo({
        url: `/pages/articles/articles?id=${url}`,
        success: (result) => {

        },
        fail: () => { },
        complete: () => { }
      });
    }
  },
  // 获取文章的数据信息
  fetchPostsData(e) {
    let page = this.data.page
    // 请求数据
    wxRequest.getRequest(Api.getPostList(page))
      .then(res => {
        // console.log(res);
        if (res.statusCode == 200) {
          this.setData({
            pageCounts: res.data.pageCount,
            postsList: [...this.data.postsList, ...res.data.data]
          })
        } else {
          console.log('最后一页');
        }
      })
      .catch(res => {
        console.log(res);
      })
      .final(res => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        this.setData({
          isLoading: false,
          op: 1
        })
      });
  },
  // 图片加载失败后问题
  errorImg(e) {
    let { index } = e.currentTarget.dataset
    let errlist = this.data.postsList
    errlist[index].cover = '/static/images/default_404_img.png'
    this.setData({
      postsList: errlist
    })
  },

  // },
  // //首页图标跳转
  // onNavRedirect: function (e) {
  //   var redicttype = e.currentTarget.dataset.redicttype;
  //   var url = e.currentTarget.dataset.url == null ? '' : e.currentTarget.dataset.url;
  //   var appid = e.currentTarget.dataset.appid == null ? '' : e.currentTarget.dataset.appid;
  //   var extraData = e.currentTarget.dataset.extraData == null ? '' : e.currentTarget.dataset.extraData;
  //   if (redicttype == 'apppage') { //跳转到小程序内部页面         
  //     wx.navigateTo({
  //       url: url
  //     })
  //   } else if (redicttype == 'webpage') //跳转到web-view内嵌的页面
  //   {
  //     url = '../webpage/webpage?url=' + url;
  //     wx.navigateTo({
  //       url: url
  //     })
  //   } else if (redicttype == 'miniapp') //跳转到其他app
  //   {
  //     wx.navigateToMiniProgram({
  //       appId: appid,
  //       envVersion: 'release',
  //       path: url,
  //       extraData: extraData,
  //       success(res) {
  //         // 打开成功
  //       },
  //       fail: function (res) {
  //         console.log(res);
  //       }
  //     })
  //   }

  // }
})