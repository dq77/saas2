<template lang="pug">
el-row.row
  PromptInfo(:title='promptTitle')
  el-col.col(:span="8")
    Info(title="进行中的活动数量（个）" :value="totalInfo && toAmountStr(totalInfo.RUNNING || 0, -1, true) || 0 ")
  el-col.col(:span="8")
    Info(title="未开始的活动数量（个）" :value="totalInfo && toAmountStr(totalInfo.INIT || 0, -1, true) || 0 ")
  el-col.col(:span="8")
    Info(title="已结束的活动数量（个）" :value="totalInfo && toAmountStr(totalInfo.EXPIRED || 0, -1, true) || 0 ")
</template>

<script lang="ts">
import Info from '@/components/qjd/info/index.vue'
import PromptInfo from '@/components/qjd/promptInfo/index.vue'
import { toAmountStr } from '@/utils/util'
import { promptTitle } from '../../config'
export default {
  components: {
    Info,
    PromptInfo
  },
  props: {
    totalInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    return {
      toAmountStr,
      promptTitle
    }
  },
}
</script>
<style lang="stylus" scoped>
.row
  background-color #fff
  padding 20px
  margin-bottom 10px
  >.col:not(:last-child)
    padding-right 10px
</style>


