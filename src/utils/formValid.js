export const validLength6 = (_,value) => {
    const reg = /^[a-zA-Z0-9]{6,}$/
    return value&& reg.test(value)?Promise.resolve():Promise.reject('请输入6位以上字符')
}
export let api = {
    a1:'a1',
    s1: 's2'
}
export const setApi = (obj) => {
    Object.assign(api,obj)
}