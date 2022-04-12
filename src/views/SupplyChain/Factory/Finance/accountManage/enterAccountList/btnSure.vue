<template lang="pug">
el-popconfirm.p-width(
  title='是否确认入账？'
  confirm-button-text='确认'
  cancel-button-text='取消'
  @confirm='clickConfirm'
)
  el-button(type='text' slot='reference') 确认入账
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { Message } from 'element-ui'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default defineComponent({
  props: {
    rowData: Object,
  },
  setup(props, root) {
    const { doResult } = useAsync({
      request: ajaxStore.factory.finance.sureBill,
      init: false,
      params: {
        id: props.rowData.id,
      },
      successCallBack: (res) => {
        if (res.code === '0') {
          Message.success('确认入账成功')
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
