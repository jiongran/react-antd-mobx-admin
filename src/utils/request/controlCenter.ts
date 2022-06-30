// import { debounce } from '@/utils/tools/common'
import axios from 'axios'
import { store, baseConfig } from './config'
// import vueStore from '@/store'
const formatDate = (d:number, type = 'yyyy-mm-dd hh:ii:ss') => {
	let date = new Date(d)
	let o = {
		"m+" : date.getMonth()+1,	//月份
		"d+" : date.getDate(),		//日
		"h+" : date.getHours(),		//小时
		"i+" : date.getMinutes(),	//分
		"s+" : date.getSeconds(),	//秒
	} as any
	if(/(y+)/.test(type)){
		type=type.replace(RegExp.$1,(date.getFullYear()+"").substr(4-RegExp.$1.length))
	}
	for(let k in o){
		if(new RegExp("("+ k +")").test(type)){
			type=type.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]):(("00"+ o[k]).substr((""+o[k]).length)))
		}
	}
	return type
}

const createCancelMethod = () => {
	return new Promise((resolve, reject) => {
		let cancel
		let cancelToken = new axios.CancelToken(function(c:any) {
			cancel = c
		})
		resolve({
			cancelToken,
			cancel
		})
	})
}

// 清除多余请求
const clearCacheRequest = (url:string, reqId:any) => {
	const errorMsg = `clearCacheRequest ${url} 请求被中断`
	const { map } = store as any
	// 取第一个打后的所有
	const reqObjs = map[url].slice(1)

	reqObjs.forEach((reqObj:any) => {
		if(reqObj.cancel) {
			// start 应该是个异步行为 但他并没提供回调 所以我直接默认它取消成功了
			reqObj.cancel(errorMsg)
			reqObj.isCancelled = true
			// end
		}
	})
	// map[url] = [map[url][0]]
}

// 操作取消请求
const handleBlackRequest = (url:string, reqId:any) => {
	const errorMsg = `handleBlackRequest ${url} 请求被中断`
	const { map } = store as any
	const obj = map[url].find((item:any) => item.reqId === reqId)
	if(!obj) throw new TypeError('找不到该配置')
	const { cancel } = obj
	if (typeof map[url].canRequest === 'undefined' || map[url].canRequest === false) {
		cancel && cancel(errorMsg)
		return
	}
	map[url].canRequest = false
}
// 节流恢复
export const handleRefreshCanRequest = (config:any) => {
	const { url, debounceDelay, isDebounce, reqId } = config
	const { map } = store as any
	const reqConfig = map[url].find((item:any) => item.reqId === reqId)
	if (!reqConfig) throw new TypeError('找不到该配置')
	if (!isDebounce) return
	let timer = setTimeout(() => {
		map[url].canRequest = true
		clearTimeout(timer)
		timer = null
	}, debounceDelay) as any
}
const setStateOfReqObjInMap = (urlName:string, reqId:any, obj:any) => {
	const { map } = store as any
	if (typeof map[urlName] === 'undefined') {
		throw new TypeError(`----- initStateOfReqObjInMap方法中 在map种找不到该${urlName}配置 ----`)
	}
	const reqConfig = map[urlName].find((item:any) => item.reqId === reqId)
	if(reqConfig) Object.assign(reqConfig, obj)
}
const setResCache = (config:any, res:any) => {
	const { map, queue } = store as any
	const { url, reqId } = config
	if (typeof map[url] === 'undefined') {
		console.error(`setResCache方法中找不到${ url }配置`)
		return
	}
	let reqConfig = map[url].find((item:any) => item.reqId === reqId)
	if (typeof reqConfig === 'undefined') {
		console.error(`setResCache方法中找不到${ url }配置`)
		return
	}
	reqConfig.resCache = res
	const queueItem = queue.find((item:any) => item.reqId === reqId)
	if (queueItem) queueItem.resCache = res
}
export const handleResponseToDo = (config:any, res:any) => {
	// 设置接口缓存内容
	const { reqId, url } = config
	const { map } = store as any
	// requesttedToDo && requesttedToDo(res.data)
	setResCache(config, res)
	if (config.isDebounce) {
		// 节流更新状态
		handleRefreshCanRequest(config)
	}
	// 清除map队列接口缓存
	map[url] = map[url].slice(0,1)

	setStateOfReqObjInMap(url, reqId, {
		curReTryCount: 0,
	})
}
export const handleRequestToDo = async(config:any) => {
	//todo xss
	Object.assign(config, {...baseConfig, ...config})
	const { map, queue, maxQueueLen } = store as any
	const { isDebounce, clearCache } = config
	if(!config.hasOwnProperty('reqId')) config.reqId = ~~(Math.random() * 100000000)

	if (!map[config.url]) {
		map[config.url] = []
		map[config.url].canRequest = true
	}
	// 如果该队列里没有找到该配置项 对应重连功能

	const tarReqConfig = map[config.url].some((item:any) => item.reqId === config.reqId)
	if(!tarReqConfig) {
		// 设置cancelToken对象
		const {cancelToken, cancel} = await createCancelMethod() as any
		config.cancelToken = cancelToken
		map[config.url].unshift({
			reqId: config.reqId,
			config,
			cancel,
			curReTryCount: 0,
			resCache: null,
			isCancelled: false
		})
	} else {
		// 抛出错误 终止请求
		if(tarReqConfig.isCancelled) {

			throw new TypeError('已终止请求')
		}
	}

	// 这是类型接口请求开关 需要放在更上一级的
	// 请求取消处理
	if (clearCache) clearCacheRequest(config.url, config.reqId)
	if (isDebounce) handleBlackRequest(config.url, config.reqId)
	if (queue.length >= maxQueueLen) {
		queue.length = 0
	}
	queue.unshift({
		reqUrl: config.url,
		reqTime: formatDate(+new Date()),
		resCache: null,
		reqId: config.reqId
	})
}
const isCanReTry = (config:any) => {
	const { noToken, canReTry, reTryFun } = config
	// const token = vueStore.state.user.token
    const token = false
	if(!canReTry) return false
	return !noToken ? token && (reTryFun?.() ?? true) : reTryFun?.() ?? true
}
// 失败重连
export const checkCanReTry = (config:any) => {
	const { url, reTryDelay, reTryCount, reqId } = config
	if (!isCanReTry(config)) return
	const { map } = store as any
	const reqConfig = map[url].find((item:any)=>item.reqId === reqId)
	if(!reqConfig) return
	map[url].canRequest = true
	let rsl = false
	if ((reTryCount !== '*' && reqConfig.curReTryCount >= reTryCount)) {
		reqConfig.curReTryCount = 0
		return Promise.resolve(rsl)
	}
	return new Promise(resolve => {
		let timer = setTimeout(() => {
			clearTimeout(timer)
			timer = null
			reqConfig.curReTryCount += 1
			rsl = true
			console.log(`正在进行第${reqConfig.curReTryCount}次重新连接`)
			resolve(rsl)
		}, reTryDelay) as any
	})
}
