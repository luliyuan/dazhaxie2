/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
/* var version = 'v1'
var yhost = 'http://192.168.0.134:6188';
var host = 'https://oversea.1dang5.com'
var cshost = 'http://192.168.0.215:8080/OverseaBuy'
var chost = 'http://192.168.0.121:8081/OverseaBuy'
var zhost = 'http://192.168.0.234:8080/OverseaBuy'
var ztghost = 'http://192.168.0.87:8080/OverseaBuy' */
 //var dongurl = 'https://crab.1dang5.com' 
 var dongurl='http://192.168.0.189:8083/HaiJianBeiDao'
// host = ztghost
/* cshost = host
zhost = host
chost = host
ztghost = host
var fixhost = ztghost */
var config = {

	// 下面的地址配合云端 Demo 工作
	/**
	 * 公共接口
	 */
	imgurl: "https://crab.1dang5.com/",
	service: {
		/* host,
		chost,
		fixhost, */
		// 登录地址1，用于获取openId
		loginUrl: `${dongurl}/user/login`,
		// 登录地址2，用于更新用户
		userInfoUrl: `${dongurl}/user/updateUser`,
		/* 是否可以领取卡卷 */
		vouchers: `${dongurl}/user/vouchers/getSendVouchers`,
		form:`${dongurl}/user/us/saveFormId`
		/* getUserPhone: `${chost}/user/getUserPhone`,
		getWX: `${chost}/user/userInfo/getWX`, */
		// 测试的请求地址，用于测试会话
		/* requestUrl: `${host}/weapp/user`, */

		// 测试的信道服务地址
		/* tunnelUrl: `${host}/weapp/tunnel`, */
		//获取3种标签标签
		/* getTag: `${cshost}/user/wantBuy/getWantBuyTitle`, */
		// 上传图片接口
		/* uploadUrl: `${chost}/user/uploadImage`,
		getCitylist: `${chost}/user/cityList`,
		getsmsg: `${chost}/user/msg/msgList`,
		getmsg: `${chost}/user/msg/seeMsg` */



	},
	/**
	 * 动态
	 */
	home: {
		/* swileList: `${chost}/user/article/loopImg`, */
		/* 卡券信息 */
		getSendVouchersInfo: `${dongurl}/user/vouchers/getSendVouchersInfo`,
		/* 领取卡券 */
		receiveVouchers: `${dongurl}/user/vouchers/receiveVouchers`,
		/* 轮播 */
		getSendVouchers: `${dongurl}/user/goods/getShuffling`,
		/* 获取商铺 */
		getMerchants: `${dongurl}/user/getMerchants`,
		/* 获取商品 */
		getGoods: `${dongurl}/user/goods/getGoods`,
		/* 获取热门 */
		getHotGoods:`${dongurl}/user/goods/getHotGoods`,
		/* 联系我们 */
		getUs:`${dongurl}/user/us/getUs`
	},
	/**
	 * 
	 */
	/* 搜索 */
	search:{
		/* 热门搜索 */
		searchLabel:`${dongurl}/user/goods/searchLabel`,
		/* 搜搜 */
		searchGoods:`${dongurl}/user/goods/searchGoods`,
	},
	address: {
		/* 保存地址 */
		saveAddress:`${dongurl}/user/address/saveAddress`,
		setAddressState:`${dongurl}/user/address/setAddressState`,
		getMyAddress:`${dongurl}/user/address/getMyAddress`,
		delAddress:`${dongurl}/user/address/delAddress`,
		getAddress:`${dongurl}/user/address/getAddress`,
		/* 修改地址 */
		updateAddress:`${dongurl}/user/address/updateAddress`,
		/* 历史 */
		getMyHistoryAddress:`${dongurl}/user/address/getMyHistoryAddress`,
		getStateAddress:`${dongurl}/user/address/getStateAddress`
		
	},
	user: {
		/* 我的卡券 */
		getMyVouchers: `${dongurl}/user/vouchers/getMyVouchers`,
		/* 用户信息 */
		getUserInfo:`${dongurl}/user/getUserInfo`,
		/* 积分 */
		getIntegralMsg:`${dongurl}/user/goods/getIntegralMsg`,
		/* 关于我们 */
		getAboutUs:`${dongurl}/user/us/getAboutUs`

	},
	mall:{
		/* 获取商品详情 */
		getGoodsInfo:`${dongurl}/user/goods/getGoodsInfo`,
		/* 添加到购物车 */
		shoppingCartAdd:`${dongurl}/user/goods/shoppingCartAdd`,
		/* 购物车列表 */
		shoppingCartList:`${dongurl}/user/goods/shoppingCartList`,
		/* 修改口味 */
		shoppingCartEditType:`${dongurl}/user/goods/shoppingCartEditType`,
		/* 修改购物车数量 */
		shoppingCartEditNum:`${dongurl}/user/goods/shoppingCartEditNum`,
		/* 购物车去结算 */
		goSettlement:`${dongurl}/user/goods/goSettlement`,
		settlement:`${dongurl}/user/goods/settlement`,
		getMyOrder:`${dongurl}/user/order/getMyOrder`,
		/* 订单详情 */
		getOrder:`${dongurl}/user/order/getOrder`,
		/* 假支付 */
		pay:`${dongurl}/user/goods/pay`,
		/* jifen */
		goIntegralGoods:`${dongurl}/user/goods/goIntegralGoods`,
		/* 删除购物车 */
		shoppingCartDelete:`${dongurl}/user/goods/shoppingCartDelete`,
		getPrePay:`${dongurl}/user/wxPay/getPrePay`
		
	},
	enjoy:{
		getIntegralGoods:`${dongurl}/user/goods/getIntegralGoods`,
		buyIntegralGoods:`${dongurl}/user/goods/buyIntegralGoods`,
		getjifen:`${dongurl}/user/us/getjifen`
	},
	share:{
		goodsShare:`${dongurl}/user/goods/goodsShare`,
	},
	isSpell:{
		orNotSpellGroup:`${dongurl}/user/goods/orNotSpellGroup`
	}
	
};

module.exports = config;
