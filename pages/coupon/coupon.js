// pages/order/order.js
var qcloud = require('../../vendor/y-sdk/index');
var config = require('../../config')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		current: '1',
		current_scroll: '1',
		vouchers:[]
	},



	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.car(1)
	},
	handleChange({detail}) {
		var that = this
		this.setData({
			current: detail.key,
			vouchers:[]
		});
		console.log(this.data.current)
		that.car(this.data.current)

	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	car(types) {
		var that=this
		qcloud.request({
			url: config.user.getMyVouchers,
			method: 'GET',
			login: true,
			data: {
				userId: qcloud.session.get().userId,
				type: types
			},
			success(res) {
				
				that.setData({
					vouchers:res.data.vouchers
				})
				console.log(res.data.vouchers)
			}
		})
	},
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
