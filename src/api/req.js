import request from '@/utils/request/index'
import { jsonUtils } from '@/utils/modules'
const modulesFiles = require.context('./module', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
export const apis = modulesFiles.keys().reduce((modules, modulePath) => {
	// set './app.js' => 'app'
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	const value = modulesFiles(modulePath)
	modules[moduleName] = value
	return modules
}, {})
window.apis = apis
// 在main.js入口文件中挂在于全局window对象 req变量 以简洁明了的方式为开发者带来便利，
// 无需import接口模块 直接通过全局方法req传入文件名+配置名即可调用, 思想参考于vuex的dispatch模块化调用支持接口公共字段配置
// 配置api时支持配置的数据类型为函数或者是一个对象
// 使用： req('common/getCode')
const req = function(str, data) {
	const [module, apiName] = str.split('/')
	let apiConfig = {}

	if (!(apis[module] && apis[module][apiName])) {
		throw new Error('找不到该request api配置')
	}

	const targetObjType = typeof apis[module][apiName]
	if (targetObjType === 'function') {
		const arg = [...arguments].slice(1)
		const fun = apis[module][apiName]
		apiConfig = fun.apply(fun, arg)
	} else if (targetObjType === 'object') {
		apiConfig = jsonUtils.parse(jsonUtils.stringify(apis[module][apiName]))
		Object.assign(apiConfig, data)
	} else throw new Error('request api配置的数据类型不被支持')

	if (apiConfig.hasOwnProperty('useBaseUrl') === false) apiConfig.useBaseUrl = true

	if (apiConfig.useBaseUrl === true) apiConfig.url = `${apiConfig.url}`
	return request(apiConfig)
}

export default req
