// pages/enjoy/enjoy.js
var qcloud = require('../../vendor/y-sdk/index');
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		enjoyList: [],
		onpage: 1,
		totalPage: 1,
		imgurl: config.imgurl,
		jifen: "",
		number: '',
		gongzhong: true,
		imgurl:config.imgurl,
		jifenimg:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		/* wx.getUserInfo({
		  success(res) {
			  console.log('fddsdfdf')
			console.log(res)
		  }
		}) */
		var that = this
		that.setData({
			gongzhong: true
		})
		setTimeout(function() {
			that.setData({
				gongzhong: false
			})
		}, 5000)


	},
	closegong() {
		this.setData({
			gongzhong: false
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},
	duihuan(e) {
		console.log(e.currentTarget.dataset)
		 wx.navigateTo({
			url: '/pages/details/details?id=' + e.currentTarget.dataset.id + '&enjoy=' + true
		}) 
		
		

	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	getEnjoy: function(page = 1, size = 4) {
		var that = this
		qcloud.request({
			url: config.enjoy.getIntegralGoods,
			method: 'GET',
			data: {
				page: page,
				size: size,
				merchantsId: wx.getStorageSync('merchantsId')
			},
			success(res) {
				var resdata = res.data
				console.log(res.res)

				if (resdata.msg == 0) {
					if (page == 1) {
						var plist = []
					} else {
						var plist = that.data.enjoyList
					}
					that.setData({
						enjoyList: plist.concat(resdata.goods.list),
						onpage: page,
						totalPage: resdata.goods.totalPage
					})
				}
			},
			fail(error) {
				console.log('request fail', error);
			},
			complete() {
				console.log('request saveUserName complete');
			}
		});
	},
	jzcc: function(e) {
		console.log("jzcc", e)
	},
	onShow: function() {
		var that = this
		if (app.globalData.gong) {
			that.setData({
				gongzhong: true
			})
			setTimeout(function() {
				that.setData({
					gongzhong: false
				})
			}, 10000)
			app.globalData.gong = false
		}

		/* var that = this
		that.setData({
			gongzhong: true
		})
		setTimeout(function() {
			that.setData({
				gongzhong: false
			})
		}, 5000)
 */

		this.getEnjoy()


		var that = this
		qcloud.request({
			url: config.user.getUserInfo,
			method: 'GET',
			data: {

			},
			success(res) {
				var resdata = res.data
				console.log(resdata)
				that.setData({
					jifen: resdata.userInfo.balance,
					number: resdata.userInfo.uuid
				})


				/* wx.request({
					url:'https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid='+resdata.userInfo.openId,
					method: 'GET',
					data:{
						
					},
					success(res){
						console.log(res)
					}
				}) */

			},
			fail(error) {
				console.log('request fail', error);
			},
			complete() {
				console.log('request saveUserName complete');
			}

		})



		/* 积分 */
		qcloud.request({
					url: config.enjoy.getjifen,
					method: 'GET',
					data: {
		
					},
					success(res) {
						console.log(res)
						that.setData({
							jifenimg:res.data.us.imgPath
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
	jifeninfo(){
		wx.navigateTo({
			url:'/pages/enjoyInfo/enjoyInfo'
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
		/* this.getEnjoy()
		wx.stopPullDownRefresh() */
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {
		if (this.data.onpage < this.data.totalPage) {
			/* console.log("到底了")
			console.log(this.data.totalPage)
			console.log("当前页数", this.data.onpage + 1) */
			this.getEnjoy(this.data.onpage + 1)
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
