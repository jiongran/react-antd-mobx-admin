import apiPermission from '../permission'
export const moduleName = '公共模块'
export const getCode = (params)=>{
	return {
		url: `${apiPermission.commonApiBeforeStr}/api/v1.1/open/getCode`,
		method: 'get',
		params,
		isDebounce: true,
		responseType: 'blob',
		debounceDelay: 2000,
		noToken: true,
	}
}


export const getConfig = ({handleRetry})=>{
	return {
		url: `${apiPermission.commonApiBeforeStr}/api/v1.0/open/getConfig`,
		method: 'get',
		noToken: true,
		timeout: 10000,
		handleRetry,
		clearCache: true,
		canReTry: true,
		reTryCount: 3,
		reTryDelay: 100,
	}
}
