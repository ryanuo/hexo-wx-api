
const Api = require('../../utils/api.js');
const wxRequest = require('../../utils/wxRequest.js')
import config from '../../config/config.js'
var webSiteName = config.getWebsiteName;
// var domain = config.getDomain;
let topNav = config.getIndexNav;

Page({
  data: {
    postsList: [],  // 文章列表
    postsShowSwiperList: [],  //轮播i图列表
    isLastPage: false,
    page: 1, // 请求页数
    pageCounts: 0,  // 总的页数
    // search: '',
    // categories: 0,
    showerror: "none",  // 网络加载失败问题
    // showCategoryName: "",
    // categoryName: "",
    showallDisplay: "block",
    // displayHeader: "none",
    displaySwiper: "none",
    floatDisplay: "none",  // 底部文章的提示
    // displayfirstSwiper: "none",
    topNav: topNav,  // 导航栏配置
    // listAdsuccess: true,
    webSiteName: webSiteName,  // 网站的名称
    // domain: domain,
    isFirst: false, // 右上角,
    isLoading: false,
    // 轮播
    indicatorDots: true, //是否显示圆点
    autoplay: true, //是否自动滚动
    interval: 3000, //轮播时间
    duration: 500,
    indicator_color: "rgba(217, 217, 217, 1)", //指示点颜色
    indicator_active_color: "#3F91F0", //指示点选中颜色
  },
  // formSubmit: function (e) {
  //   var url = '../list/list'
  //   var key = '';
  //   if (e.currentTarget.id == "search-input") {
  //     key = e.detail.value;
  //   } else {

  //     key = e.detail.value.input;

  //   }
  //   if (key != '') {
  //     url = url + '?search=' + key;
  //     wx.navigateTo({
  //       url: url
  //     })
  //   } else {
  //     wx.showModal({
  //       title: '提示',
  //       content: '请输入内容',
  //       showCancel: false,
  //     });
  //   }
  // },
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
  // onShow: function (options) {
  //   wx.setStorageSync('openLinkCount', 0);

  //   var nowDate = new Date();
  //   nowDate = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
  //   nowDate = new Date(nowDate).getTime();
  //   var _openAdLogs = wx.getStorageSync('openAdLogs') || [];
  //   var openAdLogs = [];
  //   _openAdLogs.map(function (log) {
  //     if (new Date(log["date"]).getTime() >= nowDate) {
  //       openAdLogs.unshift(log);
  //     }

  //   })

  //   wx.setStorageSync('openAdLogs', openAdLogs);
  //   console.log(wx.getStorageSync('openAdLogs'));

  // },
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

  // //获取文章列表数据
  // fetchPostsData: function (data) {
  //   var self = this;
  //   if (!data) data = {};
  //   if (!data.page) data.page = 1;
  //   if (!data.categories) data.categories = 0;
  //   if (!data.search) data.search = '';
  //   if (data.page === 1) {
  //     self.setData({
  //       postsList: []
  //     });
  //   };
  //   self.setData({
  //     isLoading: true
  //   })
  //   var getCategoriesRequest = wxRequest.getRequest(Api.getCategoriesIds());
  //   getCategoriesRequest.then(res => {
  //     if (!res.data.Ids == "") {
  //       data.categories = res.data.Ids;
  //       self.setData({
  //         categories: res.data.Ids
  //       })

  //     }

  //     var getPostsRequest = wxRequest.getRequest(Api.getPosts(data));
  //     getPostsRequest
  //       .then(response => {
  //         if (response.statusCode === 200) {
  //           if (response.data.length) {
  //             if (response.data.length < pageCount) {
  //               self.setData({
  //                 isLastPage: true,
  //                 isLoading: false
  //               });
  //             }
  //             self.setData({
  //               floatDisplay: "block",
  //               postsList: self.data.postsList.concat(response.data.map(function (item) {

  //                 var strdate = item.date
  //                 if (item.category_name != null) {

  //                   item.categoryImage = "../../images/category.png";
  //                 } else {
  //                   item.categoryImage = "";
  //                 }

  //                 if (item.post_medium_image == null || item.post_medium_image == '') {
  //                   item.post_medium_image = "../../images/logo700.png";
  //                 }
  //                 item.date = util.cutstr(strdate, 10, 1);
  //                 return item;
  //               })),
  //             });    

  //           } else {
  //             if (response.data.code == "rest_post_invalid_page_number") {
  //               self.setData({
  //                 isLastPage: true,
  //                 isLoading: false
  //               });
  //               wx.showToast({
  //                 title: '没有更多内容',
  //                 mask: false,
  //                 duration: 1500
  //               });

  //             } else {
  //               wx.showToast({
  //                 title: response.data.message,
  //                 duration: 1500
  //               })
  //             }
  //           }
  //         }
  //       })
  //       .catch(function (response) {
  //         if (data.page == 1) {

  //           self.setData({
  //             showerror: "block",
  //             floatDisplay: "none"
  //           });

  //         } else {
  //           wx.showModal({
  //             title: '加载失败',
  //             content: '加载数据失败,请重试.',
  //             showCancel: false,
  //           });
  //           self.setData({
  //             page: data.page - 1
  //           });
  //         }

  //       })
  //       .final(function (response) {
  //         wx.hideLoading();
  //         self.setData({
  //           isLoading: false
  //         })
  //         wx.stopPullDownRefresh();
  //         self.setData({
  //           op: 1,
  //           mr: 56
  //         })
  //       });

  //   })


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

  // },

  // //返回首页
  // redictHome: function (e) {
  //   //console.log('查看某类别下的文章');  
  //   var id = e.currentTarget.dataset.id,
  //     url = '/pages/index/index';
  //   wx.switchTab({
  //     url: url
  //   });
  // },
  // adbinderror: function (e) {
  //   var self = this;
  //   console.log(e.detail.errCode);
  //   console.log(e.detail.errMsg);
  //   if (e.detail.errCode) {
  //     self.setData({
  //       listAdsuccess: false
  //     })
  //   }

  // },
  // about: function () {
  //   // wx.navigateTo({
  //   //   url='../about/about'
  //   // })
  //   console.log(44555)
  // }
})