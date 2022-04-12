<template lang="pug">
.p-main
  .p-card
    Card(title='基础信息')
      BaseInfo(:baseInfo='baseInfo' :result='baseState.result')
        template(slot='time') {{baseInfo.time.fromTime}} 至 {{baseInfo.time.toTime || '长期'}}
  .p-card
    Card(title='股东及出资信息')
      Table(
        :dataSource="tableList"
        :columns="columns"
      )
  .p-card
    Card(title='影像及协议资料')
      SourceUpload(:uploadObj='uploadObj' ref='uploadRef')
</template>
<script>
import { reactive, toRefs, watch } from '@vue/composition-api'
import Card from './card'
import BaseInfo from './baseInfo'
import SourceUpload from './sourceUploadCompany'
import Table from '@/components/qjd/table'
import useBase from '../hooks/useBase'
import { columns, baseConfig } from '../config/companyConfig'

export default {
  props: {
    companyInfo: {
      type: Object,
      defaultValue: () => {}
    },
    companyStockList: {
      type: Array,
      defaultValue: () => []
    },
    companyMaterialList: {
      type: Array,
      defaultValue: () => []
    }
  },
  components: {
    Card,
    BaseInfo,
    SourceUpload,
    Table,
  },
  setup(props, {emit}) {
    // state
    const state = reactive({
      baseState: {},
      baseInfo: {},
      tableList: [],
      uploadObj: {
        bankInfo: [],
        reportInfo: [],
        dealInfo: [],
      }
    })
    state.baseState = useBase({baseList: baseConfig})
    // 初始化
    const initCompanyInfo = (val) => {
      const formData = {...val}
      formData.time = {
        fromTime: val.fromTime,
        toTime: val.toTime,
        isLong: !val.toTime,
      }
      delete formData.fromTime
      delete formData.toTime
      state.baseInfo = formData
    }
    const initCompanyStockList = (val) => {
      state.tableList = [...val]
    }
    const initCompanyMaterialList = (val) => {
      const uploadObj = {
        bankInfo: [],
        reportInfo: [],
        dealInfo: [],
      }
      // 根据type 资料类型 企业征信报告 C0001 银行流水 C0002 授权书 C0003 个人征信报告 C0004 房产证 C0005
      val.forEach(item => {
        switch (item.type) {
          case 'C0001':
            uploadObj.reportInfo.push(item)
            break
          case 'C0002':
            uploadObj.bankInfo.push(item)
            break
          case 'C0003':
            uploadObj.dealInfo.push(item)
            break
        }
        state.uploadObj = {...uploadObj}
      })
    }
    watch(() => props.companyInfo, (val, preVal) => {
      initCompanyInfo(val)
    }, { immediate: true })
    watch(() => props.companyStockList, (val, preVal) => {
      initCompanyStockList(val)
    }, { immediate: true })
    watch(() => props.companyMaterialList, (val, preVal) => {
      initCompanyMaterialList(val)
    }, { immediate: true })
    return {
      columns,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-main
  padding 10px 20px 20px 20px
  position relative
</style>
