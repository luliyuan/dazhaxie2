// pages/addressList/addressList.js
var qcloud = require('../../vendor/y-sdk/index');
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		has: false,
		adslist: [],
		ischoose:null,
		paychoose:null,
		addchoose:null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
			console.log(options)
			
				this.setData({
					ischoose:options.ischoose?options.ischoose:'',
					paychoose:options.paychoose?options.paychoose:'',
					addchoose:options.addchoose?options.addchoose:''
				})
			
			
	},
	addnewaddress(e){
		console.log(e.currentTarget.dataset.ischoose)
		 wx.navigateTo({
			url:'/pages/addressDetail/addressDetail?ischoose='+e.currentTarget.dataset.ischoose+'&paychoose='+e.currentTarget.dataset.paychoose
		}) 
	},
	editaddress(e){
		wx.navigateTo({
			url:'/pages/addressDetail/addressDetail?ischoose='+e.currentTarget.dataset.ischoose+'&paychoose='+e.currentTarget.dataset.paychoose+'&id='+e.currentTarget.dataset.id+'&editaddress=true'
		})
	},
	homechoose:function(e){
		var pages = getCurrentPages(); // 获取页面栈
		var currPage = pages[pages.length - 1]; // 当前页面
		var prevPage = pages[pages.length - 2]; // 上一个页面
		if(this.data.ischoose){
			prevPage.setData({
				addlistid:e.currentTarget.dataset.addressid,
			}, () => {
				wx.navigateBack({
					delta: 1
				})
			})
			console.log("ischoose")
		}
		if(this.data.paychoose){
			console.log("paychoose")
			  wx.setStorageSync('addressId', e.currentTarget.dataset.addressid)
				wx.navigateBack({
					delta: 1
				})
		}
		if(this.data.paychoose && this.data.addchoose){
			wx.setStorageSync('addressId', e.currentTarget.dataset.addressid)
			wx.navigateBack({
				delta: 2
			})
		}
		/* if(this.data.paychoose && this.data.editaddress){
			wx.setStorageSync('addressId', e.currentTarget.dataset.addressid)
			console.log("editaddress")
			wx.navigateBack({
				delta: 2
			})
		} */
		if(this.data.ischoose && this.data.addchoose){
			var prevPage = pages[pages.length - 4]; // 上一个页面
			
			wx.setStorageSync('addressId', e.currentTarget.dataset.addressid)
			
			prevPage.setData({
				addlistid:e.currentTarget.dataset.addressid,
			}, () => {
				wx.navigateBack({
					delta: 2
				})
			})
		}
		
		
		
	},
	getlist: function() {
		var that = this
		qcloud.request({
			url: config.address.getMyAddress,
			method: 'GET',
			data: {
				merchantsId: wx.getStorageSync('merchantsId'),
			},
			success(res) {

				console.log('request success', res);
				that.setData({
					adslist: res.data.userAddress
				})
				console.log(that.data.adslist)
			},
			fail(error) {
				console.log('request fail', error);
			},
			complete() {
				console.log('request saveUserName complete');
				console.log(config.address.getMyAddress)
			}
		});
	},
	optDefault: function(e) {
		var ydataset = e.currentTarget.dataset;
		console.log(e.currentTarget)
		var that = this
		qcloud.request({
			url: config.address.setAddressState,
			method: 'GET',
			data: {
				addressId: ydataset.eid
			},
			success(res) {
				console.log('request success', res);
				that.getlist()
			},
			fail(error) {
				console.log('request fail', error);
			},
			complete() {
				console.log('request saveUserName complete');
			}
		});
	},
	 deleteads: function(e) {
	    var that = this
	    var ydataset = e.currentTarget.dataset;
	    wx.showModal({
	      title: '提示',
	      content: '你确定要删除这条收货地址吗？',
	      success: function(res) {
	        if (res.confirm) {
	          console.log('用户点击确定')
	          qcloud.request({
	            url: config.address.delAddress,
	            method: 'GET',
	            data: {
	              addressId: ydataset.eid
	            },
	            success(res) {
	              console.log('request success', res);
	              util.showSuccess('删除成功');
								console.log(wx.getStorageSync('addressId'))
								if(wx.getStorageSync('addressId')){
									if(ydataset.eid==wx.getStorageSync('addressId')){
										wx.removeStorageSync('addressId')
									}
								}
								
	              that.getlist()
	            },
	            fail(error) {
	              console.log('request fail', error);
	            },
	            complete() {
	              console.log('request saveUserName complete');
	            }
	          });
	        } else if (res.cancel) {
	          console.log('用户点击取消')
	        }
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
		this.getlist()
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
		if(!this.data.ischoose && !this.data.paychoose){
			wx.switchTab({
			  url: '/pages/my/my'
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

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
