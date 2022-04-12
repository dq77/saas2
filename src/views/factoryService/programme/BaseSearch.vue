<template lang="pug">
.page-main
  Card(noTitle noWrap)
    list-page(
      ref='listPage'
      :config='listPageConfig'
      @initSearchParams='initSearchParams'
    )
      template(slot='entName' slot-scope='{searchForm}')
        el-autocomplete.p-input(
          v-model='params.entName'
          :maxlength='20'
          placeholder='请输入开发商名称'
          :fetch-suggestions="querySearchRealEstateCompany"
          @select='setRealEstateCompany'
          @change='setRealEstateCompany'
        )
      template(slot='projectCompanyName' slot-scope='{searchForm}')
        el-autocomplete.p-input(
          v-model='params.projectCompanyName'
          :maxlength='20'
          placeholder='请输入项目公司'
          :fetch-suggestions="querySearchRelatedCompany"
          @select='setRelatedCompany'
          @change='setRelatedCompany'
        )
      template(slot='area' slot-scope='{row}') {{row.pprovince}}{{row.pcity}}{{row.pcounty}}
      template(slot='operation' slot-scope='{row}')
        el-button(type='text' @click='checkDetail(row.entName, row.pcompany, row.id)') 查看项目
</template>
<script>
import ajaxStore from '@/apis'
import Card from '@/components/Card'
export default {
  components: { Card },
  data() {
    return {
      companyList: [],
      relatedCompanyList: [],
      params: {
        entName: '',
        projectCompanyName: '',
      }
    }
  },
  computed: {
    listPageConfig () {
      return {
        searchParams: [
          [
            {
              type: 'text',
              label: '项目名称',
              placeholder: '请输入项目名称',
              formItemName: 'pname',
              col: 4,
            },
            {
              type: 'slot',
              label: '开发商名称',
              slotName: 'entName',
              col: 4,
            },
            {
              type: 'slot',
              label: '项目公司名称',
              slotName: 'projectCompanyName',
              col: 4,
            },
          ]
        ],
        searchWeblogs: 'factory-customerEvaluation-eval-initiate-base-search',
        tableHeader: [
          { name: '项目名称', property: 'pname', minWidth: '120'},
          { name: '项目类型', property: 'ptype' },
          { name: '所在地', tdSlotName: 'area', },
          { name: '操作', tdSlotName: 'operation', minWidth: '100'},
        ],
        getTableList: {
          type: 'component',
          fn: ajaxStore.factoryService.programme.getBaseProgrammeList
        },
        notInit: true,
        beforeSearch(searchForm, $message) {
          const rules = [
            {
              name: 'pname',
              label: '项目名称'
            },
            {
              name: 'entName',
              label: '开发商名称'
            },
            {
              name: 'projectCompanyName',
              label: '项目公司名称'
            },
          ]
          let errorMsg = ''
          rules.every((item) => {
            if (!searchForm[item.name]) {
              errorMsg = `请输入${item.label}`
              return false
            } else {
              return true
            }
          })
          if (!errorMsg) {
            return true
          } else {
            $message.error(errorMsg)
          }
        }
      }
    }
  },
  methods: {
    initSearchParams(params) {
      const { entName, projectCompanyName } = this.$route.query
      this.params.entName = entName
      this.params.projectCompanyName = projectCompanyName
      params.entName = entName
      params.projectCompanyName = projectCompanyName
    },
    shwoErrorMsg(msg) {
      this.$message.error(msg)
    },
    checkDetail(companyName, projectCompany, projectId) {
      this.$router.push({
        name: 'programmeDetail',
        query: {
          companyName,
          projectCompany: this.$refs.listPage.searchForm.projectCompanyName,
          projectId
        }
      })
    },
    createFilter(queryString) {
      return (companyList) => {
        return (companyList.indexOf(queryString) === 0)
      }
    },
    querySearchRelatedCompany(queryString, cb) {
      const relatedCompanyList = this.relatedCompanyList
      const results = queryString ? relatedCompanyList.filter(this.createFilter(queryString)) : relatedCompanyList
      // 调用 callback 返回建议列表的数据
      const filterCompanyList = []
      console.log(results)
      results.map((item) => {
        filterCompanyList.push({
          value: item
        })
      })
      cb(filterCompanyList)
    },
    querySearchRealEstateCompany(queryString, cb) {
      const companyList = this.companyList
      const results = queryString ? companyList.filter(this.createFilter(queryString)) : companyList
      // 调用 callback 返回建议列表的数据
      const filterCompanyList = []
      results.map((item) => {
        filterCompanyList.push({
          value: item
        })
      })
      cb(filterCompanyList)
    },
    setRealEstateCompany(obj) {
      this.$refs.listPage.searchForm.entName = typeof obj === 'string' ? obj : obj.value
      this.getRelatedCompanyList()
    },
    setRelatedCompany(obj) {
      this.$refs.listPage.searchForm.projectCompanyName = typeof obj === 'string' ? obj : obj.value
    },
    async getRelatedCompanyList() {
      const res = await ajaxStore.factoryService.programme.getRelatedCompanyList({
        companyName: this.$refs.listPage.searchForm.entName
      })
      if (res.data && res.data.code === '0') {
        this.relatedCompanyList = res.data.data
      }
    },
    async getCompanyList() {
      const res = await ajaxStore.factoryService.realEstate.getCompanyList()
      if (res.data && res.data.code === '0') {
        this.companyList = res.data.data || []
      }
    },
  },
  mounted() {
    this.getCompanyList()
  }
}
</script>
<style lang="stylus" scoped>
</style>
