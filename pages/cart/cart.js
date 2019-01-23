var qcloud = require('../../vendor/y-sdk/index');
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp()
Page({
	data: {
		carts: [], // 购物车列表
		hasList: false, // 列表是否有数据
		totalPrice: 0, // 总价，初始为0
		selectAllStatus: false, // 全选状态，默认全选
		obj: {
			name: "hello"
		},
		selectArray: [{
			"id": "1",
			"text": "微辣"
		}, {
			"id": "2",
			"text": "中辣"
		}, {
			"id": "3",
			"text": "特辣"
		}, {
			"id": "0",
			"text": "清蒸"
		}],
		imgurl: config.imgurl,
		type: "3",
		shopId: '',
		isgopay: false,
		gogoods: [],
		deletecart: false,
		formIdString:''
	},
	onLoad() {
		this.setData({
			deletecart: false
		})
	},
	onShow() {
		this.setData({
			hasList: true,
			selectAllStatus: false,
			deletecart: false
			/* carts: [{
					id: 1,
					title: '新鲜芹菜 半斤',
					image: '/static/img/cart.png',
					num: 1,
					price: 1111,
					selected: false
				},
				{
					id: 2,
					title: '素米 500g',
					image: '/static/img/cart.png',
					num: 1,
					price: 23,
					selected: false
				}
			] */
		});
		

		/* 购物车列表 */

		var that = this
		this.cart()
		this.setData({
			shopId:'',
			totalPrice:(0).toFixed(2)
		},()=>{
			/* this.getTotalPrice(); */
		})
		


		/* 商品推荐 */
		qcloud.request({
			url: config.home.getGoods,
			method: 'GET',
			data: {
				merchantsId: wx.getStorageSync('merchantsId'),
				type: 4,
				size: 6,
				page: 1,
				cart:1
			},
			success(res) {
				var resdata = res.data
				console.log(resdata)
				that.setData({
					gogoods: resdata.goods.list

				}, () => {

				})

			},
			fail(error) {
				console.log('request fail', error);
			},
			complete() {
				console.log('request saveUserName complete');
			}

		})



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
	cart() {
		var that = this
		qcloud.request({
			url: config.mall.shoppingCartList,
			method: 'GET',
			data: {
				merchantsId: wx.getStorageSync('merchantsId')
			},
			success(res) {
				var resdata = res.data
				that.setData({
					carts: resdata.shopList

				}, () => {

				})

			},
			fail(error) {
				console.log('request fail', error);
			},
			complete() {
				console.log('request saveUserName complete');
			}

		})
	},
	todetails(e) {
		console.log(e)
		wx.navigateTo({
			url: '/pages/details/details?id=' + e.currentTarget.dataset.id
		})
	},
	/**
	 * 当前商品选中事件
	 */
	selectList(e) {
		const index = e.currentTarget.dataset.index;
		let carts = this.data.carts;
		const selected = carts[index].selected;
		carts[index].selected = !selected;
		this.setData({
			carts: carts
		});
		this.getTotalPrice();
		console.log(carts)
		// 		for(var i in carts){
		// 			console.log(carts[i].selected)
		// 			console.log(carts[i].selected == false)
		//  			if(carts[i].selected == false){
		// 				console.log(10);
		//  				this.setData({
		//  					selectAllStatus: false
		//  				});
		//  			}else{
		// 					console.log(1)
		// 					this.setData({
		// 						selectAllStatus: true
		// 					});
		//  			}
		//  		}

		let arr = [];
		for (let cart of carts) {
			if (cart.selected) {
				arr.push('1');
			} else {
				arr.push('0');
			}
		}
		// 		console.log(arr);
		// 		console.log(arr.indexOf('0') != -1)

		if (arr.indexOf('0') != -1) {
			this.setData({
				selectAllStatus: false
			});
		} else {
			this.setData({
				selectAllStatus: true
			});
		}

	},
	/* 修改口味 */
	getDate: function(e) {
		console.log(e)
		var that = this
		var mytype = e.detail.id + 1
		qcloud.request({
			url: config.mall.shoppingCartEditType,
			method: 'GET',
			data: {
				type: mytype,
				cartId: e.currentTarget.dataset.cartid
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

	},
	EditNum: function(num) {

	},
	gobuy: function() {
		console.log("12")
		if (this.data.shopId) {
			wx.navigateTo({
				url: '/pages/pay/pay?shopId=' + this.data.shopId

			})



		} else {

		}
	},
	/**
	 * 购物车全选事件
	 */
	selectAll(e) {
		let selectAllStatus = this.data.selectAllStatus;
		selectAllStatus = !selectAllStatus;
		let carts = this.data.carts;

		for (let i = 0; i < carts.length; i++) {
			carts[i].selected = selectAllStatus;
		}
		this.setData({
			selectAllStatus: selectAllStatus,
			carts: carts
		}, () => {
			this.getTotalPrice();
		});

	},

	/**
	 * 绑定加数量事件
	 */
	addCount(e) {
		const index = e.currentTarget.dataset.index;
		let carts = this.data.carts;
		let num = carts[index].num;
		num = num + 1;
		carts[index].num = num;
		this.setData({
			carts: carts
		}, () => {

		});
		this.getTotalPrice();

		var that = this
		qcloud.request({
			url: config.mall.shoppingCartEditNum,
			method: 'GET',
			data: {
				goodNumber: e.currentTarget.dataset.num + 1,
				cartId: e.currentTarget.dataset.cartid
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


	},

	/**
	 * 绑定减数量事件
	 */
	minusCount(e) {
		const index = e.currentTarget.dataset.index;
		const obj = e.currentTarget.dataset.obj;
		let carts = this.data.carts;
		let num = carts[index].num;
		if (num <= 1) {
			return false;
		}
		num = num - 1;
		carts[index].num = num;
		this.setData({
			carts: carts
		});
		this.getTotalPrice();
		var that = this
		qcloud.request({
			url: config.mall.shoppingCartEditNum,
			method: 'GET',
			data: {
				goodNumber: e.currentTarget.dataset.num - 1,
				cartId: e.currentTarget.dataset.cartid
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
	},

	/**
	 * 计算总价
	 */
	getTotalPrice() {
		let carts = this.data.carts; // 获取购物车列表
		let total = 0;
		var shopid = [];
		for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
			/* console.log(carts[i].price,carts[i].num) */
			if (carts[i].selected) { // 判断选中才会计算价格
				//total += carts[i].num * carts[i].price; // 所有价格加起来
				shopid.push(carts[i].cartId)
				this.setData({
					isgopay: true
				})
				
				if(carts[i].typeId==1){
					total += carts[i].num * carts[i].price; // 所有价格加起来
				}
				
			}
			
		}
		var shopIds = shopid.join()
		console.log(shopIds)
		this.setData({ // 最后赋值到data中渲染到页面
			carts: carts,
			totalPrice: total.toFixed(2),
			shopId: shopIds
		});
	},
	deletecart() {
		this.setData({
			deletecart: !this.data.deletecart
		})
	},
	delete() {
		var that = this
		console.log(this.data.shopId)
		wx.showModal({
			title: '提示',
			content: '你确定要删除商品吗？',
			success: function(res) {
				if (res.confirm) {
					console.log('用户点击确定')
					qcloud.request({
						url: config.mall.shoppingCartDelete,
						method: 'GET',
						data: {
							shopId: that.data.shopId
						},
						success(res) {
							console.log('request success delete', res);
							util.showSuccess('删除成功');
							that.cart()
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




	}

})
