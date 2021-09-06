# 仓库简介
* 个人博客微信小程序
* 基于hexo生成的json数据
* 适用于所有的版本

![首页展示](https://cdn.jsdelivr.net/gh/Rr210/image@master/hexo/api/20210906211822.png)

## 部署方法

```html
npm install hexo-generator-restful-wx--save
```

* 使用方法看[这里](https://github.com/rr210/hexo-generator-restful-wx)

## 具体步骤

1. 在hexo`_config.yml`文件中加入以下配置

```yml
restful:
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
```

2. 具体`api`看[这里](https://github.com/rr210/hexo-generator-restful-wx)
