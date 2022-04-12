<template lang="pug">
.p-common-stage
  .u-btns
    el-button(@click='clickCreateModel') 添加策略模型
  .u-model-blocks
    ModelBlock(
      v-for='(item, index) in modelArr'
      :key='index'
      :data='item'
      :urgeWay='urgeWay'
      @changeSuccess='changeSuccess'
      @clickChange='clickChangeModel(item, index)'
    )
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import ModelBlock from './modelBlock'

export default defineComponent({
  components: {
    ModelBlock
  },
  props: {
    modelArr: Array,
    urgeWay: String,
  },
  setup(props, { emit }) {
    const changeSuccess = () => emit('changeSuccess')
    const clickCreateModel = () => emit('clickCreateModel')
    const clickChangeModel = (model, index) => emit('clickChangeModel', model, index)
    return {
      changeSuccess,
      clickCreateModel,
      clickChangeModel,
    }
  },
})
</script>

<style lang="stylus" scoped>
.p-common-stage
  padding 20px 45px
  >>>.p-model-block
    margin-right: 20px
    margin-bottom: 20px
  .u-btns
    margin-bottom: 10px
</style>
