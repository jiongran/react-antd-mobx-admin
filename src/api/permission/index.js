const commonApiBeforeStr = '/csr/common'
const adminApiBeforeStr = '/csr/admin'
const keFuAdminApiBeforeStr = '/csr/keFuAdmin'
// 客服管理员与平台交集
const adminClassApiBeforeStr = ''
// 客服与客服管理员交集
const keFuClassApiBeforeStr = ''
// 三个交集
const allRoleApiBeforeStr = ''
let apiPermission = {
    commonApiBeforeStr,
    adminApiBeforeStr,
    keFuAdminApiBeforeStr,
    adminClassApiBeforeStr,
    keFuClassApiBeforeStr,
    allRoleApiBeforeStr,
}
export default apiPermission

export const setUseApiAccorddingToRole = (role) => {
	switch(role) {
		case 'KeFu':
			apiPermission.keFuClassApiBeforeStr = apiPermission.commonApiBeforeStr
			apiPermission.allRoleApiBeforeStr = apiPermission.commonApiBeforeStr
			apiPermission.adminClassApiBeforeStr = apiPermission.adminApiBeforeStr
			break
		case 'KeFuAdmin':
			apiPermission.keFuClassApiBeforeStr = apiPermission.keFuAdminApiBeforeStr
			apiPermission.adminClassApiBeforeStr = apiPermission.keFuAdminApiBeforeStr
			apiPermission.allRoleApiBeforeStr = apiPermission.keFuAdminApiBeforeStr
			break
		case 'Admin':
			apiPermission.adminClassApiBeforeStr = apiPermission.adminApiBeforeStr
			apiPermission.allRoleApiBeforeStr = apiPermission.adminApiBeforeStr
			apiPermission.keFuClassApiBeforeStr = apiPermission.commonApiBeforeStr
			break
		default:
			break
	}
}
