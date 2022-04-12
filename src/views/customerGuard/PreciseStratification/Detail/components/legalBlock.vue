<template lang="pug">
.p-main
  .p-card
    Card(title='法人代表信息')
      BaseInfo(:baseInfo='legalInfo' :result='baseState.result')
      SourceUpload(:uploadObj='uploadObj' :isSpouse='false')
  .p-card
    Card(title='法人代表配偶信息')
      BaseInfo(:baseInfo='spouseLegalInfo' :result='spouseBaseState.result')
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
import SourceUpload from './sourceUploadLegal'
import Table from '@/components/qjd/table'
import useArea from '@/hooks/common/useArea'
import useBase from '../hooks/useBase'
import { toPrefixUrl } from '@/utils/util'
import { baseUrl } from '@/utils/config'
import { columns, baseConfig, spouseBaseConfig } from '../config/legalConfig'

export default {
  props: {
    legalInfo: {
      type: Object,
      defaultValue: () => {}
    },
    legalMaterialList: {
      type: Array,
      defaultValue: () => []
    },
    legalHouseList: {
      type: Array,
      defaultValue: () => []
    },
    spouseLegalInfo: {
      type: Object,
      defaultValue: () => {}
    },
    spouseLegalMaterialList: {
      type: Array,
      defaultValue: () => []
    },
    spouseLegalHouseList: {
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
    const initLegalMaterialList = (val) => {
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
    const initLegalHouseList = (val) => {
      state.houseList = val
      state.tableList = [...val, ...state.spouseHouseList]
    }
    const initSpouseLegalMaterialList = (val) => {
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
    const initSpouseLegalHouseList = (val) => {
      state.spouseHouseList = val
      state.tableList = [...state.houseList, ...val]
    }
    watch(() => props.legalMaterialList, (val, preVal) => {
      initLegalMaterialList(val)
    }, { immediate: true })
    watch(() => props.legalHouseList, (val, preVal) => {
      initLegalHouseList(val)
    }, { immediate: true })
    watch(() => props.spouseLegalMaterialList, (val, preVal) => {
      initSpouseLegalMaterialList(val)
    }, { immediate: true })
    watch(() => props.spouseLegalHouseList, (val, preVal) => {
      initSpouseLegalHouseList(val)
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
