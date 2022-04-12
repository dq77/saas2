<template lang="pug">
.p-main
  .p-block(v-if='mode==="ACCURATE_MODE"')
    .p-title 客户资料
    .p-slot
      Table(:dataSource="otherInfo.uploadFiles" :columns="columns1")
        template(slot='filePath' slot-scope='{row}')
          el-button(type='text' @click='downlaodTemplate(row)') 下载
  .p-block
    .p-title 历年出货金额
    .p-slot
      Table(:dataSource="otherInfo.historyShipmentList" :columns="columns2")
      .p-total-line
        .p-total-label 本年预估出货金额
        .p-total-value {{(otherInfo.expectedShipment || otherInfo.expectedShipment === 0) ? percent2(otherInfo.expectedShipment) + '万元' : '- -'}}
      .p-total-line
        .p-total-label
          div 企业下房产总价值
          div （含企业主）
        .p-total-value {{(otherInfo.housePropertyValue || otherInfo.housePropertyValue === 0) ? percent2(otherInfo.housePropertyValue) + '万元' : '- -'}}
      .p-total-line
        .p-total-label 合作年限
        .p-total-value {{(otherInfo.cooperationPeriod || otherInfo.cooperationPeriod === 0) ? otherInfo.cooperationPeriod + '年' : '- -'}}
</template>

<script>
import { columns1, columns2 } from './config'
import { reactive, toRefs } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import { toPrefixUrl } from '@/utils/util'
import { percent2 } from '@/utils/qjd'

export default {
  components: {
    Table
  },
  props: {
    mode: {
      type: String,
      default: 'accurate'
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
  },
  setup(props, { root }) {
    const state = reactive({
    })
    const downlaodTemplate = (row) => {
      window.open(toPrefixUrl('/fs/file/download?fileKey=' + row.filePath))
    }
    return {
      percent2,
      columns1,
      columns2,
      downlaodTemplate,
      ...toRefs(state),
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-block
  margin-bottom 20px
.p-slot
  margin-top 10px
.p-total-line
  margin-top 20px
  display flex
  align-items flex-start
  .p-total-label
    flex 120px 0 0
    text-align center
    margin-right 10px
</style>
