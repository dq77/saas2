<template lang='pug'>
.plan
  Header(title='应收方案配置' :left='20')
  Configuration.plan-content
</template>

<script>
import Header from '@/components/qjd/header'
import Configuration from './configuration'
import Save from '../components/save'
// import { reactive, ref, toRefs } from '@vue/composition-api'
export default {
  components: {
    Header,
    Configuration,
    Save
  },
  setup (props) {
    return {}
  }
}
</script>

<style lang='stylus' scoped>
.plan
  background #fff
.plan-content
  padding 20px
</style>
