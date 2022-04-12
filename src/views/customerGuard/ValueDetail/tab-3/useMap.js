import useAsync from 'hooks/useAsync'
import { reactive, toRefs } from '@vue/composition-api'
const nameEnums = {
  云南省: '云南',
  黑龙江省: '黑龙江',
  贵州省: '贵州',
  北京市: '北京',
  河北省: '河北',
  山西省: '山西',
  吉林省: '吉林',
  宁夏回族自治区: '宁夏',
  辽宁省: '辽宁',
  海南省: '海南',
  内蒙古自治区: '内蒙古',
  天津市: '天津',
  新疆维吾尔自治区: '新疆',
  上海市: '上海',
  陕西省: '陕西',
  甘肃省: '甘肃',
  安徽省: '安徽',
  香港特别行政区: '香港',
  广东省: '广东',
  河南省: '河南',
  湖南省: '湖南',
  江西省: '江西',
  四川省: '四川',
  广西壮族自治区: '广西',
  江苏省: '江苏',
  澳门特别行政区: '澳门',
  浙江省: '浙江',
  山东省: '山东',
  青海省: '青海',
  重庆市: '重庆',
  福建省: '福建',
  湖北省: '湖北',
  西藏自治区: '西藏',
  台湾省: '台湾'
}
export default ({request, params}) => {
  const state = reactive({
    result: [],
    loading: true
  })
  const { doResult } = useAsync({
    request,
    successCallBack: ({ code, data }) => {
      const realData = []
      Object.keys(nameEnums).forEach((key) => {
        const realDataItem = {}
        realDataItem.name = nameEnums[key]
        realDataItem.value = 0
        realData.push(realDataItem)
      })
      state.result = realData
      state.loading = false
    }
  })
  // 初始化
  doResult(params)

  return {
    ...toRefs(state)
  }
}
