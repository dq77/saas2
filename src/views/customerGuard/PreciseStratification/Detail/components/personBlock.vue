<template lang="pug">
.p-main
  .p-card
    Card(title='实控人信息')
      BaseInfo(:baseInfo='personInfo' :result='baseState.result')
      SourceUpload(:uploadObj='uploadObj' :isSpouse='false')
  .p-card
    Card(title='实控人配偶信息')
      BaseInfo(:baseInfo='spousePersonInfo' :result='spouseBaseState.result')
      SourceUpload(:uploadObj='spouseUploadObj' :isSpouse='true')
  .p-card
    Card(title='房产信息')
      Table(
        :dataSource="tableList"
        :columns="columns"
      )
        template(slot='locateLocationCode' slot-scope="{ row }") {{getAddress(row.locateLocationCode)}}
        template(slot='fileKey' slot-scope="{ row }")
          a(v-if='row.fileKey' :href='`${baseUrl}/partner/common/file/download?fileKey=${row.fileKey}`', target='_blank') 房产附件
</template>
<script>
import { reactive, toRefs, watch } from '@vue/composition-api'
import Card from './card'
import BaseInfo from './baseInfo'
import SourceUpload from './sourceUploadPerson'
import Table from '@/components/qjd/table'
import useArea from '@/hooks/common/useArea'
import useBase from '../hooks/useBase'
import { toPrefixUrl } from '@/utils/util'
import { baseUrl } from '@/utils/config'
import { columns, baseConfig, spouseBaseConfig } from '../config/personConfig'

export default {
  props: {
    personInfo: {
      type: Object,
      defaultValue: () => {}
    },
    personMaterialList: {
      type: Array,
      defaultValue: () => []
    },
    personHouseList: {
      type: Array,
      defaultValue: () => []
    },
    spousePersonInfo: {
      type: Object,
      defaultValue: () => {}
    },
    spousePersonMaterialList: {
      type: Array,
      defaultValue: () => []
    },
    spousePersonHouseList: {
      type: Array,
      defaultValue: () => []
    },
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
      loading: false,
      areaState: {},
      baseState: {},
      spouseBaseState: {},
      tableList: [],
      houseList: [],
      spouseHouseList: [],
      uploadObj: {
        bankInfo: [],
        reportInfo: [],
        dealInfo: [],
      },
      spouseUploadObj: {
        spouseBankInfo: [],
        spouseReportInfo: [],
        spouseDealInfo: []
      }
    })
    state.baseState = useBase({baseList: baseConfig})
    state.spouseBaseState = useBase({baseList: spouseBaseConfig})
    // 转换省市区
    state.areaState = useArea()
    state.areaState.doResult()
    const getAddress = (codeList) => {
      let result = ''
      codeList.forEach(codeObj => {
        result = result + state.areaState.flatCitys?.[codeObj]?.name
      })
      return result
    }
    // 初始化
    const initPersonMaterialList = (val) => {
      const uploadObj = {
        bankInfo: [],
        reportInfo: [],
        dealInfo: [],
      }
      // 根据type 资料类型 企业征信报告 C0001 银行流水 C0002 授权书 C0003 个人征信报告 C0004 房产证 C0005
      val.forEach(item => {
        switch (item.type) {
          case 'C0004':
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
    const initPersonHouseList = (val) => {
      state.houseList = val
      state.tableList = [...val, ...state.spouseHouseList]
    }
    const initSpousePersonMaterialList = (val) => {
      const uploadObj = {
        spouseBankInfo: [],
        spouseReportInfo: [],
        spouseDealInfo: []
      }
      // 根据type 资料类型 企业征信报告 C0001 银行流水 C0002 授权书 C0003 个人征信报告 C0004 房产证 C0005
      val.forEach(item => {
        switch (item.type) {
          case 'C0004':
            uploadObj.spouseReportInfo.push(item)
            break
          case 'C0002':
            uploadObj.spouseBankInfo.push(item)
            break
          case 'C0003':
            uploadObj.spouseDealInfo.push(item)
            break
        }
        state.spouseUploadObj = {...uploadObj}
      })
    }
    const initSpousePersonHouseList = (val) => {
      state.spouseHouseList = val
      state.tableList = [...state.houseList, ...val]
    }
    watch(() => props.personMaterialList, (val, preVal) => {
      initPersonMaterialList(val)
    }, { immediate: true })
    watch(() => props.personHouseList, (val, preVal) => {
      initPersonHouseList(val)
    }, { immediate: true })
    watch(() => props.spousePersonMaterialList, (val, preVal) => {
      initSpousePersonMaterialList(val)
    }, { immediate: true })
    watch(() => props.spousePersonHouseList, (val, preVal) => {
      initSpousePersonHouseList(val)
    }, { immediate: true })
    return {
      toPrefixUrl,
      baseUrl,
      getAddress,
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
