// 通常的列表页，如项目列表页、订单列表页等，页面结构为搜索、表格、分页
import { humpToLine, lineToHump } from '@/utils/util'
export default {
  data () {
    return {
      mixinsPageName: 'pageNo'
    }
  },
  methods: {
    getSearchParams () {
      const params = {}
      for (const key in this.searchForm) {
        const value = this.searchForm[key]
        if (typeof value === 'string' && value.length > 0) {
          params[key] = value
        } else if (typeof value === 'number' || typeof value === 'boolean') {
          params[key] = value
        } else if (value instanceof Array && value.length > 0) {
          params[key] = value
        }
      }

      params[this.mixinsPageName] = params[this.mixinsPageName] && params[this.mixinsPageName].toString()
      this.privateSearchParams && this.privateSearchParams(params)
      return params
    },
    changeSearch (params) {
      if (params) {
        for (const key in params) {
          this.searchForm[key] = params[key]
        }
      }
    },
    changePage (pageNum) {
      const query = JSON.parse(JSON.stringify(this.$route.query))
      query[this.mixinsPageName] = pageNum.toString()
      this.$router.push({
        name: this.$route.name,
        query
      })
    },
    doSearch () {
      const query = this.getSearchParams()
      this.$router.push({
        name: this.$route.name,
        query
      })
    },
    querySearchForm () {
      this.searchForm[this.mixinsPageName] = 1
      this.doSearch()
    },
    resetSearchForm (retainParams = {}) {
      this.$refs.table && this.$refs.table.clearSort()
      if (Object.keys(this.$route.query).length === 0) {
        this.initSearchParams()
      } else {
        this.$router.push({
          name: this.$route.name,
          query: {
            ...retainParams
          }
        })
      }
    },
    getDefaultSort(isTrue) {
      const { descs, ascs } = this.searchForm
      const reSortMethod = this.config ? this.config.reSortMethod : ''
      let prop
      let order
      if (descs) {
        prop = reSortMethod ? reSortMethod(descs) : lineToHump(descs)
        order = 'descending'
      } else if (ascs) {
        prop = reSortMethod ? reSortMethod(ascs) : lineToHump(ascs)
        order = 'ascending'
      }
      return {
        prop,
        order
      }
    },
    // 表格时间排序
    handleSortChange (e) {
      const params = this.searchForm
      const sortMethod = this.config ? this.config.sortMethod : ''
      if (e && e.order) {
        if (e.order === 'ascending') {
          params.ascs = sortMethod ? sortMethod(e.prop) : humpToLine(e.prop)
          params.descs = undefined
        } else if (e.order === 'descending') {
          params.descs = sortMethod ? sortMethod(e.prop) : humpToLine(e.prop)
          params.ascs = undefined
        }
      } else {
        params.descs = undefined
        params.ascs = undefined
      }
      this.$router.push({
        name: this.$route.name,
        query: params
      })
    },
  },
  async mounted () {
    await this.initSearchParams()
    await this.getTableList()
  },
  watch: {
    async $route (newRoute) {
      await this.initSearchParams()
      await this.getTableList()
    }
  }
}
