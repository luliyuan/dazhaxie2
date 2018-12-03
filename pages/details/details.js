// pages/details/details.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		goodsimgsrc: "/static/img/goodsdetail.png",
		goodsTitle: "极品大闸蟹",
		goodsinfo: "蟹鲜肉嫩 回味无穷 美味无法阻挡",
		price: "199.00",
		specData: {
			specimg: {
				"img": "/static/img/goodsdetail.png",
				"name": "特级红毛蟹",
				"price": "168.00",
				"num": "2334"
			},
			specList: [
				"微辣",
				"中辣",
				"特辣"
			],

		},
		cartNum: 1,
		specshow:false

	},
	/**
	 * 绑定加数量事件
	 */
	cloceSpec(){
		this.setData({
			specshow: false
		});
	},
	gobuy(){
		this.setData({
			specshow: true
		});
		},
	addCount(e) {
		var mynum = this.data.cartNum
		mynum++
		this.setData({
			cartNum: mynum
		});

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
