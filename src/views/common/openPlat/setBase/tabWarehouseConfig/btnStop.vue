<template lang="pug">
el-popconfirm.p-width(
  title='是否停用此仓库？'
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
      request: ajaxStore.factory.setBase.disabledWarehouse,
      init: false,
      params: {
        wmWarehouseInfoId: props.rowData.id,
      },
      successCallBack: (res) => {
        if (res.code === '0') {
          Message.success('停用仓库成功')
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
