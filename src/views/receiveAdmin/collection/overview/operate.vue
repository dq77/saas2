<template lang="pug">
fragment
  fragment
    el-button(type='text' @click='go("CollectionDetail")') 查看
  fragment
    el-button(type='text' @click='go("CreateCollection")') 添加记录
  fragment
    el-button(type='text' @click='go("CreateCollecttonPayment")') 阶段回款
</template>
<script>

export default {
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { root: { $router } }) {
    const customerId = props?.dataSource?.customerId ?? ''
    const customerName = props?.dataSource?.customerName ?? ''
    const go = (name) => {
      $router.push({ name: name, query: { customerId, customerName } })
    }
    return {
      go
    }
  },
}
</script>
