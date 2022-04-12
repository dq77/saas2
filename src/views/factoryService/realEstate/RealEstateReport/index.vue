<template lang="pug">
  Template(:detail='detail' :loading='loading')
</template>

<script>
import ajaxStore from '@/apis'
import Template from './template'
export default {
  data() {
    return {
      loading: false,
      companyName: '',
      reportId: '',
      detail: {}
    }
  },
  components: {
    Template
  },
  mounted () {
    this.reportId = this.$route.query.reportId
    this.checkReport()
  },
  methods: {
    async checkReport() {
      this.loading = true
      const res = await ajaxStore.factoryService.realEstate.checkReport({
        reportId: this.reportId
      })
      this.loading = false
      if (res.data && res.data.code === '0') {
        this.detail = res.data.data
      }
    }
  },
}
</script>
<style lang="stylus" scoped>
.page-main
  margin 0
</style>
