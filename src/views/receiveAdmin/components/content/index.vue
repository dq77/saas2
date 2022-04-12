<template lang="pug">
.receive_content
  .plain_content
    Plain(ref="plainRef")
  .pay_content
    Pay(ref="payRef" :moneyInfo="moneyInfo" @successHandle="() => refreshHandle()")
</template>
<script>
import { provide, ref } from '@vue/composition-api'
import Plain from './plain/index.vue'
import Pay from './pay/index.vue'

export default {
  components: {
    Plain,
    Pay
  },
  setup() {
    // ref
    const payRef = ref()
    const plainRef = ref()
    // 更新计划
    const refreshHandle = () => plainRef.value && plainRef.value.refreshHandle()
    // 打开添加款项弹窗
    const openHandle = () => payRef.value && payRef.value.addModalApis.open(null, 'add')
    // 记录应收总金额
    const moneyInfo = ref({})
    provide('moneyInfo', moneyInfo)

    return {
      payRef,
      plainRef,
      moneyInfo,
      openHandle,
      refreshHandle
    }
  },
}
</script>
<style lang="stylus" scoped>
.receive_content
  display: flex
  overflow: hidden
  background: #fff
  min-height: calc(100% - 273px)
  overflow: hidden
  .plain_content
    box-sizing: border-box
    width: 300px
    border-right: 1px solid rgba(234, 235, 238, 1)
  .pay_content
    padding: 20px
    box-sizing: border-box
    flex: 1
</style>
