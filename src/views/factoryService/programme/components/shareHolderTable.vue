<template lang="pug">
.p-share-holder-main
  Card(title='股东信息')
    el-table.p-report-table(
      :data='shareHolderList.partners'
      stripe
    )
      el-table-column(prop='stockName' label='股东')
      el-table-column(prop='stockPercent' label='持股比例')
      el-table-column(prop='shouldCapi' label='认缴出资额（万元）')
      el-table-column(prop='shoudDate' label='认缴出资日期')
</template>
<script>
import ajaxStore from '@/apis'
// import { isNumber } from '@/utils/util'
import Card from '@/components/Card'
export default {
  props: {
    companyName: {
      type: String
    },
  },
  components: { Card },
  data() {
    return {
      loading: false,
      shareHolderList: {
        mainPersons: [],
        partners: [],
        through: []
      }
    }
  },
  methods: {
    async getShareholder() {
      const res = await ajaxStore.factoryService.programme.getShareholder({
        companyName: this.companyName
      })
      if (res.data && res.data.code === '0') {
        this.shareHolderList = res.data.data
      }
    }
  },
  mounted() {
    this.getShareholder()
  },
}
</script>
<style lang="stylus" scoped>

</style>
