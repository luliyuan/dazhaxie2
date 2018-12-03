// component/artItem/artItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    artInfo: {
      type: Object
    },
    fixhost:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

		imgUrls: [
			'/static/img/swiper.png',
			'/static/img/swiper.png',
			'/static/img/swiper.png'

		],
		indicatorDots: true,
		autoplay: true,
		interval: 5000,
		duration: 1000,
		
	
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
