<template lang='pug'>
.overview-tab
  Header(:title='title' :left='20')
    template(slot='header' v-if="title === '赊销应收总览'")
      el-tooltip(placement='top' content='“赊销应收”类型的数据来源于赊销管家')
        i.el-icon-info
    .tab-btns
      el-button(
        v-for='(item, index) in buttonList'
        :key='index'
        :type='currentIndex === index+1 ? "primary" : "default"'
        @click='() => selectHandle(index+1)'
      ) {{ item }}
</template>

<script>
import { computed } from '@vue/composition-api'
import Header from '@/components/qjd/header'
import {
  buttonList
} from './config'
export default {
  props: {
    currentIndex: Number
  },
  components: {
    Header
  },
  setup (props, { emit }) {
    const selectHandle = index => emit('selectHandle', index)
    const title = computed(() => {
      return buttonList[props.currentIndex - 1].replace('全部', '') ?? ''
    })
    return {
      selectHandle,
      buttonList,
      title
    }
  }
}
</script>

<style lang='stylus' scoped>
.overview-tab
  .el-icon-info
    margin-left 8px
  .tab-btns
    margin-right 23px
</style>
