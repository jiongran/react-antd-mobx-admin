import apiPermission from '../permission'
export const moduleName = '登录模块'
export function login(data) {
	return {
		url: `${apiPermission.commonApiBeforeStr}/api/v1.1/member/login`,
		method: 'post',
		data,
		isDebounce: true,
		noToken: true,
	}
}
export const logout = ()=>{
	return {
		url: `${apiPermission.commonApiBeforeStr}/api/v1.0/member/loginOut`,
		method: 'post'
	}
}
export const getIsOpenTotpCode =(params = {username: ''}) => {
	return {
		url: `${apiPermission.commonApiBeforeStr}/api/v1.0/member/getIsOpenTotpCode`,
		method: 'get',
		params
	}
}

