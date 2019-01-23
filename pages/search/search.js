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
		hotSerch: [],
		HistoryList: [],
		value: "",
		resultshow: true,
		searchList: [],
		onpage: 1,
		totalPage: 1,
		imgurl:config.imgurl,
		clearIcon:false,
		isshowlist:false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

		// 				if (localStorage.HistoryList) {
		// 							this.HistoryList = JSON.parse(localStorage.HistoryList)
		// 						}
		// 			
		// 						console.log(this.HistoryList)

		if (wx.getStorageSync('HistoryList')) {
			this.setData({
				HistoryList: JSON.parse(wx.getStorageSync('HistoryList'))
			});
		}
	},
	/* input数据 */
	inputeidt(e) {
		if (e.detail.value.length < 1) {
			this.setData({
				value: '',
			})
		} else {
			this.setData({
				value: e.detail.value,
				clearIcon:true
			})
		}
	},
	goodsinfo:function(e){
		console.log(e.currentTarget.dataset)
		if (e.currentTarget.dataset.statename==1) {
			wx.navigateTo({
				url:'/pages/details/details?id='+e.currentTarget.dataset.id
			})
		}else{
			/* wx.showToast({
				title: "商品已下架"
			}) */
		}
		
	},
	addcart:function(e){
		var that = this
		if (e.currentTarget.dataset.statename) {
			qcloud.request({
				url: config.mall.shoppingCartAdd,
				method: 'GET',
				data: {
					goodsId: e.currentTarget.dataset.id,
					merchantsId: wx.getStorageSync('merchantsId'),
					goodsNumber: 1,
					state: 0,
					type: 1
				},
				success(res) {
					console.log(res)
					if (res.data.msg == 0) {
						wx.showToast({
							title: "加入购物车成功"
						})
					}
				}
			})
		} else {
			wx.showToast({
				title: "商品已下架"
			})
		}
	},
	clearsearch:function(){
		console.log("dd")
		this.setData({
			value: "",
			isshowlist:false,
			clearIcon:false
		})
	},
	histap:function(e){
		this.setData({
			value: e.currentTarget.dataset.searchhistory,
			clearIcon:true
		}, () => {
			console.log("赋值成功")
			this.search()
		})
	},
	search: function(e,page = 1, size = 4) {
		var that = this
		console.log(this.data.value)
		if (this.data.value.split(" ").join("").length > 0) {
			/* 历史记录 */
			let val = this.data.value.trim()
			console.log(val)
			if (this.data.HistoryList.length > 0) {
				if (this.data.HistoryList.indexOf(val) !== -1) {
					this.data.HistoryList.splice(this.data.HistoryList.indexOf(val), 1)
					this.data.HistoryList.unshift(val)
				} else {
					this.data.HistoryList.unshift(val)
				}

			} else {
				this.data.HistoryList.unshift(val)

			}
			if (this.data.HistoryList.length > 10) {
				this.data.HistoryList.pop()
			}
			wx.setStorageSync('HistoryList', JSON.stringify(this.data.HistoryList))
			console.log(this.data.HistoryList)

		}

		qcloud.request({
			url: config.search.searchGoods,
			method: 'GET',
			data: {
				page: page,
				size: size,
				name: that.data.value,
				merchantsId:wx.getStorageSync('merchantsId')
			},
			success(res) {
				console.log(res.data)
				var resdata = res.data
				that.setData({
					isshowlist:true
				})
				
				if (resdata.msg == 0) {
					if (page == 1) {
						var plist = []
					} else {
						var plist = that.data.searchList
					}
					that.setData({
						searchList: plist.concat(resdata.goods.list),
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
	deleteHistory() {
		var that = this
		wx.showModal({
			title: '提示',
			content: '是否确定删除历史记录',
			success(res) {
				if (res.confirm) {
					wx.removeStorageSync('HistoryList')
					that.setData({
						HistoryList: [],
					})

				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})

	},
	hotserchtap: function(e) {
		console.log(e.currentTarget.dataset.search)
		this.setData({
			value: e.currentTarget.dataset.search,
			clearIcon:true
		}, () => {
			console.log("赋值成功")
			this.search()
		})
	},
	/* 热门搜索 */
	hotSearch: function() {
		var that = this
		qcloud.request({
			url: config.search.searchLabel,
			method: 'get',
			data: {},
			success(res) {
				console.log(res.data)
				that.setData({
					hotSerch: res.data.goodsSearch
				})
			},
			fail(error) {
				console.log('request fail', error);
			},
			complete() {
				console.log('request saveUserName complete');
			}
		});
	},


	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
		console.log(this.data.value)
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		this.hotSearch()
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
		if (this.data.onpage < this.data.totalPage) {
			/* console.log("到底了")
			console.log(this.data.totalPage)
			console.log("当前页数", this.data.onpage + 1) */
			this.search("",this.data.onpage + 1)
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
