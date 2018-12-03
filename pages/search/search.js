// pages/my/my.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		hotSerch: ['大闸蟹', '大闸蟹', '大闸蟹', '大闸蟹', '大闸蟹'],
		HistoryList: [],
		value: "",
		resultshow:true,
		searchList:[]
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
			})
		}
	},
	search(e) {
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
		
		
	},
	deleteHistory(){
		var that=this
		wx.showModal({
			title: '提示',
			content: '是否确定删除历史记录',
			success (res) {
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
