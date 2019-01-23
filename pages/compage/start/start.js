// pages/comPage/start/start.js
var qcloud = require('../../../vendor/y-sdk/index');
var config = require('../../../config')
var util = require('../../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logged:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo'] && options.userId) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          // util.showBusy('正在登录');
          wx.getUserInfo({
            success: function (res) {
              console.log('onLoad',res)
              var options = {
                encryptedData: res.encryptedData,
                iv: res.iv,
                userInfo: res.userInfo
              }
              that.doLogin(options);
              var loginParams = {
                // code: loginResult.code,
                encryptedData: res.encryptedData,
                iv: res.iv,
                userInfo: res.userInfo,
                userId: options.userId
              }
              qcloud.requestLogin({
                loginParams,
                data: loginParams,
                success(res) {
                  console.log('login success', res)
                  // util.showSuccess('登录成功');
                  that.setData({
                    userInfo: options.userInfo,
                    logged: true
                  })
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 3000,
                    complete: function () {
                      wx.reLaunch({
                        url: '/pages/home/home?ystate=1'
                      })
                    }
                  })



                },
                fail(error) {
                  util.showModel('登录失败', error)
                  console.log('登录失败', error)
                }
              });
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    console.log('22',e)
    if (this.data.logged) return;

    // util.showBusy('正在登录');

    var that = this;
    var userInfo = e.detail.userInfo;
    app.globalData.userInfo = e.detail.userInfo;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {

          // 检查登录是否过期
          // wx.checkSession({
          //   success: function () {
          //     // 登录态未过期
          //     util.showSuccess('登录成功');
          //     console.log('checkSession',app.globalData.userInfo)
          //     that.setData({
          //       userInfo: userInfo,
          //       logged: true
          //     })
          //     // wx.reLaunch({
          //     //   url: '/pages/mall/mall'
          //     // })

          //   },

          //   fail: function () {
          //     qcloud.clearSession();
          //     // 登录态已过期，需重新登录
          //     var options = {
          //       encryptedData: e.detail.encryptedData,
          //       iv: e.detail.iv,
          //       userInfo: userInfo
          //     }
          //     that.doLogin(options);
          //   },
          // });
          var options = {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            userInfo: userInfo
          }
          that.doLogin(options);
        } else {
          util.showModel('用户未授权');
        }
      }
    });


  },
  doLogin: function (options) {
    var that = this;

    wx.login({
      success: function (loginResult) {
        var loginParams = {
          code: loginResult.code,
          encryptedData: options.encryptedData ? options.encryptedData:'',
          iv: options.iv ? options.iv:'',
          userInfo: options.userInfo,
        }
        qcloud.requestLogin({
          loginParams,
          data: loginParams,
          success(res) {
            console.log('login success',res)
            // util.showSuccess('登录成功');
            that.setData({
              userInfo: options.userInfo,
              logged: true
            })
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 3000,
              complete: function () {
                wx.reLaunch({
                  url: '/pages/home/home?ystate=1'
                })
              }
            })
           
           

          },
          fail(error) {
            util.showModel('登录失败', error)
            console.log('登录失败', error)
          }
        });
      },
      fail: function (loginError) {
        util.showModel('登录失败', loginError)
        console.log('登录失败', loginError)
      },
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})