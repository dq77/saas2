import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default ({
  cb
}) => {
  const { topCategory } = ajaxStore.factory
  const successCallBack = ({ code, data }) => {
    if (code === '0') {
      cb && cb()
    }
  }
  const {
    doResult,
  } = useAsync({
    init: false,
    request: topCategory,
    successCallBack
  })
  const topCurrent = (item) => {
    doResult({
      id: item.id
    })
  }
  return {
    topCurrent
  }
}
