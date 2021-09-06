/***
 * @Description: 请求网络
 * @Author: Harry
 * @Date: 2021-09-04 18:31:45
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-09-05 16:48:46
 * @LastEditors: Harry
 */

function wxPromisify(fn) {
    return function (obj = {}) {
        return new Promise((resolve, reject) => {
            obj.success = function (res) {
                //成功
                wx.hideNavigationBarLoading()
                resolve(res)        
            }
            obj.fail = function (res) {
                //失败
                reject(res)
                wx.hideNavigationBarLoading()
                console.log(res)
            }
            fn(obj)
        })
    }
}
//无论promise对象最后状态如何都会执行
Promise.prototype.final = function (callback) {
    let P = this.constructor;
    wx.hideNavigationBarLoading()
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
    );
};
/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url, data) {
    let getRequest = wxPromisify(wx.request);
    wx.showNavigationBarLoading()
    return getRequest({
        url: url,
        method: 'GET',
        data: data,
        header: {
            'Content-Type': 'application/json'
        }
    })
}

/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, data) {
    let postRequest = wxPromisify(wx.request)
    wx.showNavigationBarLoading()
    return postRequest({
        url: url,
        method: 'POST',
        data: data,
        header: {
            "content-type": "application/json"
        },
    })
}

module.exports = {
    postRequest,getRequest
}