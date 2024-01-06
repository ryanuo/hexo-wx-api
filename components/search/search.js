/***
 * @Description: 搜索组件封装
 * @Author: Harry
 * @Date: 2021-09-04 16:53:50
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-09-20 08:52:42
 * @LastEditors: Harry
 */
// components/search/search.js\
const appInst = getApp();
const { Api, wxRequest } = appInst.globalData
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    classStyle: false,
    allData: [],
    res_list: [],
    key: '',
    history_list: []
  },
  // 进入页面就开始本地的请求
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {
      console.log(1)
      if (wx.getStorageSync('history_list')) {
        this.setData({
          history_list: wx.getStorageSync('history_list')
        })
      }
      this.getJsonData()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    Nav_a(e) {
      let { con } = e.currentTarget.dataset
      let data = ''
      switch (con) {
        case "1":
          data = 'https://github.com/Rr210/hexo-wx-api'
          break;
        case "2":
          data = 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
      }
      // 设置剪切板的内容
      wx.setClipboardData({ data })
    },
    // 关键词切割
    getInf(str, key) {
      return str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%')
    },
    onSearchkey(e) {
      const value = e.detail.trim();

      if (value.length === 0) {
        this.setData({
          res_list: [],
          key: value,
        });
        return;
      }

      const res_list = this.data.allData
        .filter(v => new RegExp(`(${value})`, "i").test(JSON.stringify(v)))
        .map(v => {
          let c = v.content;
          let t = v.title;

          if (c) {
            const i = v.content.indexOf(value);
            const start = Math.max(i - 30, 0);
            const end = Math.min(i + 50, v.content.length);
            const matchContent = v.content.substring(start, end).replace(/\n/g, '');
            c = this.getInf(matchContent, value);
          }

          if (t) {
            t = this.getInf(t, value);
          }


          return { "title": t, "content": c, "slug": v.slug };
        });

      this.setData({
        res_list,
        key: value.trim(),
      });
    },
    // 获取json数据
    getJsonData() {
      wxRequest.getRequest(Api.getJsonSearch())
        .then(res => {
          this.setData({
            allData: res.data
          })
        })
    },
    search_key(e) {
      let value = e.currentTarget.dataset.key;
      this.onSearchkey({ detail: value })
    },
    // 页面的跳转
    nav_page(e) {
      // 将当前历史搜索设置到历史列表，并且判断如果存在就不设置，并且超过20条就删除最早一条
      let { key } = this.data;
      if (this.data.history_list.indexOf(key) === -1) {
        if (this.data.history_list.length >= 20) {
          this.data.history_list.shift();
        }
        this.data.history_list.push(key);
        this.setData({
          history_list: this.data.history_list
        });
        wx.setStorageSync('history_list', this.data.history_list);
      }

      let { slug } = e.currentTarget.dataset
      wx.navigateTo({
        url: '/pages/articles/articles?id=' + slug
      });
    },
    // 清空历史记录，清空本地的历史记录
    clearAllHistory() {
      wx.showModal({
        title: '提示',
        content: '确定要清空历史记录吗？',
        success: (res) => {
          if (res.confirm) {
            this.setData({
              history_list: []
            });
            wx.setStorageSync('history_list', this.data.history_list);
          }
        }
      });
    },
  },
})
