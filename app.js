//app.js
// var qcloud = require('./vendor/wafer2-client-sdk/index')
var qcloud = require('./vendor/y-sdk/index');
var config = require('./config')

App({
	onLaunch: function() {
		qcloud.setLoginUrl(config.service.loginUrl);
		qcloud.setUserInfoUrl(config.service.userInfoUrl);

		var that = this

		var sessionData = qcloud.session.get();
		if (sessionData && sessionData.userId) {

			this.globalData.userInfo = sessionData.user,
				this.globalData.userId = sessionData.userId
		}

		console.log("onlaunch")
		if (wx.getUpdateManager) {
			const updateManager = wx.getUpdateManager()

			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				console.log(res.hasUpdate)
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function(res) {
						wx.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否马上重启小程序？',
							success: function(res) {
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate()
								}
							}
						})
					})

					updateManager.onUpdateFailed(function() {
						// 新的版本下载失败
						wx.showModal({
							title: '已经有新版本了哟~',
							content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
						})
					})
				}
			})


		} else {
			wx.showModal({
				title: '提示',
				content: '当前微信版本过低，请升级到最新微信版本。'
			})
		}




	},
	onShow: function() {
		this.globalData.von = true;
		this.globalData.gong = true;
		this.globalData.toast = true;




	},
	globalData: {
		userInfo: null,
		user: null,
		userId: '',
		uop: 123,
		orderads: {}, //订单地址
		shoplist: [], //订单商品列表
		freight: 0, //邮费
		ordertotal: 0, //订单总金额
		searchVal: '',
		zarea: '',
		zLabel: [],
		lstate: true,
		von: true,
		gong: true,
		toast: true
	}
})
