// 获取省市区数据
import { ref } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { useWebWorker } from '@vueuse/core'
import { deepCopy } from '@/utils/qjd'

interface cytyTypes {
  code: string;
  name: string;
}

export interface citysTypes extends cytyTypes {
  children: Array<cytyTypes>
}

export interface flatCitysTypes {
  [key: string]: {
    name: string;
  }
}

export default () => {
  // 存储省市区数据
  const citys = ref<citysTypes | []>([])
  // 存储扁平化数据
  const flatCitys = ref<flatCitysTypes>({})
  // ajax
  const { common: { getAreaData: request } } = ajaxStore
  // worker
  const { post, worker } = useWebWorker('/worker/areaWorker.js')
  // 拿到扁平化数据后处理数据
  worker.value.onmessage = (res: any) => {
    const { data }: any = res ?? {}
    flatCitys.value = data ? deepCopy(data) : {}
  }
  // useAsync
  const { doResult } = useAsync({
    request,
    init: false,
    callback: (res: any) => {
      const { code, data } = res?.data ?? {}
      if (code === '0') {
        let newData: unknown = data?.replace(/(areas|citys)/g, 'children')
        newData = JSON.parse(<string>newData)
        citys.value = <any>newData
        // 发送数据
        post(newData)

        return { code, data: newData } as any
      }
      return {
        code,
        data
      }
    }
  })

  return {
    citys,
    flatCitys,
    doResult
  }
}
