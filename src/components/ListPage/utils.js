// 预处理参数，去掉无效值和字符两端空格
export function preprocessQuery(data) {
  const query = {}
  Object.keys(data).forEach((key) => {
    let value = data[key]

    if (typeof value === 'string') {
      value = value.trim()
    }

    if (value !== undefined && value !== null && value !== '') {
      query[key] = value
    }
  })

  return query
}

export const sleep = (ms = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export function createFetch(token, request, query) {
  return new Promise((resolve, reject) => {
    try {
      request(query)
        .then((res) => {
          resolve({ token, res })
        })
        .catch((err) => {
          reject(err)
        })
    } catch (err) {
      reject(err)
    }
  })
}
