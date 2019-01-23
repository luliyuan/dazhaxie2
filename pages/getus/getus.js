// pages/homeDetail/homeDetail.js
var qcloud = require('../../vendor/y-sdk/index');
var config = require('../../config')
var util = require('../../utils/util.js')
var WxParse = require('../../vendor/wxParse/wxParse.js');
var app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgurl: config.imgurl,
		aHrefHrefData: '',
		goodsid: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		console.log(options)
		var that = this
		qcloud.request({
			url: config.home.getUs,
			method: 'GET',
			data: {			
				type: options.type
			},
			success(res) {
				var resdata = res.data
				console.log(resdata)
				that.setData({

					aHrefHrefData: res.data.us,

				}, () => {
					WxParse.wxParse('aHrefHrefData', 'html', that.data.aHrefHrefData, that);
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
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

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

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
