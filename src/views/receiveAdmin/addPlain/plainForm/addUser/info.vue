<template lang="pug">
  .info_box
    customInfo
      span 若无法选到收款对象，请先点击右侧“添加”入口，添加收款对象信息
    el-button(type="text" style="margin-left: 8px" @click="addHandle") 添加
</template>
<script>
import customInfo from '../../../components/customInfo'
export default {
  components: {
    customInfo
  },
  setup(props, { emit }) {
    const addHandle = () => emit('addHandle')

    return {
      addHandle
    }
  },
}
</script>
<style lang="stylus" scoped>
.info_box
  position absolute
  top 0
  left: 334px
</style>
