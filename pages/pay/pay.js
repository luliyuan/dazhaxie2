// pages/pay/pay.js
var qcloud = require('../../vendor/y-sdk/index');
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		eatmothod: 2,
		items: [{
				name: '0',
				value: '否',
				checked: 'true'
			}, {
				name: '1',
				value: '是'
			},

		],
		value1: '',
		order: [],
		sumPayMoney: '',
		vouchers: [],
		imgurl: config.imgurl,
		showcon: false,
		distribution: "",
		freight: '',
		chushifreight: '',
		couinfo: '',
		vouchersId: '',
		paymoney: null,
		radiotype: 0,
		shopId: null,
		invoiceInfo: "",
		invoiceNumber: '',
		userPhone: '',
		bank: '',
		cardId: '',
		content: '',
		addressId: "",
		address: null,
		enjoy: false,
		goodsPayMoney: '',
		vonpaymoney: '',
		eatData: null,
		sumPayMoney2: null,
		time: [],
		index: 0,
		integral: '',
		distribution2: ""

	},
	bindPickerChange: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value
		})
	},
	inputchange(e) {
		console.log(e.detail.detail.value)
	},
	invoiceInfo: function(e) {
		this.setData({
			invoiceInfo: e.detail.value
		})
	},
	invoiceNumber: function(e) {
		this.setData({
			invoiceNumber: e.detail.value
		})
	},
	userPhone: function(e) {
		this.setData({
			userPhone: e.detail.value
		})
	},
	bank: function(e) {
		this.setData({
			bank: e.detail.value
		})
	},
	cardId: function(e) {
		this.setData({
			cardId: e.detail.value
		})
	},
	content: function(e) {
		this.setData({
			content: e.detail.value
		})
	},

	radioChange: function(e) {
		console.log('radio发生change事件，携带value值为：', e.detail.value)
		this.setData({
			radiotype: e.detail.value
		}, () => {
			console.log(this.data.radiotype)
		})


	},
	/* this.setData({
			couinfo: e.currentTarget.dataset.vouinfo,
			showcon: false,
			vouchersId: e.currentTarget.dataset.vouchersId,
			paymoney: this.data.sumPayMoney - e.currentTarget.dataset.price
		}) */
	select(e) {
		let eatData = e.currentTarget.dataset.index
		console.log(eatData)
		if (eatData == 1) {
			this.setData({
				freight: 0,
				paymoney: (this.data.sumPayMoney - this.data.chushifreight).toFixed(2),
				distribution: this.data.distribution2
			})
		} else if (eatData == 2) {
			this.setData({
				freight: this.data.chushifreight,
				paymoney: this.data.sumPayMoney,
				distribution: this.data.distribution2
			})
		} else {
			this.setData({
				freight: 0,
				paymoney: this.data.goodsPayMoney,
				distribution: 0
			})
		}
		this.setData({
			eatmothod: eatData,
			vouchersId: '',
			couinfo: ''
		});
	},
	showcon() {
		if (this.data.vouchers.length > 0) {
			this.setData({
				showcon: !this.data.showcon

			})
		}

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		console.log(options)
		if (options.enjoy) {
			console.log("cccc")
			this.setData({
				enjoy: true
			})
		}
		this.setData({
			shopId: options.shopId
		})
		var that = this










		/* if (this.data.enjoy) {
			qcloud.request({
				url: config.mall.goIntegralGoods,
				method: 'GET',
				data: {
					goodsId: options.shopId,
					goodNumber:options.goodsNumber,
					type:options.type,
					merchantsId: wx.getStorageSync('merchantsId')
					
				},
				success(res) {
					var resdata = res.data
					console.log(resdata)
					that.setData({
						order: resdata.order,
						sumPayMoney: resdata.sumPayMoney,
						vouchers: resdata.vouchers,
						freight: resdata.freight,
						chushifreight: resdata.freight,
						distribution: resdata.distribution,

					})
					console.log(that.data.order)
				},
				fail(error) {
					console.log('request fail', error);
				},
				complete() {
					console.log('request saveUserName complete');
				}

			})
 */
		/* } else {
			qcloud.request({
				url: config.mall.goSettlement,
				method: 'GET',
				data: {
					shopId: options.shopId
				},
				success(res) {
					var resdata = res.data
					console.log(resdata)
					that.setData({
						order: resdata.order,
						sumPayMoney: resdata.sumPayMoney,
						vouchers: resdata.vouchers,
						freight: resdata.freight,
						chushifreight: resdata.freight,
						distribution: resdata.distribution,

					})
					console.log(that.data.order)
				},
				fail(error) {
					console.log('request fail', error);
				},
				complete() {
					console.log('request saveUserName complete');
				}

			})
		} */
	},
	choosecon(e) {
		console.log(e.currentTarget.dataset.vouinfo)
		console.log(e.currentTarget.dataset.price)
		console.log(this.data.paymoney)
		if (!this.data.vouchersId) {
			if (this.data.paymoney) {
				this.setData({
					couinfo: e.currentTarget.dataset.vouinfo,
					showcon: false,
					vouchersId: e.currentTarget.dataset.vouchersid,
					vonpaymoney: this.data.paymoney,
					paymoney: (this.data.paymoney - e.currentTarget.dataset.price).toFixed(2)
				})
			} else {
				this.setData({
					couinfo: e.currentTarget.dataset.vouinfo,
					showcon: false,
					vouchersId: e.currentTarget.dataset.vouchersid,
					vonpaymoney: this.data.sumPayMoney,
					paymoney: (this.data.sumPayMoney - e.currentTarget.dataset.price).toFixed(2)
				})
			}
		} else {
			if (this.data.paymoney) {
				this.setData({
					couinfo: e.currentTarget.dataset.vouinfo,
					showcon: false,
					vouchersId: e.currentTarget.dataset.vouchersid,
					paymoney: (this.data.vonpaymoney - e.currentTarget.dataset.price).toFixed(2)
				})
			} else {
				this.setData({
					couinfo: e.currentTarget.dataset.vouinfo,
					showcon: false,
					vouchersId: e.currentTarget.dataset.vouchersid,
					paymoney: (this.data.vonpaymoney - e.currentTarget.dataset.price).toFixed(2)
				})
			}
		}


		console.log(this.data.sumPayMoney)
		console.log(this.data.sumPayMoney - e.currentTarget.dataset.price)
	},
	gopay() {
		var that = this

		var sumPayMoney;
		if (that.data.paymoney == 0) {
			sumPayMoney = 0
		} else {
			sumPayMoney = that.data.paymoney ? that.data.paymoney : that.data.sumPayMoney
		}
		if (that.data.radiotype == 0) {

			qcloud.request({
				url: config.mall.settlement,
				method: 'GET',
				data: {
					shopId: that.data.shopId,
					takeType: that.data.eatmothod,
					invoice: 0,
					merchantsId: wx.getStorageSync('merchantsId'),
					shopId: that.data.shopId,
					vouchersId: that.data.vouchersId,
					/* 	sumPayMoney: that.data.paymoney ? that.data.paymoney : that.data.sumPayMoney, */
					sumPayMoney: sumPayMoney,
					addressId: that.data.addressId,
					content: that.data.content,
					time: that.data.time[that.data.index]

				},
				success(res) {
					var resdata = res.data
					console.log(resdata)
					if (resdata.msg == 0) {
						if (resdata.payment == true) {
							var orderNum = resdata.order.orderNum
							qcloud.request({
								url: config.mall.getPrePay,
								method: 'GET',
								data: {
									orderNum: orderNum
								},
								success(res) {
									var resdata = res.data
									console.log(resdata)
									if (resdata.msg == 0) {
										wx.requestPayment({
											timeStamp: resdata.timeStamp,
											nonceStr: resdata.nonceStr,
											package: resdata.package,
											signType: 'MD5',
											paySign: resdata.paySign,
											success(res) {
												console.log(res)
												wx.showToast({
													title: '支付成功',
													icon: 'success',
													duration: 1000,
													success: function() {
														setTimeout(function() {
															wx.navigateTo({
																url: '/pages/order/order?pay=true'
															})
														}, 1000)
													}
												})
											},
											fail(res) {
												console.log(res)
												wx.navigateBack({
													delta: 1
												})
											}
										})
									} else {
										util.showModel('提示', resdata.msg);
									}


								},
								fail(error) {
									console.log('request fail', error);
								},
								complete() {
									console.log('request saveUserName complete');
								}

							})
						} else {
							wx.showToast({
								title: '支付成功',
								icon: 'success',
								duration: 1000,
								success: function() {
									setTimeout(function() {
										wx.navigateTo({
											url: '/pages/order/order?pay=true'
										})
									}, 1000)
								}
							})
						}




					} else {
						util.showModel('提示', resdata.msg);
					}
				},
				fail(error) {
					console.log('request fail', error);
				},
				complete() {
					console.log('request saveUserName complete');
				}

			})
		} else {

			if (that.data.invoiceInfo == "") {
				util.showModel('提示', '抬头信息不能为空');
				return false;
			} else if (that.data.invoiceNumber == "") {
				util.showModel('提示', '发票税号不能为空');
				return false;
			} else {
				qcloud.request({
					url: config.mall.settlement,
					method: 'GET',
					data: {
						shopId: that.data.shopId,
						takeType: that.data.eatmothod,
						invoice: 1,
						merchantsId: wx.getStorageSync('merchantsId'),
						shopId: that.data.shopId,
						vouchersId: that.data.vouchersId,
						/* sumPayMoney: that.data.paymoney ? that.data.paymoney : that.data.sumPayMoney, */
						sumPayMoney: sumPayMoney,
						addressId: that.data.addressId,
						invoiceInfo: that.data.invoiceInfo,
						invoiceNumber: that.data.invoiceNumber,
						userPhone: that.data.userPhone,
						bank: that.data.bank,
						cardId: that.data.cardId,
						content: that.data.content,
						time: that.data.time[that.data.index]
					},
					success(res) {
						var resdata = res.data
						console.log(resdata)
						if (resdata.msg == 0) {
							if (resdata.payment == true) {
								var orderNum = resdata.order.orderNum
								qcloud.request({
									url: config.mall.getPrePay,
									method: 'GET',
									data: {
										orderNum: orderNum
									},
									success(res) {
										var resdata = res.data
										console.log(resdata)
										if (resdata.msg == 0) {
											wx.requestPayment({
												timeStamp: resdata.timeStamp,
												nonceStr: resdata.nonceStr,
												package: resdata.package,
												signType: 'MD5',
												paySign: resdata.paySign,
												success(res) {
													console.log(res)
													wx.showToast({
														title: '支付成功',
														icon: 'success',
														duration: 1000,
														success: function() {
															setTimeout(function() {
																wx.navigateTo({
																	url: '/pages/order/order?pay=true'
																})
															}, 1000)
														}
													})
												},
												fail(res) {
													console.log(res)
													wx.navigateBack({
														delta: 1
													})
												}
											})
										} else {
											util.showModel('提示', resdata.msg);
										}


									},
									fail(error) {
										console.log('request fail', error);
									},
									complete() {
										console.log('request saveUserName complete');
									}

								})
							} else {
								wx.showToast({
									title: '支付成功',
									icon: 'success',
									duration: 1000,
									success: function() {
										setTimeout(function() {
											wx.navigateTo({
												url: '/pages/order/order?pay=true'
											})
										}, 1000)
									}
								})
							}

						} else {
							util.showModel('提示', resdata.msg);
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


		}

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},
	toaddresslist() {
		this.setData({
			paymoney: null,
			vouchersId: '',
			couinfo: ''
		})
		wx.navigateTo({
			url: '/pages/addressList/addressList?paychoose=true'
		})

	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		this.setData({
			addressId: wx.getStorageSync('addressId'),
		})
		var that = this

		qcloud.request({
			url: config.mall.goSettlement,
			method: 'GET',
			data: {
				shopId: this.data.shopId
			},
			success(res) {
				var resdata = res.data
				console.log(resdata)
				if (resdata.msg == 0) {
					that.setData({
						order: resdata.order,
						sumPayMoney2: resdata.sumPayMoney,
						vouchers: resdata.vouchers,
						distribution: resdata.distribution,
						goodsPayMoney: resdata.goodsPayMoney,
						time: resdata.time,
						integral: resdata.integral,
						distribution2: resdata.distribution

					}, () => {

						if (that.data.addressId) {
							qcloud.request({
								url: config.address.getStateAddress,
								method: 'GET',
								data: {
									addressId: that.data.addressId,
									merchantsId: wx.getStorageSync('merchantsId'),
								},
								success(res) {
									var resdata = res.data
									console.log('运费', resdata.freight)
									var sumPayMoney3 = (that.data.sumPayMoney2 + resdata.freight).toFixed(2)
									console.log(sumPayMoney3)
									that.setData({
										address: resdata.userAddress,
										freight: resdata.freight,
										chushifreight: resdata.freight,
										sumPayMoney: sumPayMoney3
									})
									/* if(that.data.eatmothod==1){
										that.setData({
											freight: 0,
											paymoney: (that.data.sumPayMoney - that.data.chushifreight).toFixed(2)
										})
									}else{
										that.setData({
											freight: that.data.chushifreight,
											paymoney: that.data.sumPayMoney,
										})
									} */
								},
								fail(error) {
									console.log('request fail', error);
								},
								complete() {
									console.log('request saveUserName complete');
								}

							})
						} else {
							qcloud.request({
								url: config.address.getStateAddress,
								method: 'GET',
								data: {
									merchantsId: wx.getStorageSync('merchantsId'),
								},
								success(res) {
									var resdata = res.data
									console.log(resdata)
									var sumPayMoney3 = (that.data.sumPayMoney2 + resdata.freight).toFixed(2)
									that.setData({
										address: resdata.userAddress,
										freight: resdata.freight,
										chushifreight: resdata.freight,
										sumPayMoney: sumPayMoney3
									})
								},
								fail(error) {
									console.log('request fail', error);
								},
								complete() {
									console.log('request saveUserName complete');
								}

							})
						}


					})
					console.log(that.data.freight)
					console.log(Number(resdata.sumPayMoney), Number(that.data.freight))
					console.log(Number(resdata.sumPayMoney) + Number(that.data.freight))
				} else {
					util.showModel('提示', resdata.msg)
					setTimeout(function() {
						wx.navigateBack({
							delta: 1
						})
					}, 2000)
				}

				console.log(that.data.order)
			},
			fail(error) {
				console.log('request fail', error);
			},
			complete() {
				console.log('request saveUserName complete');
			}

		})









		console.log(that.data.sumPayMoney2)





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
