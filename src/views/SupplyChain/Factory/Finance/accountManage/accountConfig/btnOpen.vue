<template lang="pug">
el-popconfirm.p-width(
  :title='`确认要开通${rowData.accountTypeName}账号吗？`'
  confirm-button-text='确认'
  cancel-button-text='取消'
  @confirm='clickConfirm'
)
  el-button(type='text' slot='reference') 开通账户
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { Message } from 'element-ui'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default defineComponent({
  props: {
    rowData: Object,
    customerId: String,
  },
  setup(props, root) {
    const { doResult } = useAsync({
      request: ajaxStore.factory.finance.openAccount,
      init: false,
      successCallBack: (res) => {
        if (res.code === '0') {
          Message.success('启用账户成功')
          root.emit('success')
        }
      }
    })
    const clickConfirm = () => {
      doResult({
        customerId: props.customerId,
        accountTypeCode: props.rowData.accountTypeCode,
      })
    }

    return {
      clickConfirm
    }
  },
})
</script>
