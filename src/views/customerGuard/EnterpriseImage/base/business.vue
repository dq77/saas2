<template lang="pug">
.business-main
  .home-title 工商信息
  .base-content(v-if='info' v-loading='loading')
    DescriptionsTable(:columns='businessColumns' :dataSource='info')
      template(slot='businessScopeMore')
        span(v-if='!info.needOpen') {{ info.businessScope || '-'}}
        span(v-else) {{ businessScopeMore ? info.businessScope : info.businessScopeLimit }}
          template(v-if='info.needOpen')
            span.u-btn-open(v-if='businessScopeMore' @click='showBusinessScope') 收起
            span(v-else) ...
              span.u-btn-open(@click='showBusinessScope') 展开
  .u-empty-tips(v-else) 暂无数据

</template>

<script>
import { toRefs, reactive, inject } from '@vue/composition-api'
import { businessColumns } from './config'
import DescriptionsTable from './descriptionsTable'
export default {
  components: {
    DescriptionsTable
  },
  setup(props) {
    const state = reactive({
      businessScopeMore: false,
      info: null
    })

    const showBusinessScope = () => {
      state.businessScopeMore = !state.businessScopeMore
    }

    const { loading, result } = inject('baseInfo')
    state.info = result?.value?.companyBaseBO

    return {
      loading,
      showBusinessScope,
      businessColumns,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
.business-main
  margin-bottom 45px
.u-btn-open
  color #3B68F0
  cursor pointer
</style>
