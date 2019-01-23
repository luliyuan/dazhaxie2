// pages/my/my.js
var qcloud = require('../../vendor/y-sdk/index');
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		jifen:"",
		number:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},
	navigateTo(e) {
		var naurl = e.currentTarget.dataset.index
		if (naurl == 2) {
			wx.navigateTo({
				url: '/pages/coupon/coupon'
			})
		}

	},
	toorder() {
		wx.navigateTo({
			url: '/pages/order/order'
		})
	},
	toabout(){
		wx.navigateTo({
			url: '/pages/about/about'
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		var that=this
		qcloud.request({
			url: config.user.getUserInfo,
			method: 'GET',
			data: {
				
			},
			success(res) {
				var resdata = res.data
				console.log(resdata)
					that.setData({
						jifen:resdata.userInfo.balance,
						number:resdata.userInfo.uuid
						
					})
			},
			fail(error) {
				console.log('request fail', error);
			},
			complete() {
				console.log('request saveUserName complete');
			}

		})
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {
		console.log("121212")
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
