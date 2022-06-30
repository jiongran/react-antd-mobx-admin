// 默认配置
export const baseConfig = {
	// 请求时不在query携带access_token  默认 @{ boolean } false
	noToken: false,
	// 是否打开节流 默认 @{ boolean } true
	isDebounce: false,
	// 节流间隔时间  默认 @{ number } 1000
	debounceDelay: 1000,
	// 是否取消其他同URL类型请求
	clearCache: false,
	// 失败重连 默认 @{ boolean } false
	canReTry: false,
	// 重连间隔时间 默认 @{ number } 0
	reTryDelay: 1000,
	// 失败重连次数 默认 @{ number } 1次， 如果设为 @{string} '*' 则为无限次重连
	reTryCount: 1,
	// 每次触发重连时调用的函数
	handleRetry: (error:any) => console.error(error),
	// 失败时是否提示
	isShowErrorTip: true,
	// api请求根域名选择 默认 @{ number } 0：配置的接口根 1：获取API2接口根 2：获取WebSocket接口根 3：获取文件上传接口根
	type: 1
}

// axios增强库状态机
// export const store = global.reqStore = {
export const store = {
	map: {},
	queue: [],
	// 队列只记录10条
	maxQueueLen: 10
}
