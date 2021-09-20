/***
 * @Description: 
 * @Author: Harry
 * @Date: 2021-09-04 16:22:00
 * @Url: https://u.mr90.top
 * @LastEditTime: 2021-09-20 08:41:12
 * @LastEditors: Harry
 */
// app.js
const Api = require('./utils/api.js');
const wxRequest = require('./utils/wxRequest.js')
import config from './config/config.js'
App({
  onLaunch() {

  },
  globalData: {
    userInfo: null,
    Api, wxRequest, config
  }
})
