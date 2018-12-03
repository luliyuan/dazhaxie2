// pages/home/home.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		showtab: 1,
		visible1: false,
	},
	handleOpen1() {
		console.log("1")
	},
	selectTab: function(e) {
		console.log(e)
		var show = e.target.dataset.selecttab
		console.log(e.target.dataset.selecttab)


		this.setData({
			showtab: show
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

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
		var _this = this;
		//调用定位方法
		_this.getUserLocation();
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

geo: function () {
    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
		console.log(res)
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

	},

})
