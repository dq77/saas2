<template lang="pug">
el-scrollbar(style="width: 100%; height: 100%;")
  .card_wrap
    .card_item(
      v-for="item in columns"
      :key="item.key"
    )
      .card_item_label {{ item.label }}
      .card_item_value {{ item.integer ? dataSource[item.key] : dataSource ? percent2(dataSource[item.key]) : '' }}
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import { percent2 } from '@/utils/qjd'

export default defineComponent({
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    },
    columns: Array
  },
  setup() {
    return {
      percent2
    }
  },
})
</script>
<style lang="stylus" scoped>
.card_wrap
  display: flex
  padding: 20px 15px
  background: #fff
  flex-wrap: nowrap
  .card_item
    flex: 1
    display: flex
    flex-direction: column
    justify-content: center
    height: 100px
    margin: 0 5px
    background: #F8F9FA
    box-sizing: border-box
    padding-left: 35px
    min-width: 200px
    .card_item_label
      font-size 12px
      color: #383B42
      margin-bottom: 3px
    .card_item_value
      height: 37px;
      font-size: 1.2vw;
      font-weight: 500;
      color: #383B42;
      line-height: 37px;
</style>
