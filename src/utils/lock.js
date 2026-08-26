export function createLock() {
  let status = false
  let timer
  const lock = () => {
    clearTimeout(timer)
    status = true
  }
  const unlock = (delay = 0, cb) => {
    return new Promise((resolve) => {
      if (delay > 0) {
        timer = setTimeout(() => {
          status = false
          cb && cb()
          resolve()
        }, delay)
      } else {
        status = false
        cb && cb()
        resolve()
      }
    })
  }

  return function (fn) {
    if (status) return
    fn(lock, unlock)
  }
}
