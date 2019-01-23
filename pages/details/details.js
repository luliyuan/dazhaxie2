// pages/details/details.js
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
		specData: {
			specimg: {
				"img": "/static/img/goodsdetail.png",
				"name": "特级红毛蟹",
				"price": "168.00",
				"num": "2334"
			},


		},
		cartNum: 1,
		specshow: false,
		goodsid: "",
		imgurl: config.imgurl,
		goods: null,
		aHrefHrefData: '',
		type: 1,
		state: 0,
		isshare: false,
		enjoy: false,
		freight:null,
		enjoyType:null

	},
	selcctType: function(e) {
		console.log(e.currentTarget.dataset.type)
		this.setData({
			type: e.currentTarget.dataset.type
		})
	},
	/**
	 * 绑定加数量事件
	 */
	cloceSpec() {
		this.setData({
			specshow: false
		});
	},
	gobuy() {
		this.setData({
			specshow: true,
			state: 0

		});
	},
	duihuan(){
		this.setData({
			specshow: true,
			state: 0,
			enjoyType:1
		});
	},
	gocart(){
		this.setData({
			specshow: true,
			state: 0,
			enjoyType:2
		});
	},
	gobuyspell() {
		var that = this
		qcloud.request({
			url: config.isSpell.orNotSpellGroup,
			method: 'GET',
			data: {
				goodsId: that.data.goodsid,

			},
			success(res) {
				var resdata = res.data
				console.log(resdata)
				if (resdata.orNot == 1) {
					that.setData({
						specshow: true,
						state: 1

					});
				} else {
					/* util.showModel('提示', '您的分享次数暂未达到要求') */
					wx.showModal({
					  title: '提示',
					  content: '您的分享次数暂未达到要求,是否立即分享',
					  success(res) {
						if (res.confirm) {
						  console.log('用户点击确定')
						  that.setData({
						  	isshare: true
						  })
						} else if (res.cancel) {
						  console.log('用户点击取消')
						}
					  }
					})
				}

			}

		})


	},
	addCount(e) {
		var mynum = this.data.cartNum
		mynum++
		this.setData({
			cartNum: mynum
		});

	},
	addcart: function() {
		if (this.data.enjoy) {
			var that = this
			if(this.data.enjoyType==1){
				wx.navigateTo({
					url: '/pages/enjoypay/enjoypay?shopId=' + this.data.goodsid + '&enjoy=true&type=' + this.data.type +
						'&goodsNumber=' + this.data.cartNum
				}) 
			}else if(this.data.enjoyType==2){
				qcloud.request({
					url: config.mall.shoppingCartAdd,
					method: 'GET',
					data: {
						goodsId: that.data.goodsid,
						merchantsId: wx.getStorageSync('merchantsId'),
						type: that.data.type,
						state: that.data.state,
						goodsNumber: that.data.cartNum
					},
					success(res) {
						var resdata = res.data
						console.log(resdata)
						if (resdata.msg == 0) {
							util.showSuccess('添加购物车成功');
							setTimeout(function() {
								wx.switchTab({
									url: '/pages/cart/cart'
								})
							}, 1000)
						}
					},
					fail(error) {
						console.log('request fail', error);
					},
					complete() {
						console.log('request saveUserName complete');
					}
							
				})
			}
			
			
				
				
			


		} else {
			var that = this
			qcloud.request({
				url: config.mall.shoppingCartAdd,
				method: 'GET',
				data: {
					goodsId: that.data.goodsid,
					merchantsId: wx.getStorageSync('merchantsId'),
					type: that.data.type,
					state: that.data.state,
					goodsNumber: that.data.cartNum
				},
				success(res) {
					var resdata = res.data
					console.log(resdata)
					if (resdata.msg == 0) {
						util.showSuccess('添加购物车成功');
						setTimeout(function() {
							wx.switchTab({
								url: '/pages/cart/cart'
							})
						}, 1000)
					}
				},
				fail(error) {
					console.log('request fail', error);
				},
				complete() {
					console.log('request saveUserName complete');
				}

			})
		}




	},
	goshare() {
		this.setData({
			isshare: true
		})
	},
	closeshare() {
		this.setData({
			isshare: false
		})
	},

	/**
	 * 绑定减数量事件
	 */
	minusCount(e) {
		var mynum = this.data.cartNum
		if (mynum <= 1) {
			return false;
		}
		mynum--;

		this.setData({
			cartNum: mynum
		});

	},
	sharesuccess(){
		var that=this
		console.log("share?")
		qcloud.request({
							url: config.share.goodsShare,
							method: 'GET',
							data: {
								goodsId: that.data.goodsid,
							},
							success(res) {
								console.log("分享陈宫")
								console.log(res.data)
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
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		console.log(options)
		if (options.enjoy) {
			this.setData({
				enjoy: true,

			})
		}
		this.setData({
			goodsid: options.id,

		})

		var that = this;



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
		var that = this
		qcloud.request({
			url: config.mall.getGoodsInfo,
			method: 'GET',
			data: {
				goodsId: that.data.goodsid,
				merchantsId: wx.getStorageSync('merchantsId')
			},
			success(res) {
				if (res.data.msg == 0) {
					that.setData({
						goods: res.data.goods,
						aHrefHrefData: res.data.goods.info,
						freight:res.data.freight

					}, () => {
						WxParse.wxParse('aHrefHrefData', 'html', that.data.aHrefHrefData, that);
					})
				} else {
					util.showModel('提示', res.data.msg)
					setTimeout(function() {
						wx.navigateBack({
							delta: 1
						})
					}, 2200)
				}


			},
			fail(error) {
				console.log('request fail', error);
			},
			complete() {
				console.log('request saveUserName complete');
			}

		})
	},
	tocart: function() {
		console.log("fsdsdf")
		wx.switchTab({
			url: '/pages/cart/cart'
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

	},
	share: function() {
		console.log("1")
	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function(res) {
		var that = this
		if (res.from === 'button') {
			console.log(res.target, res)
		}
		wx.showShareMenu({
			withShareTicket: true
		})
		return {
			title: '海间北岛餐厅',
			desc: '',
			path: '/pages/home/home',
			success: res => {
				console.log('--- 转发回调 ---', res);
				//onShareAppMessage回调的shareTickets，如果没有，就说明不是转发到群聊的
				console.log('--- shareTickets ---', res.shareTickets);
				that.setData({
					isshare: false
				})
				qcloud.request({
					url: config.share.goodsShare,
					method: 'GET',
					data: {
						goodsId: that.data.goodsid,
					},
					success(res) {
						console.log("分享陈宫")
						console.log(res.data)
					},
					fail(error) {
						console.log('request fail', error);
					},
					complete() {
						console.log('request saveUserName complete');
					}

				})
			}

		}
	}
})
