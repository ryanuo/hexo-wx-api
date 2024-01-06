// components/toggleBall/toggleBall.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      default: 'old'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleBall() {
      let type = this.properties.type;
      if (type === 'old') {
        wx.navigateTo({
          url: `/pages/list/list`
        });
      } else {
        wx.switchTab({
          url: `/pages/ball/ball`
        });
      }
    },
  }
})