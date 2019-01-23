// pages/orderDetail/orderDetail.js
var qcloud = require('../../vendor/y-sdk/index');
var config = require('../../config')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		orderdetail:null,
		imgurl:config.imgurl
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		console.log(options)
		var that=this
		qcloud.request({
			url: config.mall.getOrder,
			method: 'GET',
			data: {
				orderId:options.id
			},
			success(res) {
				var resdata = res.data
				console.log(resdata)
				that.setData({
					orderdetail:res.data.order
				})
				// console.log('request success', resdata.msg);
			},
			fail(error) {
				console.log('request fail', error);
			},
			complete() {
				// console.log('request complete');
			}
		});
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
