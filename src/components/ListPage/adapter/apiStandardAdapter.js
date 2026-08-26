// 列表页接口标准适配器
export default {
  request: (query) => {
    // pageIndex, pageSize 是组件内标准
    const { pageIndex: page, pageSize: limit, ...rest } = query
    return {
      page,
      limit,
      ...rest
    }
  },
  response: (res) => {
    // result, totalRecord 是组件内标准
    const {
      data: { list: result, totalCount: totalRecord, ...listRest },
      ...resRest
    } = res
    return {
      result,
      totalRecord,
      resRest,
      listRest
    }
  }
}
