// pages/home/home.js
// 引入  SDK
var qcloud = require('../../vendor/y-sdk/index');
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		showtab: 1,
		visible1: false,
		locations: "",
		isMsk: false,
		userId: '',
		vocid: '',
		sendVouchers: "12",
		vouchers: [],
		lat: "",
		lng: "",
		merchantsId: '',
		islower: false,
		onpage: 1,
		locations2: '',
		imgurl: config.imgurl,
		ischooselocation: false,
		formIdString:'',
		ismsktwo:true,
		content:''

	},
	close() {
		this.setData({
			isMsk: false,
			ismsktwo:false
			
		})
	},
	handleOpen1() {
		console.log("1")
	},
	selectTab: function(e) {
		console.log(e)
		var show = e.target.dataset.selecttab
		console.log(e.target.dataset.selecttab)


		this.setData({
			showtab: show,
			onpage: 1
		})
	},
	onReachBottom: function() {
		console.log("到底了")
		this.setData({
			onpage: this.data.onpage + 1
		})

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	/* 	scrolllower:function(){
			
			this.setData({
				onpage:this.data.onpage+1
			})
			console.log(this.data.islower)
		}, */
	onLoad: function(options) {
		var sessionData = qcloud.session.get();
		if (sessionData) {
			this.setData({
				userId: sessionData.userId
			})
			
		}


		qqmapsdk = new QQMapWX({
			key: 'GZJBZ-QSCKW-TNCRO-OREED-HUPUJ-FABMM'
		});
		wx.showLoading({
			title: '卖力加载中',
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
		 /* this.getSendVouchers() */
	},
	chooselocation: function() {
		var that = this
		/* 	wx.chooseLocation({
				success(res) {
					console.log('request success', res);

				},
				fail(error) {
					console.log('request fail', error);
				},
				complete() {
					//  console.log('request complete');
				}
			}) */
		wx.navigateTo({
			url: '/pages/selectAddress/selectAddress?location=' + that.data.locations2
		})


	},
	getUs(e) {
		console.log(e.currentTarget.dataset.type)
		if (e.currentTarget.dataset.type == 1 || e.currentTarget.dataset.type == 3) {
			wx.navigateTo({
				url: '/pages/getus/getus?type=' + e.currentTarget.dataset.type
			})
		} else {
			qcloud.request({
				url: config.home.getUs,
				method: 'GET',
				
				data: {
					type:2
				},
				success(res) {
					
					if (res.data.msg == 0) {
						wx.makePhoneCall({
						  phoneNumber: res.data.us // 仅为示例，并非真实的电话号码
						})
					
					}
				}
			})
		}

	},
	formSubmit: function(e) {
		
		if (e.detail.formId != 'the formId is a mock one') {
			this.setData({
				formIdString: e.detail.formId + "," + this.data.formIdString
			})
			
			
		}
		qcloud.request({
					url: config.service.form,
					method: 'GET',
					data: {
						formId:this.data.formIdString
					},
					success(res) {
						var resdata = res.data
						console.log(resdata)
		
					},
					fail(error) {
						console.log('request fail', error);
					},
					complete() {
						console.log('request saveUserName complete');
					}
		
				})
		
		console.log(this.data.formIdString)
	},
	receiveVouchers: function() {
		var that = this
		qcloud.request({
			url: config.home.receiveVouchers,
			method: 'GET',
			data: {
				userId: that.data.userId,
				sendVouchers: that.data.vocid
			},
			success(res) {

				if (res.data.msg == 0) {
					wx.showToast({
						title: '领取成功',
						icon: 'success',
						duration: 2000,
						complete: function() {
							that.setData({
								isMsk: false
							})
						}
					})
				}
			}
		})
	},
	getSendVouchers: function() {

		var that = this
		qcloud.request({
			url: config.service.vouchers,
			method: 'GET',
			login: true,
			data: {
				userId: that.data.userId
			},
			success(res) {
				console.log("卡券", res)
				if (res.data.userVouchers != 0) {
					var userVouchersid = res.data.userVouchers
					that.setData({
						isMsk: true,
						vocid: userVouchersid,
						ismsktwo:true
					})
				}
				if (res.data.newUserVouchers != 0) {
					var newUserVouchersid = res.data.newUserVouchers

					that.setData({
						isMsk: true,
						vocid: newUserVouchersid
					})
				}
				if (res.data.userVouchers != 0 || res.data.newUserVouchers != 0) {
					qcloud.request({
						url: config.home.getSendVouchersInfo,
						method: 'GET',
						data: {
							id: that.data.vocid
						},
						success(res) {

							console.log(res)
							that.setData({
								sendVouchers: res.data.sendVouchers.title,
								vouchers: res.data.vouchers
							})
							console.log(that)
							// console.log('request success', resdata.msg);
						},
						fail(error) {
							console.log('request fail', error);
						},
						complete() {
							// console.log('request complete'); 
						}
					});

				}


			},
			fail(error) {
				console.log('request fail', error);
			},
			complete() {

			}
		});


	},
	csreq: function() {
		var that = this
		qcloud.request({
			url: config.home.swileList,
			method: 'GET',
			data: {
				yt: 'cscs'
			},
			success(res) {
				console.log(res)
				var resdata = res.data
				that.setData({
					swpList: resdata
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
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		if(app.globalData.von){
			
			console.log('getSendVouchers2')
			/* this.getSendVouchers() */
			/* if(this.data.ismsktwo==false){
				this.setData({
					isMsk:false
				})
			}else{
					console.log('getSendVouchers1')
				this.getSendVouchers()
			} */
			this.getSendVouchers()

			app.globalData.von=false
		}
		
		this.getmid()
		console.log('onshow')
		console.log(app.globalData.von)
		
		
	},
	getmid() {
		var _this = this;
		//调用定位方法
		if (this.data.ischooselocation == false) {
			_this.getUserLocation();
			console.log("ischooselocation==false")
		} else {
			/* 商铺 */
			console.log("ischooselocation==true")
			qcloud.request({
				url: config.home.getMerchants,
				method: 'GET',
				data: {
					lat: _this.data.lat,
					lng: _this.data.lng
				},
				success(res) {
					console.log(res)
					var resdata = res.data
					if(resdata.content){
						util.showModel("提示",resdata.content)
					}
					console.log('当前id',resdata.merchants.id)

					if(resdata.merchants){
					
							_this.setData({
								merchantsId: resdata.merchants.id
								/* merchantsId:2 */
							})
							
							wx.setStorageSync('merchantsId', resdata.merchants.id)
							console.log('重新选择位置', _this.data.merchantsId)
					}
					

				},
				fail(error) {
					console.log('request fail', error);
				},
				complete() {

				}
			});
		}


	},


	//定位方法
	getUserLocation: function() {
		var _this = this;
		wx.getSetting({
			success: (res) => {
				console.log(res)
				// res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
				// res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
				// res.authSetting['scope.userLocation'] == true    表示 地理位置授权
				if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
					//未授权
					console.log("1")
					wx.showModal({
						title: '请求授权当前位置',
						content: '需要获取您的地理位置，请确认授权',
						success: function(res) {
							if (res.cancel) {
								//取消授权
								wx.showToast({
									title: '拒绝授权',
									icon: 'none',
									duration: 1000
								})
							} else if (res.confirm) {
								//确定授权，通过wx.openSetting发起授权请求
								wx.openSetting({
									success: function(res) {
										if (res.authSetting["scope.userLocation"] == true) {
											wx.showToast({
												title: '授权成功',
												icon: 'success',
												duration: 1000
											})
											//再次授权，调用wx.getLocation的API
											_this.geo();
										} else {
											wx.showToast({
												title: '授权失败',
												icon: 'none',
												duration: 1000
											})
										}
									}
								})
							}
						}
					})
				} else if (res.authSetting['scope.userLocation'] == undefined) {
					//用户首次进入页面,调用wx.getLocation的API
					_this.geo();
					console.log("2")
				} else {
					console.log('授权成功')
					//调用wx.getLocation的API
					_this.geo();

				}
			}
		})

	},

	geo: function() {
		var _this = this;
		wx.getLocation({
			type: 'gcj02',
			success: function(res) {
				var latitude = res.latitude
				var longitude = res.longitude
				var speed = res.speed
				var accuracy = res.accuracy
				console.log(res)
				_this.setData({
					lat: latitude,
					lng: longitude
				})
				console.log(_this.data.lng)
				qqmapsdk.reverseGeocoder({
					location: {
						latitude: latitude,
						longitude: longitude
					},
					success: function(res) {
						console.log(res);
						console.log(res.result.address_reference.landmark_l2)
						_this.setData({
							locations: res.result.address_reference.landmark_l2.title,
							locations2: res.result.address
						})
					},
					fail: function(res) {
						console.log(res);
					},
					complete: function(res) {
						console.log(res);
					}
				});

				/* 商铺 */
				qcloud.request({
					url: config.home.getMerchants,
					method: 'GET',
					data: {
						lat: _this.data.lat,
						lng: _this.data.lng
					},
					success(res) {
						console.log(res)
						var resdata = res.data
						
						if(resdata.content){
							util.showModel("提示",resdata.content)
						}
						if(resdata.merchants.id){
							_this.setData({
								merchantsId: resdata.merchants.id
							})
							wx.setStorageSync('merchantsId', resdata.merchants.id)
						}
					
						console.log(_this.data.merchantsId)
						// console.log('request success', resdata.msg);
					},
					fail(error) {
						console.log('request fail', error);
					},
					complete() {
						// console.log('request complete'); 
					}
				});

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
		console.log("下拉")
		this.getmid()
		this.getSendVouchers()
		wx.stopPullDownRefresh()
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	},

})
