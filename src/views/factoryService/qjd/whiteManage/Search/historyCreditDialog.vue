<template lang="pug">
el-dialog(
  title='历史额度'
  width='500px'
  :visible='visible'
  :before-close='closeHandle'
)
  el-table(
    border
    :data='list'
    v-loading='loading'
  )
    el-table-column(type='index' label='序号' align='center')
    el-table-column(prop='creditLine'
      label='额度'
      min-width='100px'
      align='center'
    )
      template(slot-scope='{row}') {{ row.creditLine | toAmountStr(2, true) }}
    el-table-column(prop='applyTime' label='申请时间' :formatter='dateFormatter' align='center')
    el-table-column(prop='validFrom' label='通过时间' :formatter='dateFormatter' align='center')
    el-table-column(prop='validTo' label='失效时间' :formatter='dateFormatter' align='center')
</template>

<script>
import ajaxStore from '@/apis'
export default {
  props: {
    params: {
      type: Object,
      defalut: () => {
        return {
          supplierId: '',
          companyId: ''
        }
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: '',
      loading: false,
      list: []
    }
  },
  methods: {
    dateFormatter(row, column, cellValue, index) {
      return cellValue ? cellValue.substr(0, 10) : '--'
    },
    closeHandle() {
      this.$emit('close')
    },
    async getList() {
      if (this.params.supplierId && this.params.companyId) {
        this.loading = true
        const res = await ajaxStore.factoryService.qjd.white.getHistoryCredit(this.params)
        this.loading = false
        if (res?.data?.code === '0') {
          this.list = res.data.data
        }
      } else {
        this.list = []
      }
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) this.getList()
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-credit-lines
  line-height 30px
</style>
