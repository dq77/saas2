<template lang='pug'>
el-dialog.rmn-dialog(
  width='509px'
  :show-close='true'
  title='新闻舆情配置'
  :visible.sync='visible'
  custom-class='el-dialog-new'
  :close-on-click-modal='false'
  :before-close='beforeClose'
)
  el-form.rmnd-form(
    ref='dialogAddForm'
    :rules='rules'
    :model='form'
  )
    el-form-item(prop='shortName')
      .rmnd-form__item-label 企业简称
      el-input.rmnd-form__item-value(type='textarea' autosize placeholder='多个企业之间用“，”隔开' v-model='form.shortName')
  .rmnd-remind 提示：多个企业之间用“，”隔开。若不再接收该企业新闻舆情，可清空企业简称。
  span(slot='footer')
    el-button(@click='beforeClose' size='small' weblogs-anchor='customerGuard-risk-config-cancel') 取消
    el-button(type='primary' :loading='loading' @click='checkHasData' size='small' weblogs-anchor='customerGuard-risk-config-confirm') 确定
</template>

<script>
import { ref, toRefs, reactive, watch } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default {
  props: {
    selected: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['refreshList'],
  setup(props, { emit }) {
    // state
    const visible = ref(false)
    const state = reactive({
      rules: {},
      form: {
        shortName: ''
      }
    })
    // api
    const { updateShortName } = ajaxStore.risk

    const beforeClose = () => {
      visible.value = false
      state.form.shortName = ''
    }

    const checkHasData = async () => {
      const shortName = state.form.shortName && state.form.shortName.replace(/，/g, ',')
      const params = {
        companyName: props.selected.companyName,
        shortName: shortName
      }
      doResult(params)
    }
    // 确定
    const { loading, doResult } = useAsync({
      init: false,
      isLoading: true,
      request: updateShortName,
      successCallBack: ({ code }) => {
        if (code === '0') {
          emit('refreshList')
          beforeClose()
        }
      }
    })

    watch(visible, (value) => {
      if (value) state.form.shortName = (props.selected.shortName && props.selected.shortName.replace(/,/g, '，'))
    })

    return {
      visible,
      ...toRefs(state),
      beforeClose,
      checkHasData,
      loading
    }
  }
}
</script>

<style lang='stylus' scoped>
.rmnd-remind
  font-size 12px
  color #909399

/deep/ textarea
  resize none
</style>
