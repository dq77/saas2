<template lang="pug">
.subscription-connect
  template(v-if='companyName')
    BaseInfo.subscription-module(:companyName='companyName' :isSubscription='true'  @actualCompanyName='setActualCompanyName')
    Tabs.subscription-module(:companyName='companyName'  :actualCompanyName='actualCompanyName')
  .empty(v-else) 暂无数据
</template>
<script>
import BaseInfo from '../RelatedRealEstate/baseInfo'
import Tabs from '../RelatedRealEstate/tabs'
import { toRefs, reactive } from '@vue/composition-api'
export default {
  props: {
    companyName: {
      type: String,
      default: ''
    }
  },
  components: { BaseInfo, Tabs },
  setup(props, { root }) {
    const state = reactive({
      actualCompanyName: ''
    })

    const setActualCompanyName = (name) => {
      state.actualCompanyName = name
    }

    return {
      setActualCompanyName,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="stylus" scoped>
.subscription-module
  margin-bottom 8px
.empty
  height 500px
  background #fff
  border-radius 4px
  display flex
  align-items center
  justify-content center
  color #494949
</style>
