<template lang="pug">
.page-main
  TabsInCard(:tabs='tabConfig' :defaultTab='defaultTab' @change='(tabName)=>defaultTab=tabName')
    template(v-slot:organ)
      Card(noTitle)
        OrganTree
    template(v-slot:sale)
      SaleConfig
</template>

<script>
import Card from '@/components/Card'
import TabsInCard from '@/components/TabsInCard'
import OrganTree from './organTree'
import SaleConfig from './saleConfig'
export default {
  components: {
    TabsInCard,
    Card,
    OrganTree,
    SaleConfig
  },
  data () {
    return {
      defaultTab: 'organ',
      view: '',
      query: {},
      formData: {
        departmentName: '',
        departmentStatus: '',
        parentDepartmentId: '',
        remark: '',
      },
      statusCheck: false,
      initDepartmentId: '',
    }
  },
  computed: {
    tabConfig() {
      return [
        {label: '组织架构配置', name: 'organ'},
        {label: '销售组织配置', name: 'sale'}
      ]
    }
  },
  methods: {
    initFormData() {
      const formData = this.formData
      Object.keys(formData).forEach(item => {
        formData[item] = this.query[item]
      })
      this.statusCheck = formData.departmentStatus === 1
      this.initDepartmentId = formData.parentDepartmentId
      this.formData = formData
    },
    setView() {
      // const routeName = this.$route.name
      const query = this.$route.query
      this.view = query.type
      this.query = query
    },
  },
  mounted() {
    this.setView()
    if (this.view !== 'create') setTimeout(() => this.initFormData(), 1000)
  }
}
</script>

<style lang="stylus" scoped>
</style>
