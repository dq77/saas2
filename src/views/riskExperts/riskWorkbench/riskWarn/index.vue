<template lang="pug">
Card2(title='风险预警' :noWrap='true' :loading='loading')
  template(v-slot:headRight)
    router-link.p-read-more-btn(:to='{name: "riskEvent"}') 查看全部 &gt;
  el-scrollbar(
    :style='`width: 100%; height: ${scrollbarHeight};`'
    v-if='riskList.length > 0'
  )
    .p-risk-list
      RiskItem(
        v-for='(item, index) in riskList'
        :key='index'
        :companyName='item.companyName'
        :uniformCreditCode='item.uniformCreditCode'
        :riskType='item.riskType'
        :riskDesc='item.riskDesc'
        :date='item.date'
      )
  EmptyData(v-else)
</template>

<script>
import { reactive, toRefs, watch } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import store from '@/store'
import EmptyData from '@/components/EmptyData'
import ajaxStore from '@/apis'
import Card2 from './../card2'
import RiskItem from './riskItem'
import { getDataSource } from './../quick/config'
export default {
  components: {
    Card2,
    EmptyData,
    RiskItem,
  },
  setup() {
    const state = reactive({
      riskList: [],
      scrollbarHeight: '297px'
    })
    const { loading } = useAsync({
      request: ajaxStore.riskExperts.workbench.getPagedRisk,
      params: { pageSize: 10, pageNo: 1, isRead: 'N' },
      init: true,
      successCallBack: (res) => {
        if (res?.code === '0') {
          const data = res?.data?.pagedRecords || []
          const riskList = []
          data.forEach(item => {
            riskList.push({
              companyName: item?.corporationName ?? '',
              uniformCreditCode: item?.uniformCreditCode ?? '',
              riskType: item?.riskName ?? '',
              riskDesc: item?.riskSubClassName ?? '',
              date: (item?.eventHitTime ?? '').substr(0, 10)
            })
          })
          state.riskList = riskList
        }
      }
    })

    watch(
      () => store.state.menuPermisssions,
      () => {
        const dataSource = getDataSource()
        dataSource.forEach(item => {
          const index = item.menuTags.findIndex(mt => store.state.menuPermisssions[mt])
          if (index >= 0) {
            item.hasPermission = true
            item.routeName = item.routeNames[index]
          }
        })
        if (dataSource.every(item => item.hasPermission === false)) {
          state.scrollbarHeight = '521px'
        }
      },
      {
        immediate: true
      }
    )
    return {
      loading,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-risk-list
  padding 20px
</style>
