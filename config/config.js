/***
 * @Description: 主要的配置文件
 * @Author: Harry
 * @Date: 2021-09-04 17:01:59
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-09-11 20:06:49
 * @LastEditors: Harry
 */


//配置域名,域名只修改此处。可以配置为根域名 u.mr90.top/blog
const DOMAIN = "m.ziliao88.top";
const WEBSITENAME = "Harryの心阁"; //网站名称
const ZANIMAGEURL = '../../static/images/zanshang.jpg'; //微信鼓励的图片链接，用于个人小程序的赞赏
const LOGO = "../../static/images/logo-icon.png"; // 网站的logo图片
const ARTICLE_AUTHOR_NAME = "Harry" // 文章作者的名称
const ARTICLE_AUTHOR_img = "../../static/images/author.jpg" // 文章作者的头像,这里是相对于文章页的地址
//首页图标导航
//参数说明：'name'为名称，'image'为图标路径，'url'为跳转的页面，'redirecttype'为跳转的类型，apppage为本小程序的页面，miniapp为其他微信小程序,webpage为web-view的页面
//redirecttype 是 miniapp 就是跳转其他小程序  url 为其他小程序的页面
//redirecttype 为 apppage 就是跳转本小程序的页面，url为本小程序的页面路径
//'appid' 当redirecttype为miniapp时，这个值为其他微信小程序的appid，如果redirecttype为apppage，webpage时，这个值设置为空。
//'extraData'当redirecttype为miniapp时，这个值为提交到其他微信小程序的参数，如果redirecttype为apppage，webpage时，这个值设置为空。
const ISAD = {
  "enable": true,
  "bannerId": 'adunit-c9dae21126085de9'
};  // 是否开启广告

const INDEXNAV = [{
  id: '1',
  name: '热门排行',
  image: '../../static/icon/index/1.png',
  url: '../hot/hot',
  redirecttype: 'apppage',
  appid: '',
  extraData: ''
},
{
  id: '5',
  name: '搜索文章',
  image: '../../static/icon/index/2.png',
  url: '../discuss/discuss',
  redirecttype: 'apppage',
  appid: '',
  extraData: ''
},
{
  id: '7',
  name: '问答讨论',
  image: '../../static/icon/index/3.png',
  url: '../feng/feng',
  redirecttype: 'apppage',
  appid: '',
  extraData: ''
},
{
  id: '10',
  name: '关于我们',
  image: '../../static/icon/index/4.png',
  url: '../about/about',
  redirecttype: 'apppage',
  appid: '',
  extraData: ''
}
];




export default {
  getDomain: DOMAIN,
  getWebsiteName: WEBSITENAME,
  getIndexNav: INDEXNAV,
  getZanImageUrl: ZANIMAGEURL,
  getLogo: LOGO,
  getAuthorname: ARTICLE_AUTHOR_NAME,
  getAuthorImg: ARTICLE_AUTHOR_img,
  getAd: ISAD
}