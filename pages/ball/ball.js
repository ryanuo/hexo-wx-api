// index.js
const appInst = getApp();
const { Api, wxRequest } = appInst.globalData

Page({
  data: {
    tagEle: [], // 标签标题数据
    tagState: true, // 是否显示标签云
    countTime: null, // 计算定时器
    lastX: 0, // 坐标X
    lastY: 0, // 坐标Y
    direction: 310, // 初始化标签词云角度，默认左上角
    delay: 300, // 延迟时间
    speed: 15,
    time: 50, // S
    radius: 180
  },
  handletouchmove: function(event) {
    let currentX = event.touches[0].pageX // 获得X轴坐标
    let currentY = event.touches[0].pageY // 获得Y轴坐标
    let tx = currentX - this.data.lastX // 计算X轴偏差值
    let ty = currentY - this.data.lastY // 计算Y轴偏差值

    // 上下左右方向滑动
    if (tx === 0) { // 上下方向
      if (ty < 0) { // 上滑动
        this.data.direction = 360
      } else if (ty > 0) { // 下滑动
        this.data.direction = 180
      }
    } else if (ty === 0) { // 左右方向
      if (tx < 0) { // 左滑动
        this.data.direction = 270
      } else if (tx > 0) { // 右滑动
        this.data.direction = 90
      }
    } else if (tx < 0 && ty < 0) { // 左上滑动
      this.data.direction = 315
    } else if (tx < 0 && ty > 0) { // 左下滑动
      this.data.direction = 225
    } else if (tx > 0 && ty < 0) { // 右上滑动
      this.data.direction = 45
    } else if (tx > 0 && ty > 0) { // 右下滑动
      this.data.direction = 135
    }

    // 将当前坐标进行保存以进行下一次计算
    this.data.lastX = currentX
    this.data.lastY = currentY
  },
  handletouchstart: function(event) {
    this.data.lastX = event.touches[0].pageX // 获得触摸点X轴坐标
    this.data.lastY = event.touches[0].pageY // 获得触摸点Y轴坐标
  },
  // 初始化标签云特效
  initialize(data) {
    const that = this;
    const radius = this.data.radius;
    const tagEle = data;
    this.setData({
      tagEle: tagEle,
    });

    const countList = tagEle.map((_, i) => {
      const query = wx.createSelectorQuery();
      query.select(`#tag${i}`).boundingClientRect();
      query.exec((res) => {
        const { width, height } = res[0];
        const acos = Math.acos(-1 + (2 * i + 1) / tagEle.length);
        const sqrt = Math.sqrt((tagEle.length + 1) * Math.PI) * acos;
        const listItem = {
          offsetWidth: width,
          offsetHeight: height,
          left: radius * 1.5 * Math.cos(sqrt) * Math.sin(acos),
          top: radius * 1.5 * Math.sin(sqrt) * Math.sin(acos),
          z: radius * 1.5 * Math.cos(acos),
        };
        countList[i] = listItem;
      });
    });

    setTimeout(() => {
      that.countTime = setInterval(() => {
        this.calculation(tagEle, countList);
      }, that.data.time);
      this.setData({
        tagState: false,
      });
    }, that.data.delay);
  },


  // Style样式计算过程
  calculation(tagData, countData) {
    let countList = countData; // 计算结果数组
    const radius = this.data.radius; // 滚动区域范围，默认单位为px，数值越大滚动范围越大
    let fontsize = 14; // 字体大小，默认单位为px，后期转换rem。数值越大字体越大
    let depth = 2 * radius; // 滚动深度
    let ispeed = this.data.speed; // 滚动速度，数值越大滚动速度越快，不能小于2
    let direction = this.data.direction; // 滚动方向，取值角度(0-360): 0和360对应即从下到上, 90对应垂直X-Y, 180对应从上到下，其他数值随意测试...
    let directionX = ispeed * Math.sin(direction * Math.PI / 180); // 计算X轴Sin值
    let directionY = -ispeed * Math.cos(direction * Math.PI / 180); // 计算Y轴Cos值
    let a = -(Math.min(Math.max(-directionY, -radius), radius) / radius) * ispeed; // 计算a值用以后续判断计算
    let b = (Math.min(Math.max(-directionX, -radius), radius) / radius) * ispeed; // 计算b值用以后续判断计算
    let dtr = Math.PI / 180; // 计算圆周率
    let PIList = [ // 计算圆周率数组
      Math.sin(a * dtr),
      Math.cos(a * dtr),
      Math.sin(b * dtr),
      Math.cos(b * dtr)
    ];

    // 若ab值太小，即相关配置如速度/范围等太低，直接return不执行动效
    if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) { return; }

    // 循环遍历每个元素前面所计算出来的各值
    for (let j = 0; j < countList.length; j++) {
      let rz1 = countList[j].top * PIList[0] + countList[j].z * PIList[1]; // 计算前置数据
      let rz2 = rz1 * PIList[3] - countList[j].left * PIList[2]; // 计算前置数据
      let per = depth / (depth + rz2); // 计算前置数据

      countList[j].left = countList[j].left * PIList[3] + rz1 * PIList[2]; // 计算left用以后面计算赋值left
      countList[j].top = countList[j].top * PIList[1] + countList[j].z * (-PIList[0]); // 计算top用以后面计算赋值top
      countList[j].z = rz2; // 赋值计算列表中Z值新数据
      countList[j].fontsize = (per * 2 + fontsize) / 30; // 计算fontsize用以后续计算赋值font-size。注：最后除以30是用以后续rem单位计算，具体rem单位计算可参照官方计算。
      countList[j].alpha = 1.5 * per - 0.7; // 计算alpha用以后面计算赋值opacity
      countList[j].zIndex = Math.ceil(per * 10 - 5); // 计算zIndex用以后面计算赋值z-index
    }

    this.voluation(tagData, countList);
  },

  // Style样式赋值运算
  voluation(tagData, countData) {
    const tagEle = tagData
    const countList = countData
    let styleList = [] // 存储完整渲染列表的文字和样式结构
    for (let i = 0; i < countList.length; i++) {
      styleList.push({
        name: tagEle[i].name, // 标题文字内容
        left: countList[i].left + (500 - countList[i].offsetWidth) / 2 + "rpx",  // 500越大，则距离左边越远 
        top: countList[i].top + (450 - countList[i].offsetHeight) / 2 + "rpx", // 440越大，则距离上边越远
        zIndex: countList[i].zIndex, // z-index值
        opacity: countList[i].alpha,  // opacity值
        fontSize: countList[i].fontsize + "rem" // font-size值。注：不采用rpx值是因为在小程序最后会被改为四舍五入后的px值，不支持小数点单位，在放大缩小中不是很美观。于是采用转换rem值。
      })
    }
    this.setData({ // 赋值给到页面渲染
      tagEle: styleList
    })
  },
  getData: async function() {
    const res = await wxRequest.getRequest(Api.getCategories())
    if (res.statusCode == 200) {
      this.initialize(res.data) // 调用标签云特效
    }
  },
  onLoad: function() {
    this.getData()
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        avatarUrl: userInfo.avatarUrl
      })
    }
  },
  navTo(e) {
    let { name } = e.currentTarget.dataset
    if (name) {
      wx.navigateTo({
        url: `/pages/category/category?cateName=${name}`
      });
    }
  },

  onUnload() {
    clearInterval(this.countTime) // 清除计算定时器
    this.countTime = null // 清除计算定时器
  },
  // onStepChange(value) {
  //   clearInterval(this.countTime) // 清除计算定时器
  //   this.countTime = null // 清除计算定时器
  //   this.setData({ radius: value.detail });
  //   this.getData()
  // },
});
