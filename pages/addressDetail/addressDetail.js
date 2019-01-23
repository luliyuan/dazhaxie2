// pages/addressDetail/addressDetail.js
var qcloud = require('../../vendor/y-sdk/index');
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		region: [],
		userName: "",
		userPcc: "",
		userAddress: "",
		userPhone: '',
		isEdit: false,
		isfirst: false,
		lat: "",
		lng: "",
		isEdit: false,
		isfirst: false,
		addressId: "",
		ischoose:null,
		paychoose:null,
		editaddress:null
	},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

		var isEdit = false;
		var isfirst = false;
		if (options.id) {
			console.log('1', options)

			this.setData({
				addressId: options.id,
			})
			this.getadsdetail(options.id)
			isEdit = true
		} else {
			console.log('0', options)
			isEdit = false
		}
		if (options.listlen) {
			isfirst = options.listlen == 0
		}
		this.setData({
			isEdit: isEdit,
			isfirst: isfirst
		})
		/* wx.authorize({
		   scope: "scope.userLocation"
		 }) */
		 this.setData({
		 	ischoose: options.ischoose?options.ischoose:'',
			paychoose:options.paychoose?options.paychoose:'',
			editaddress:options.editaddress?options.editaddress:''
		 })

		
	},
	getadsdetail: function(eid) {
		var that = this;
		qcloud.request({
			url: config.address.getAddress,
			method: 'get',
			data: {
				addressId: eid
			},
			success(res) {
				if (res.data.msg == 0) {
					console.log(res.data)
					that.setData({
						userName: res.data.userAddress.name,
						userPcc: res.data.userAddress.area,
						userPhone: res.data.userAddress.phone,
						userAddress: res.data.userAddress.info,
						lat:res.data.userAddress.lat,
						lng:res.data.userAddress.lng
					})
				}
				console.log('request success', res);

			},
			fail(error) {
				console.log('request fail', error);
			},
			complete() {
				console.log('request saveUserName complete');
			}
		});
	},
	userNameInput: function(e) {
		this.setData({
			userName: e.detail.value
		})
	},
	userPhoneInput: function(e) {
		this.setData({
			userPhone: e.detail.value
		})
	},
	AddressInput: function(e) {
		this.setData({
			userAddress: e.detail.value
		})
	},
	saveform: function() {
		var that = this;
		if (that.data.userName == "") {
			util.showModel('提示', '姓名不能为空');
			return false;
		} else if (that.data.userPhone == "") {
			util.showModel('提示', '电话不能为空');
			return false;
		} else if (!(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(that.data.userPhone))) {
			util.showModel('提示', '电话格式错误');
			return false;
		} else if (that.data.userPcc == "") {
			util.showModel('提示', '所在地区不能为空');
			return false;
		} else if (that.data.userAddress == "") {
			util.showModel('提示', '详细地址不能为空');
			return false;
		} else if (that.data.isEdit) {
			wx.showLoading({
				title: '保存中',
				mask: true
			})
			qcloud.request({
				url: config.address.updateAddress,
				method: 'get',
				data: {
					name: that.data.userName,
					phone: that.data.userPhone,
					area: that.data.userPcc,
					info: that.data.userAddress,
					lat: that.data.lat,
					lng: that.data.lng,
					addressId:that.data.addressId
				},
				success(res) {
					wx.hideLoading()
					console.log('request12 success', res);
					if(res.data.msg==0){
						util.showSuccess('保存成功');
						setTimeout(function() {
							wx.navigateTo({
								url: '/pages/addressList/addressList?ischoose='+that.data.ischoose+'&paychoose='+that.data.paychoose+'&addchoose=true'
							})
						}, 1000)
					}else{
						util.showModel('提示', res.data.msg)
						setTimeout(function() {
							wx.navigateBack({
								delta: 1
							})
						}, 2000)
						}
					

				},
				fail(error) {
					wx.hideLoading()
					console.log('request fail', error);
				},
				complete() {

					console.log('request saveUserName complete');
				}
			});

		} else {
			wx.showLoading({
				title: '保存中',
				mask: true
			})
			qcloud.request({
				url: config.address.saveAddress,
				method: 'get',
				data: {
					name: that.data.userName,
					phone: that.data.userPhone,
					area: that.data.userPcc,
					info: that.data.userAddress,
					lat: that.data.lat,
					lng: that.data.lng
				},
				success(res) {
					wx.hideLoading()
					console.log('request success', res);
					util.showSuccess('保存成功');
					setTimeout(function() {
						wx.navigateTo({
							url: '/pages/addressList/addressList?ischoose='+that.data.ischoose+'&paychoose='+that.data.paychoose+'&addchoose=true'
						})
					}, 1000)

				},
				fail(error) {
					wx.hideLoading()
					console.log('request fail', error);
				},
				complete() {

					console.log('request saveUserName complete');
				}
			});
		}


	},
	/* chooseAddress: function(e) {
	   console.log('picker发送选择改变，携带值为', e.detail.value)
	   this.setData({
	     region: e.detail.value
	   })
	 }, */
	chooselocation: function() {
		var that = this
		wx.chooseLocation({
			success(res) {
				console.log('request success', res);
				that.setData({
					userPcc: res.address,
					lat: res.latitude,
					lng: res.longitude
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
})
