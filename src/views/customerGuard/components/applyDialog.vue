<template lang="pug">
el-dialog(title='新增订阅' :visible.sync='visible' center width='330px' :before-close='close')
  el-select(v-model='selectItem.companyName' filterable clearable remote :remote-method='remoteProductList' :loading='loading' placeholder='请输入企业名称' style='width:100%' @change='selectOption')
    el-option(v-for='(item, index) in pagedRecords' :label='item.companyName' :value='item.companyName' :key='index')
  span(slot='footer')
    el-button(@click='close') 取消
    el-button(type='primary' @click='addReleateProduct' :disabled='submitLoading') 确定
</template>

<script>
import { toRefs, reactive, watch } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
export default {
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    },
    companyName: {
      type: String,
      default: ''
    }
  },
  setup(props, { root, emit }) {
    const state = reactive({
      selectItem: {
        companyName: '',
        creditCode: ''
      },
      pagedRecords: [],
      visible: false
    })

    const { getCompanyList, applyReport } = ajaxStore.customer.enterprise

    const { doResult, loading } = useAsync({
      request: getCompanyList,
      init: false,
      successCallBack: (res) => {
        state.pagedRecords = res.data.list
      }
    })

    const remoteProductList = (query) => {
      if (query) {
        doResult({
          name: query,
          pageNo: 1,
          pageSize: 20
        })
      }
    }

    const { doResult: submit, loading: submitLoading } = useAsync({
      request: applyReport,
      init: false,
      successCallBack: () => {
        if (root.$route.name !== 'enterpriseMySubscription') {
          root.$message.success('申请成功，请到我的订阅中下载查看')
        } else {
          root.$message.success('申请成功')
        }
        emit('refresh')
        close()
      }
    })

    const addReleateProduct = () => {
      const { companyName, creditCode } = state.selectItem
      submit({
        corpName: companyName,
        regCode: creditCode
      })
    }

    const close = () => {
      state.selectItem.companyName = ''
      state.selectItem.creditCode = ''
      state.pagedRecords = []
      state.visible = false
      emit('close', false)
    }

    const selectOption = (val) => {
      state.pagedRecords.forEach((item) => {
        if (item.companyName === val) {
          state.selectItem = item
        }
      })
    }

    watch(
      () => props.dialogShow,
      (value) => {
        state.visible = value
      }
    )

    watch(
      () => props.companyName,
      (value) => {
        if (value) {
          state.selectItem.companyName = value
          addReleateProduct()
        }
      }
    )

    return {
      loading,
      remoteProductList,
      addReleateProduct,
      close,
      submitLoading,
      selectOption,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
