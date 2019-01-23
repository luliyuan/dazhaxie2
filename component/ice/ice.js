// component/artItem/artItem.js
var qcloud = require('../../vendor/y-sdk/index');
var config = require('../../config')
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		merchantsId: {
			type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
		observer: function(newVal, oldVal, changedPath) {
			var that=this
			console.log('newVal',newVal)
			console.log('old',oldVal)
			this.setData({
				merchantsId: newVal
			},()=>{
				that.getGoods()
			})
		
		}
		},
		onpage: {
			type: null,
			observer: function(newVal, oldVal, changedPath) {
				this.setData({
					onpage: newVal
				})

				if (newVal > 1 && newVal <= this.data.totalPage) {
					this.getGoods(newVal)
				}

			}
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {

		imgUrls: [],
		indicatorDots: true,
		autoplay: true,
		interval: 5000,
		duration: 1000,
		onpage: 1,
		totalPage: 1,
		islower: false,
		list: [],
		imgurl: config.imgurl
	},

	/**
	 * 组件的方法列表
	 */
	ready: function(options) {
		this.getSweper()
		/* this.getGoods() */
	},
	methods: {
		swiperid(e) {
			console.log(e)
			wx.navigateTo({
				url: '/pages/details/details?id=' + e.currentTarget.dataset.id
			})
		},
		addcart(e) {
			console.log("vvvvv")
			var that = this
			if (e.currentTarget.dataset.statename==1) {
				qcloud.request({
					url: config.mall.shoppingCartAdd,
					method: 'GET',
					data: {
						goodsId: e.currentTarget.dataset.id,
						merchantsId: wx.getStorageSync('merchantsId'),
						goodsNumber: 1,
						state: 0,
						type: 1
					},
					success(res) {
						console.log(res)
						if (res.data.msg == 0) {
							wx.showToast({
								title: "加入购物车成功"
							})
						}
					}
				})
			} else {
				wx.showToast({
					title: "商品已下架"
				})
			}
		},
		goodsdetail(e) {
			console.log(e.currentTarget.dataset.statename)
			if (e.currentTarget.dataset.statename==1) {
				wx.navigateTo({
					url: '/pages/details/details?id=' + e.currentTarget.dataset.id
				})
			}

		},
		getSweper: function() {
			var that = this
			qcloud.request({
				url: config.home.getSendVouchers,
				method: 'GET',
				data: {
					type: 3
				},
				success(res) {
					console.log(res)
					console.log("外卖")
					that.setData({
						imgUrls: res.data.shuffling
					})
				}
			})
		},
		getGoods: function(page = 1, size = 6) {
			var that = this
			console.log("waimaihanshu")
			qcloud.request({
				url: config.home.getGoods,
				method: 'GET',
				login: true,
				data: {
					type: 3,
					merchantsId: that.data.merchantsId,
					page: page,
					size: size

				},
				success(res) {
					console.log(res)
					var resdata = res.data
					if (resdata.msg == 0) {

						if (page == 1) {
							var pList = [];
						} else {
							var pList = that.data.list;
						}
						that.setData({
							list: pList.concat(resdata.goods.list),
							totalPage: resdata.goods.totalPage
						})
						console.log("总页数", that.data.totalPage)
						console.log("外卖", that.data.list)
					}

				},
				fail(error) {
					console.log('request fail', error);
				},
				complete() {
					// console.log('request complete'); 
				}
			});
		}
	}
})
