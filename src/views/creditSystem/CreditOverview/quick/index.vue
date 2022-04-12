<template lang="pug">
.quick_box
  .quck_left
    Operate(v-if="isPower")
    Task(:isPower="isPower")
  .quck_right(v-if="isPower")
    Calendar
</template>
<script>
import Operate from './operate'
import Task from './task'
import Calendar from './calendar'
import store from '@/store'
import { computed } from '@vue/composition-api'

export default {
  components: {
    Operate,
    Task,
    Calendar
  },
  setup() {
    // store
    const { state: { menuPermisssions } } = store
    // 场景操作模块是否有权限
    const isPower = computed(() => menuPermisssions.credit_system_launch_add || menuPermisssions.credit_system_create_use || menuPermisssions.credit_system_create_pay)

    return {
      menuPermisssions,
      isPower
    }
  }
}
</script>
<style lang="stylus" scoped>
.quick_box
  display flex
  overflow hidden
  margin-bottom 10px
  .quck_left
    flex 1
    margin-right 10px
    background #fff
    overflow: auto
  .quck_right
    width 324px
    background #fff
</style>
