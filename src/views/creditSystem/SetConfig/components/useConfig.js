import { ref } from '@vue/composition-api'
import { nextData } from './consts'

export default ({ menuTag = '' }) => {
  // 存储权限数据
  const nextDataSource = ref([])
  // 下一步key
  const currentKey = ref('')
  // 是否显示下一步
  const isShow = ref(false)
  // 设置下一步key
  const setCurrentKey = value => { currentKey.value = value }
  // 设置当前权限数据
  const setNextData = (value, tag) => {
    // 自定义tag
    if (tag) {
      menuTag = tag === 'ruleConfig' ? null : tag
    }
    // 缓存权限数据
    if (!nextDataSource.value?.length) {
      nextDataSource.value = value
    }
    // 无数据且缓存无数据return
    if (!value && !nextDataSource.value.length) return
    // 无mengTag表示下一步为启用规则策略
    if (!menuTag) {
      isShow.value = true
      currentKey.value = 'ruleConfig'
      return
    }
    // length
    const { length } = nextDataSource.value ?? []
    // 当前步骤
    const currentStep = nextDataSource.value.findIndex(item => item.menuTag === menuTag)
    // 下一步
    const nextStep = currentStep + 1
    if (nextStep === length || length < 2) {
      // 若是最后一步或者步骤小于2，不显示下一步
      isShow.value = false
      currentKey.value = null
    } else {
      isShow.value = true
      const currentMenuTag = nextDataSource.value?.[nextStep]?.menuTag
      const key = Object.keys(nextData)?.find(key => nextData[key]?.menuTag === currentMenuTag)
      currentKey.value = key ?? ''
    }
  }

  return {
    currentKey,
    isShow,
    nextDataSource,
    setCurrentKey,
    setNextData
  }
}
