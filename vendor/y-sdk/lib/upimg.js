var noop = function noop() { };
var upimg=function(options){
  console.log('upimg')
  var success = options.success || noop;
  var complete = options.complete || noop;
  // 成功回调
  var callSuccess = function () {
    success.apply(null, arguments);
    complete.apply(null, arguments);
  };

  // 失败回调
  var callFail = function (error) {
    fail.call(null, error);
    complete.call(null, error);
  };

  // 选择图片
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      // util.showBusy('正在上传')
      var filePath = res.tempFilePaths[0]

      // 上传图片
      wx.uploadFile({
        url: options.url,
        filePath: filePath,
        name: 'file',

        success: function (res) {
          // util.showSuccess('上传图片成功')
          // res = JSON.parse(res.data)
          console.log(res)
          // that.setData({
          //   goodImg: config.service.chost + '/' + res.data
          // })
          callSuccess.apply(null, arguments);
        },

        fail: function (e) {
          // util.showModel('上传图片失败')
        }
      })

    },
    fail: function (e) {
      console.error(e)
    }
  })
};

module.exports = upimg;