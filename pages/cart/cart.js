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
			"text": "微辣啊"
		}, {
			"id": "2",
			"text": "中辣"
		}, {
			"id": "3",
			"text": "特辣"
		}]
	},
	onShow() {
		this.setData({
			hasList: true,
			carts: [{
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
			]
		});
		this.getTotalPrice();
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
	getDate: function(e) {
		/* console.log(e.detail) */
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
		});
		this.getTotalPrice();
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
		});
		this.getTotalPrice();
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
	},

	/**
	 * 计算总价
	 */
	getTotalPrice() {
		let carts = this.data.carts; // 获取购物车列表
		let total = 0;
		for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
			if (carts[i].selected) { // 判断选中才会计算价格
				total += carts[i].num * carts[i].price; // 所有价格加起来
			}
		}
		this.setData({ // 最后赋值到data中渲染到页面
			carts: carts,
			totalPrice: total.toFixed(2)
		});
	}

})
