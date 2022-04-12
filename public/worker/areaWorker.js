addEventListener('message', res => {
  const { data } = res ?? {}
  try {
    const flatCitys = {}
    const recursive = (data, parent = null) => {
      data && data.forEach(item => {
        flatCitys[item.code] = { name: item.name }
        item?.children?.length && recursive(item.children, item)
      })
    }
    recursive(data, null)
    // 发送处理完毕数据
    postMessage(flatCitys)
  } catch (error) {
    console.error(`error: ${error}`)
  }
})
