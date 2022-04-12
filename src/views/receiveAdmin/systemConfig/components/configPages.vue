<template lang='pug'>
.config-page
  .receivable-content(v-loading='loading')
    Configuration(:options='options')
    ConfigDragChoose(:choose='choose')
  Noice
  Save(
    :list='choose.list'
    :dictCategoryCode='dictCategoryCode'
  )
  DialogAddConfig(
    :title='title'
    :dictCategoryCode='dictCategoryCode'
    :cFormData='formData'
    :cFormConfig='formConfig'
    :cFormRules='formRules'
    :visible='visible'
  )
</template>

<script>
import Configuration from './configuration'
import ConfigDragChoose from './configDragChoose'
import Noice from './noice'
import Save from './save'
import DialogAddConfig from './dialogAddConfig'
import { reactive, toRefs } from '@vue/composition-api'
import { useEventBus } from '@vueuse/core'
import ajaxStore from '@/apis'
import useButton from '../useButton'

export default {
  props: {
    title: String,
    dictCategoryCode: String,
    formData: {
      type: Object,
      default: () => ({})
    },
    formRules: {
      type: Object,
      default: () => ({})
    },
    formConfig: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    Configuration,
    ConfigDragChoose,
    Noice,
    Save,
    DialogAddConfig
  },
  setup (props) {
    // ajaxStore
    const { receive: { configGetMenuList } } = ajaxStore
    // state
    const state = reactive({
      visible: false,
      options: [
        {
          title: '默认款项类型：',
          list: null
        },
        {
          title: '自定义款项类型：',
          isCustomize: true,
          list: null
        }
      ],
      choose: {
        title: '请将您需要的款项类型拖至此处：',
        list: null
      },
      list: null
    })
    // useEventBus
    const busCancel = useEventBus('cancleHandle')
    const busChoose = useEventBus('chooseHandle')
    const busInit = useEventBus('initHandle')
    // methods
    // cancleHandle
    const cancleHandle = (visible) => { state.visible = visible }
    busCancel.on(cancleHandle)
    // chooseHandle
    const chooseHandle = (data = {}) => {
      const { id, isAdd } = data
      let current = null // 当前拖到按钮对象
      state.list && state.list.forEach(item => { // 默认及自定义状态修改
        if (item.id === id) {
          item.dictStatus = isAdd ? '1' : '0'
          const { defaultList, customizeList } = initList(state.list)
          state.options[0].list = defaultList
          state.options[1].list = customizeList
          current = item
        }
      })
      // 框内数据 是否添加
      if (isAdd) {
        const result = state.choose.list.some(item => item.id === id)
        if (!result && !!current) state.choose.list.push(current)
      } else {
        state.choose.list = state.choose.list.filter(item => item.id !== id)
      }
    }
    busChoose.on(chooseHandle)
    // initHandle
    const initHandle = async() => {
      const { code } = await doResult()
      if (code === '0') {
        state.options[0].list = defaultList.value
        state.options[1].list = customizeList.value
        state.choose.list = chooseList.value
        state.list = list.value
      }
    }
    busInit.on(initHandle)
    // useButton
    const { loading, doResult, defaultList, customizeList, chooseList, list, initList } = useButton({
      api: configGetMenuList,
      params: { dictCategoryCode: props.dictCategoryCode }
    })
    initHandle()

    return {
      loading,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.receivable
  background #fff
.receivable-content
  padding 16px 20px 0
</style>
