import useAsync from 'hooks/useAsync'

/**
 * 场景：适用于目前ui设计通用前十排名（参考赊销总览排名前十列表），若有差异需额外扩展或另外封装
 * @param request 接口请求
 */

export default ({
  request
}) => {
  // 参数回调
  const callback = res => {
    const { data: { data } } = res || {}
    const result = Object.prototype.toString.call(data) === '[object Array]' ? data
      : data && data.pagedRecords ? data.pagedRecords
        : []
    return {
      data: result
    }
  }
  // 获取并处理数据
  const { result: dataSource, loading } = useAsync({ request, callback })

  return {
    loading,
    dataSource
  }
}
