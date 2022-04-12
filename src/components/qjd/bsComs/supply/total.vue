<template lang="pug">
.total_box
  .total_number(
    :class="getPosColor(sum)"
  ) 合计：{{ getPosNUm(sum) }}
</template>
<script lang="ts">
import { getPosNUm, getPosColor } from '@/utils/qjd'

export default {
  props: {
    sum: [Number, String]
  },
  setup() {
    return {
      getPosNUm,
      getPosColor
    }
  }
}
</script>
<style lang="stylus" scoped>
.total_box
  padding 20px 20px
  background: #fef8e1
  .total_number
    font-size 14px
    text-align: right
</style>
