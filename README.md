[toc]

# 仓库简介

![GitHub last commit](https://img.shields.io/github/last-commit/rr210/hexo-wx-api?color=blue&logo=github&style=plastic) ![GitHub all releases](https://img.shields.io/github/downloads/rr210/hexo-wx-api/total?logo=github)  [![npm](https://img.shields.io/npm/v/hexo-generator-wxapi?color=green&logo=npm)](https://www.npmjs.com/package/hexo-generator-wxapi)

* 个人博客微信小程序
* 配置hexo插件生成json数据接口
* 适用于hexo的各类主题版本

## 已上线小程序--搜索 `[今日在学c]`

<div align="center">
<img src="https://cdn.jsdelivr.net/gh/Rr210/image@master/hexo/api/gh_7726a019ff90_258.jpg" width="150" height="150">
<div>一起学习可好? 扫码关注, 了解更多!!</div>
</div>

<div align="center">
<img src="https://cdn.jsdelivr.net/gh/Rr210/image@master/hexo/api/20210906211822.png" width="220"><img src="https://cdn.jsdelivr.net/gh/Rr210/image@master/hexo/api/20210907223503.png" width="220"><img src="https://cdn.jsdelivr.net/gh/Rr210/image@master/hexo/api/20210908205236.png" width="220"><img src="https://cdn.jsdelivr.net/gh/Rr210/image@master/hexo/api/20210908205352.png" width="220">
</div>

## 部署方法

```html
npm install hexo-generator-wxapi --save
```

* 使用方法看[这里](https://github.com/rr210/hexo-generator-wxapi)

## 具体步骤(接口配置)

1. 在hexo`_config.yml`文件中加入以下配置 必须配置

```yaml
restful_api:
  # site 可配置为数组选择性生成某些属性
  # site: ['title', 'subtitle', 'description', 'author', 'since', email', 'favicon', 'avatar']
  site: true        # hexo.config mix theme.config
  posts_size: 10    # 文章列表分页，0 表示不分页
  posts_props:      # 文章列表项的需要生成的属性
    title: true
    slug: true
    date: true
    updated: true
    comments: true
    path: true
    excerpt: false
    cover: true      # 封面图，取文章第一张图片
    content: false
    keywords: false
    categories: true
    tags: true
  categories: true         # 分类数据
  use_category_slug: false # Use slug for filename of category data
  tags: true               # 标签数据
  use_tag_slug: false      # Use slug for filename of tag data
  post: true               # 文章数据
  pages: false            # 额外的 Hexo 页面数据, 如 About
  swipers_list: []          # 生成指定的页面信息,做指定的轮播文章展示
  search_all:                  #  配置全局搜索
    path: '/api/search.json'  
    field: 'post'
    content: true
```

## 部署成功

* 配置微信小程序
* 找到config文件下的`config.js`进行配置, 如下

```JS
//配置域名,域名只修改此处。可以配置为根域名 u.mr90.top/blog
const DOMAIN = "u.mr90.top";
const WEBSITENAME = "Harryの心阁"; //网站名称
const ZANIMAGEURL = '../../static/images/zanshang.jpg'; //微信鼓励的图片链接，用于个人小程序的赞赏
const LOGO = "../../static/images/logo-icon.png"; // 网站的logo图片
//首页图标导航
//参数说明：'name'为名称，'image'为图标路径，'url'为跳转的页面，'redirecttype'为跳转的类型，apppage为本小程序的页面，miniapp为其他微信小程序,webpage为web-view的页面
//redirecttype 是 miniapp 就是跳转其他小程序  url 为其他小程序的页面
//redirecttype 为 apppage 就是跳转本小程序的页面，url为本小程序的页面路径
//'appid' 当redirecttype为miniapp时，这个值为其他微信小程序的appid，如果redirecttype为apppage，webpage时，这个值设置为空。
//'extraData'当redirecttype为miniapp时，这个值为提交到其他微信小程序的参数，如果redirecttype为apppage，webpage时，这个值设置为空。

// 注意: 如果只是跳转微信小程序内部界面 无需修改以下内容
const INDEXNAV = [{
    id: '1',
    name: '热门排行',
    image: '../../static/icon/index/1.png',
    url: '../hot/hot',
    redirecttype: 'apppage',
    appid: '',
    extraData: ''
  }
  // ...........
];
```

* 样式的配置在全局文件`app.wxss`文件中
