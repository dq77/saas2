<template lang="pug">
.types_box(v-loading="loading")
  .types_content(v-if="kinds && kinds.length")
    .types_item(
      v-for="(item, index) in dataSoure"
      :key="index"
      :class="current === item.type ? 'types_item_current' : ''"
      v-show="kinds.includes(item.kind)"
    )
      i.icon.iconfont.iconshouxinbiaoqian.custom_icon
      .types_title(v-if="index === 0") 厂家渠道类
      .types_title(v-if="index === dataSoure.length - 1")  直签业务类
      .types_item_title {{ item.title }}
      .types_item_content {{ item.content }}
      .types_item_btn(@click="() => selectHandle(item)") 选择
  .types_empty(v-else) {{ emptyTxt }}
  .types_btn_box(v-if="isShow")
    el-button(type="primary" @click="toConfigHandle") 去配置赊销类型
</template>
<script>
import { computed, ref, watch } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import store from '@/store'
import router from '@/router'

export default {
  props: {
    dataSoure: {
      type: Array,
      default: () => ([])
    },
    currentType: String
  },
  setup(props, { emit }) {
    const current = ref()
    // store
    const { state: { permissions } } = store
    // 存储已配置的授信类型
    const kinds = ref([])
    // ajax
    const { credit: { getCreditTypes } } = ajaxStore
    // 获取授信类型配置
    const { loading } = useAsync({
      request: getCreditTypes,
      params: { configKey: 'credit_type' },
      successCallBack: ({ code, data }) => {
        kinds.value = code === '0' ? (data?.configValue ? data?.configValue?.split(',') || [] : []) : []
      }
    })
    // 空态文案
    const emptyTxt = computed(() => `我们还没有可以申请的授信类型！${permissions['PTN:SUPPLIER:SAASCREDIT_TYPE:MANAGE'] ? '' : '请联系管理员'}`)
    // 是否显示去配置赊销类型按钮
    const isShow = computed(() => permissions['PTN:SUPPLIER:SAASCREDIT_TYPE:MANAGE'] && !kinds.value?.length)

    watch(
      () => props.currentType,
      val => { current.value = val }
    )

    const selectHandle = item => {
      const { type } = item || {}
      current.value = type
      emit('selectHandle', item)
    }

    const toConfigHandle = () => router.push({ name: 'creditType' })

    return {
      current,
      kinds,
      loading,
      emptyTxt,
      isShow,
      selectHandle,
      toConfigHandle
    }
  },
}
</script>
<style lang="stylus" scoped>
@import './types.styl';
</style>
