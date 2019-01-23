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
				
				if (newVal > 1 && newVal<= this.data.totalPage) {
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
		list:[],
		imgurl:config.imgurl,
		merchantsId:''
	},
	ready: function(options) {
		
		this.getSweper()
		console.log("lll", this.data.merchantsId)
		 /* this.getGoods() */
		console.log("lower", this.data.onpage)

	},
	/**
	 * 组件的方法列表
	 */
	onReachBottom: function() {
		/* 	var that = this;
			if (that.data.onpage < that.data.totalPage) {
				that.getdynamic(that.data.onpage + 1)
			} */
		console.log("dfsfds组件  水电费水电费是")
	},
	methods: {
		swiperid(e) {
			console.log(e)
			wx.navigateTo({
				url: '/pages/details/details?id=' + e.currentTarget.dataset.id
			})
		},
		toHomeDetaiil:function(e){
			console.log(e.currentTarget.dataset)
			if(e.currentTarget.dataset.statename==1){
				wx.navigateTo({
					url:'/pages/homeDetail/homeDetail?hrgid='+e.currentTarget.dataset.hrgid+'&index='+e.currentTarget.dataset.index
				}) 
			}	
		},
		getSweper: function() {
			var that = this
			qcloud.request({
				url: config.home.getSendVouchers,
				method: 'GET',
				data: {
					type: 4
				},
				success(res) {
					console.log(res)
					that.setData({
						imgUrls: res.data.shuffling
					})
				}
			})
		},
		getGoods: function(page = 1, size = 6) {
			var that = this
			qcloud.request({
				url: config.home.getGoods,
				method: 'GET',
				login: true,
				data: {
					type: 4,
					merchantsId: that.data.merchantsId,
					page: page,
					size: size

				},
				success(res) {
					console.log(res)
					setTimeout(function () {
					  wx.hideLoading()
					}, 1000)
			
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
						console.log("总页数",that.data.totalPage)
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
