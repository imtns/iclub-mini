import { request } from './request'

module.exports = {
  // 根据医生牌照编号查询医生信息
  doctorLicenseSearchRecord: (data) => request('/iclub-api/api/doctorLicenseSearchRecord/queryDoctorLicense', 'POST', data, true, true, true),
  // 获取认证机构信息
  queryOrgSearchRecord: (data) => request('/iclub-api/api/orgSearchRecord/queryOrgSearchRecord', 'POST', data, true, true, true),
  // 警示-黑名单机构查询
  queryWarningOrBlackListOrg: (data) => request('/iclub-api/api/orgSearchRecord/queryWarningOrBlackListOrg', 'POST', data, true, true, true),
  // 查询黑名单机详情
  queryBlackListOrgDetail: (data) => request('/iclub-api/api/orgSearchRecord/queryBlackListOrgDetail', 'POST', data, true, true, true),
  // 查询机构添加积分
  addPointBySeachOrg: (data) => request('/iclub-api/api/orgSearchRecord/saveIntegral', 'POST', data, false, true)
}
