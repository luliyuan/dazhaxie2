// pages/selectAddress/selectAddress.js
var qcloud = require('../../vendor/y-sdk/index');
var config = require('../../config');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		location: '',
		userAddress: [],
		chooseaddressid: '',
		addlistid: '',
		addlist:[],
		morendizhi:null,
		 tips:[],
		istext: false,
		searchKey: ''

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		console.log(options)
		this.setData({
			location: options.location
		})

	},
	clickSearchView: function () {
    this.setData({
      istext: true,
    });
  },

  bindKeyInput: function (e) {
    console.log(e);
    this.setData({
      searchKey: e.detail.value
    },()=>{
		this.clickSearch()
	})
	if(!e.detail.value){
		 this.setData({
			  tips: []
		}) 
	}
	
  },

  clickSearch: function () {
    var that = this;
    var keywords = that.data.searchKey;
   /* if (keywords ==""){
      wx.showModal({
        title: '请输入搜索内容',
        confirmColor: '#e75858',
        showCancel: false,
      })
      return;
    } */
    var qqmapsdk = new QQMapWX({
      key: 'GZJBZ-QSCKW-TNCRO-OREED-HUPUJ-FABMM'
    });
    qqmapsdk.search({
      keyword: keywords,
      success: function (res) {
        console.log('sucess',res);
      },
      fail: function (res) {
        console.log('fail',res);
      },
      complete: function (res) {
        console.log('complete',res);
        that.setData({
          tips: res.data
        });
        if (that.data.tips==[]){
          wx.showModal({
            title: '没有找到您想要的结果',
            confirmColor: "#E75858",
            showCancel: false,
          })
        }

      }
    })
  },

  didSelectCell: function (e) {
	console.log(e.currentTarget.dataset.location)
	var pages = getCurrentPages(); // 获取页面栈
	var currPage = pages[pages.length - 1]; // 当前页面
	var prevPage = pages[pages.length - 2]; // 上一个页面
	prevPage.setData({
		lat: e.currentTarget.dataset.location.lat,
		lng: e.currentTarget.dataset.location.lng,
		locations: e.currentTarget.dataset.title,
		ischooselocation: true
	}, () => {
		wx.navigateBack({
			delta: 1
		})
	})
  },
	
	
	
	gotoaddlist() {
		wx.navigateTo({
			url: '/pages/addressList/addressList?ischoose=true'
		})
	},
	myaddressto(e){
		console.log(e)
		var pages = getCurrentPages(); // 获取页面栈
		var currPage = pages[pages.length - 1]; // 当前页面
		var prevPage = pages[pages.length - 2]; // 上一个页面
		prevPage.setData({
			lat: e.currentTarget.dataset.lat,
			lng: e.currentTarget.dataset.lng,
			locations: e.currentTarget.dataset.area,
			ischooselocation: true
		}, () => {
			wx.navigateBack({
				delta: 1
			})
		})
		wx.setStorageSync('addressId', e.currentTarget.dataset.addressid)
		
	},
	choose() {
		var pages = getCurrentPages(); // 获取页面栈
		var currPage = pages[pages.length - 1]; // 当前页面
		var prevPage = pages[pages.length - 2]; // 上一个页面
		
		var that = this
		wx.chooseLocation({
			success(res) {
				console.log('request success', res);
				that.setData({
					location: res.address
				})
				prevPage.setData({
					lat: res.latitude,
					lng: res.longitude,
					locations: res.name,
					ischooselocation: true
				}, () => {
					wx.navigateBack({
						delta: 1
					})
				})

			},
			fail(error) {
				console.log('request fail', error);
			},
			complete() {
				//  console.log('request complete');
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
		var that = this
		qcloud.request({
			url: config.address.getMyHistoryAddress,
			method: 'GET',
			data: {

			},
			success(res) {
				/* setTimeout(function() {
					wx.hideLoading()
				}, 2000) */
				var resdata = res.data
				console.log(resdata)
				that.setData({
					userAddress: resdata.userAddress
				})
				console.log(that.data.userAddress)
				// console.log('request success', resdata.msg);
			},
			fail(error) {
				console.log('request fail', error);
			},
			complete() {
				// console.log('request complete');
			}
		});

		/*  */
			qcloud.request({
				url: config.address.getStateAddress,
				method: 'GET',
				data: {
					addressId:that.data.addlistid
				},
				success(res) {
					var resdata = res.data
					console.log('addlist',resdata)
					that.setData({
						addlist:resdata.userAddress
					})
				},
				fail(error) {
					console.log('request fail', error);
				},
				complete() {
					// console.log('request complete');
				}
			});
		



	},
	gouseaddress(e) {
		wx.setStorageSync('addressId', e.currentTarget.dataset.addressid)
		var pages = getCurrentPages(); // 获取页面栈
		var currPage = pages[pages.length - 1]; // 当前页面
		var prevPage = pages[pages.length - 2]; // 上一个页面

		console.log(e.currentTarget.dataset.addressid)
		var that = this
		qcloud.request({
			url: config.address.getStateAddress,
			method: 'GET',
			data: {
				addressId: e.currentTarget.dataset.addressid
			},
			success(res) {
				/* setTimeout(function() {
					wx.hideLoading()
				}, 2000) */
				var resdata = res.data
				console.log(resdata)
				if (resdata.msg == 0) {
					prevPage.setData({
						lat: resdata.userAddress.lat,
						lng: resdata.userAddress.lng,
						locations: resdata.userAddress.area,
						ischooselocation: true
					}, () => {
						wx.navigateBack({
							delta: 1
						})
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
