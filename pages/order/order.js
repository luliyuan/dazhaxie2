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
		order: [],
		onpage: 1,
		totalPage: 1,
		imgurl: config.imgurl,
		pay: false,
		enjoypay:false

	},
	orerinfo(e) {
		console.log(e.currentTarget.dataset.id)
		wx.navigateTo({
			url: '/pages/orderDetail/orderDetail?id=' + e.currentTarget.dataset.id
		})
	},
	handleChange({
		detail
	}) {
		var that = this
		this.setData({
			current: detail.key,
			order: []
		}, () => {
			that.order()
		});
		console.log(this.data.current)
	},
	tohome() {
		console.log("12")
		wx.switchTab({
			url: '/pages/home/home'
		})
	},

	order(page = 1, size = 8) {
		var that = this
		qcloud.request({
			url: config.mall.getMyOrder,
			method: 'GET',
			data: {
				page: page,
				size: size,
				type: that.data.current
			},
			success(res) {
				/* setTimeout(function() {
					wx.hideLoading()
				}, 2000) */
				var resdata = res.data
				if (resdata.msg == 0) {

					if (page == 1) {
						var pList = [];
					} else {
						var pList = that.data.order;
					}
					that.setData({
						order: pList.concat(resdata.orderList.list),
						onpage: page,
						totalPage: resdata.orderList.totalPage
					})

				}
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
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		console.log(options)
		if (options.pay) {
			this.setData({
				pay: true
			})
		}
		 if(options.enjoypay){
			this.setData({
				enjoypay:true
			})
		} 

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
		this.order()
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
		if(this.data.pay==true){
			wx.switchTab({
				url: '/pages/cart/cart'
			})
		}
		if(this.data.enjoypay==true){
			console.log("enjoypaytt")
			wx.switchTab({
				url: '/pages/enjoy/enjoy'
			})
		}
		
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
		var that = this;
		if (that.data.onpage < that.data.totalPage) {
			that.order(that.data.onpage + 1)
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
