<template lang="pug">
el-popconfirm.p-width(
  title='账户类型停用后，不可再为客户开通此类账户。是否停用此类账户？'
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
    rowData: Object
  },
  setup(props, root) {
    const { doResult } = useAsync({
      request: ajaxStore.factory.finance.updateAccountTypeStatus,
      init: false,
      params: {
        id: props.rowData.id,
        status: 2
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
