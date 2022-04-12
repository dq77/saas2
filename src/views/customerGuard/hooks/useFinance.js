import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
export default () => {
  const { customer: { stratify: { getIndustry } } } = ajaxStore
  const { doResult } = useAsync({ init: false, request: getIndustry })
  return {
    doResult
  }
}
