import axios from 'axios'
// import store from '@/store'
// import router from '@/router'
// import i18n from '@/i18n'
// import { language } from '@/settings'
// import { blob2Json } from '@/utils/formatData'
import { checkCanReTry, handleResponseToDo, handleRequestToDo, handleRefreshCanRequest } from './controlCenter'

// create an axios instance
const service = axios.create({
	baseURL: '', // url = base url + request url
	withCredentials: true, // send cookies when cross-domain requests
	timeout: 5000 // request timeout
})

service.interceptors.request.use(
	async (config:any) => {
		const { method, params = null } = config
		if (method === 'get') {
			if (!params) {
				config.params = {}
			}
			config.params['v'] = ~~(Math.random() * 10000000)
		}
		// config.headers['Accept-Language'] = store.state.app.language || language
		// const token = store.state.user.token
        const token = false
		// sessionStorage.token
		if (token) {
			if (!config.headers) config.headers = {}
			config.headers['accessToken'] = token
			if (config.isUpload) {
				config.headers['Content-Type'] = 'multipart/form-data'
				config.timeout = 3600 * 1000
			}
		}
		await handleRequestToDo(config)

		return config


	},
	error => {
		// do something with request error
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	async (response:any) => {
		let res = response.data
		const resDataType = response.config && response.config.responseType == 'blob' ? 'blob' : 'default'
		if (resDataType === 'blob') {
			if (res['type'] === 'application/json') {
				// res = await blob2Json(res)
			} else {
				handleResponseToDo(response.config, response)
				return response
			}
		}
		resDataType === 'default' && handleResponseToDo(response.config, response)
		if (res.resultCode !== 200) {
			const errorStr = res.resultMsg ? res.resultMsg : 'Error'
			// if(response.config.isShowErrorTip)  res.resultCode === 10200 ? Dialog.warn(errorStr): Dialog.error(errorStr)
			if (res.resultCode === 20000 || res.resultCode === 20002) {
				// store.dispatch('user/resetToken')
				// router.replace('login')
				return Promise.reject(res)
			}
			return Promise.reject(errorStr)
		} else {
			return res
		}
	},
	async error => {
		// const { map } = reqStore
		let canReject = true
		if (axios.isCancel(error)) {
			// Dialog.error(error.message)
			console.error(error.message)
		} else {
			let errorStr = error.resultMsg
			if (error.config) {
				const { url, isShowErrorTip, handleRetry } = error.config
				handleRefreshCanRequest(error.config)
				// errorStr && isShowErrorTip && Dialog.error(errorStr ? (url + '---' + errorStr) : '' || 'Error')
				if (error.config.canReTry) {
					// 失败重连
					error.config.reTring = true
					let hasRetryCount = await checkCanReTry(error.config)
					if(hasRetryCount) {
						// const { map } = reqStore
						// const reqConfig = map[url].find(item=>item.reqId === error.config.reqId)
						canReject = false
						// 每次触发重连调用的回调
						handleRetry && handleRetry(error)
						// Dialog.error(errorStr || i18n.t('global.networkError') + error.message)
						// errorStr && Dialog.error(errorStr)
						return service(error.config)
					}
				}
			} else {
				// errorStr && Dialog.error(errorStr)
			}
		}
		if(canReject) {
			return Promise.reject(error)
		}
	}
)

export default service
