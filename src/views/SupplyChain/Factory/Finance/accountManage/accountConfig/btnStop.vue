<template lang="pug">
el-popconfirm.p-width(
  title='是否停用此账户？禁用后不可通过此账户进行下单或入账。'
  confirm-button-text='停用'
  cancel-button-text='取消'
  @confirm='clickConfirm'
)
  el-button(type='text' slot='reference') 停用
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
      request: ajaxStore.factory.finance.updateAccountStatus,
      init: false,
      params: {
        id: props.rowData.accounId,
        status: 2
      },
      successCallBack: (res) => {
        if (res.code === '0') {
          Message.success('停用账户成功')
          root.emit('success')
        }
      }
    })
    const clickConfirm = () => {
      doResult()
    }

    return {
      clickConfirm
    }
  },
})
</script>
