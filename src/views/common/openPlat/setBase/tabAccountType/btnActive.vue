<template lang="pug">
el-popconfirm.p-width(
  title='是否启用此类账户？'
  confirm-button-text='启用'
  cancel-button-text='取消'
  @confirm='clickConfirm'
)
  el-button(type='text' slot='reference') 启用
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { Message } from 'element-ui'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default defineComponent({
  props: {
    rowData: Object
  },
  setup(props, root) {
    const { doResult } = useAsync({
      request: ajaxStore.factory.finance.updateAccountTypeStatus,
      init: false,
      params: {
        id: props.rowData.id,
        status: 1
      },
      successCallBack: (res) => {
        if (res.code === '0') {
          Message.success('停用账户类型成功')
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
