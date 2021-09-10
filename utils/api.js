/***
 * @Description: 网站的请求接口
 * @Author: Harry
 * @Date: 2021-09-04 17:12:07
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-09-10 13:00:48
 * @LastEditors: Harry
 */
import config from "../config/config";
let Domain = 'https://' + config.getDomain;  // 请求地址
module.exports = {
  // 获取文章的列表,参数介绍page
  getPostList(page) {
    return Domain + `/api/posts/${page}.json`;
  },
  // 获取轮播图文章
  getswiper() {
    return Domain + '/api/swiper.json'
  },
  // 获取指定的文章详情数据
  getArticleDetail(e){
    return Domain + `/api/articles/${e}.json`
  },
  // 获取列表数据
  getCategories(){
    return Domain + '/api/categories.json'
  },
  // 获取指定的分类列表信息
  getCateDetail(CategorieName){
    return Domain + `/api/categories/${CategorieName}.json`
  },
  getJsonSearch(){
    return Domain + '/api/search.json'
  }
}