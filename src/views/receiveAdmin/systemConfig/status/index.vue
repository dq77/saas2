<template lang='pug'>
.status
  Header(title='收款状态配置' :left='20')
  .status-content
    Configuration(:options='options' :dictCategoryCode='dictCategoryCode' v-loading='loading')
    Config(:selectList='list')
  DialogAddConfig(
    :title='title'
    :dictCategoryCode='dictCategoryCode'
    :visible='visible'
    :cFormData='formData'
    :cFormConfig='formConfig'
    :cFormRules='formRules'
  )
</template>

<script>
import Header from '@/components/qjd/header'
import Configuration from '../components/configuration'
import Config from './configuration'
import DialogAddConfig from '../components/dialogAddConfig'
import { reactive, toRefs } from '@vue/composition-api'
import { useEventBus } from '@vueuse/core'
import ajaxStore from '@/apis'
import useButton from '../useButton'
import { title, formData, formConfig, formRules } from './config'
import { STATUS } from '../config'

export default {
  components: {
    Header,
    Configuration,
    Config,
    DialogAddConfig
  },
  setup (props) {
    // ajaxStore
    const { receive: { configGetMenuList } } = ajaxStore
    const state = reactive({
      visible: false,
      defaultChoose: null,
      options: [
        {
          title: '默认收款状态',
          list: null
        },
        {
          title: '自定义收款状态：',
          isCustomize: true,
          list: null
        },
      ],
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
      const { id } = data
      state.list && state.list.forEach(item => { // 默认及自定义状态修改
        if (item.id === id) {
          item.isConfiguration = true
        }
      })
    }
    busChoose.on(chooseHandle)
    // initHandle
    const initHandle = async() => {
      const { code } = await doResult()
      if (code === '0') {
        state.options[0].list = defaultList.value
        state.options[1].list = customizeList.value
        state.list = list.value
      }
    }
    busInit.on(initHandle)
    // useButton
    const { loading, doResult, defaultList, customizeList, list } = useButton({
      api: configGetMenuList,
      params: { dictCategoryCode: STATUS }
    })
    initHandle()

    return {
      title,
      formData,
      formConfig,
      formRules,
      loading,
      dictCategoryCode: STATUS,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.status
  background #fff
.status-content
  padding 16px 20px 0
</style>
