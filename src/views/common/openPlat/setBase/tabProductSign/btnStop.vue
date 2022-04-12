<template lang="pug">
el-popconfirm.p-width(
  title='标签停用后不可再关联产品，同时已关联此标签的产品将会被取消关联。是否停用此标签？'
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
      request: ajaxStore.factory.finance.updateProductSignStatus,
      init: false,
      params: {
        id: props.rowData.id,
        status: 2
      },
      successCallBack: (res) => {
        if (res.code === '0') {
          Message.success('启用产品标签成功')
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
