// 本文件用于监听localstorage变更时间，有使用场景：切换身份后通知其他tab页刷新
const listenedKeys = {} // {key: callback}

window.addEventListener('storage', function (e) {
  if (listenedKeys[e.key]) {
    listenedKeys[e.key](e.newValue)
  }
})

export const listenStorage = (key, callback) => {
  listenedKeys[key] = callback
}
