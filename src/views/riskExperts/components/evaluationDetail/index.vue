<template lang="pug">
.p-main
  .p-block
    .p-title 客户基本信息
    .p-slot
      Base(:baseInfo='baseInfo' :mode='mode')
  .p-block(v-if='["ACCURATE_MODE", "STANDARD_MODE"].includes(mode)')
    .p-title 授权状态
    .p-slot
      Auth(:authInfo='authInfo' :mode='mode')
  .p-block(v-if='["ACCURATE_MODE", "STANDARD_MODE"].includes(mode)')
    .p-title 其他信息
    .p-slot
      Other(:otherInfo='otherInfo' :mode='mode')
</template>

<script>
import { reactive, toRefs, watch } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Base from './base/index.vue'
import Auth from './auth/index.vue'
import Other from './other/index.vue'
export default {
  components: {
    Base,
    Auth,
    Other
  },
  props: {
    mode: {
      type: String,
      // FAST_MODE: '快速评估',
      // STANDARD_MODE: '标准评估',
      // ACCURATE_MODE: '精准评估'
      default: 'ACCURATE_MODE'
    },
    taskId: {
      type: String,
      default: ''
    },
  },
  setup(props, { root }) {
    // ajax
    const { riskExperts: { creditEvaluation: { getApplicationInfoById } } } = ajaxStore
    // state
    const state = reactive({
      detailState: {},
      baseInfo: {},
      authInfo: [],
      otherInfo: {},
    })
    // 详情-接口
    state.detailState = useAsync({
      request: getApplicationInfoById,
      params: {id: props.taskId},
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          // 初始化数据
          state.baseInfo = data
          state.authInfo = data.authorizationInfoResponseList?.map((item, index) => {
            item.corporationAuthorization.role = '企业'
            item.corporationAuthorization.titleName = index === 0 ? '评估主体企业授权' : '关联企业授权'
            return {
              tabCol: {
                label: index === 0 ? '主体企业' : '关联企业' + index,
                value: (index + 1).toString()
              },
              list: [item.corporationAuthorization, ...item.personalAuthorizationList].filter(item => {
                return item.isNeedAuthorized === 'Y'
              })
            }
          }) ?? []
          state.otherInfo = data
          console.log(999, state.authInfo)
        }
      }
    })
    watch(() => props.mode, (val) => {
      console.log(val, 1)
    }, { immediate: true })
    watch(() => props.taskId, (val, preVal) => {
      console.log(val, 2)
    }, { immediate: true })
    return {
      ...toRefs(state)
    }
  }

}
</script>

<style lang="stylus" scoped>
.p-main
  pading 20px
  .p-block
    padding-bottom 30px
    .p-title
      font-size 16px
      font-weight 600
      color #000
    .p-slot
      margin-top 10px
</style>
