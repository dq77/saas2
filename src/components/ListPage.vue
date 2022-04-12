<!-- author liqi -->
<template lang="pug">
.list-page(style='padding:0')
  slot(name='searchFormHeader')
  card.list-page_search-area-wrapper(:noTitle='true' v-if='config.searchParams.length')
    .list-page_search-area(:style='{height: searchAreaHeight+"px"}')
      el-row.list-page_search-area-row(:gutter='24' v-for='(rowItem, rowKey) in config.searchParams' :key='rowKey')
        el-col(:span='item.col' v-for='(item, key) in rowItem' :key='key')
          .list-page_search-area-label {{ item.label || '&nbsp;' }}
          el-input.width-100(v-if='item.type === "text"' v-model='searchForm[item.formItemName]' clearable :placeholder='item.placeholder')
          el-date-picker.width-100(v-if='item.type === "date"' v-model='searchForm[item.formItemName]' type='date' :placeholder='item.placeholder' :value-format="item.format || 'yyyy-MM-dd'" :picker-options="item.picker")
          el-date-picker.width-100(v-if='item.type === "daterange"' v-model='handleDates[`dates${item.id}`]' type='daterange' range-separator='-' :start-placeholder='item.placeholder_start' :end-placeholder='item.placeholder_end' :value-format='item.format || "yyyy-MM-dd HH:mm:ss"' :default-time='item.defaultTime || ["00:00:00", "23:59:59"]' @change='item.changeDate' unlink-panels)
          el-cascader.width-100(
            v-if='item.type === "customer"'
            clearable
            :placeholder='item.placeholder'
            change-on-select
            v-model='searchForm[item.formItemName]'
            :options='options'
            @change='item.handleChange'
          )
          el-select.width-100(v-if='item.type === "select"' v-model='searchForm[item.formItemName]' clearable filterable :placeholder='item.placeholder')
            el-option(
              v-for='(val,index) in item.enum'
              :key='index'
              :label='val'
              :value='item.useValue ? val : index'
            )
          el-select.width-100(v-if='item.type === "remote"' :placeholder='item.placeholder'
            filterable
            clearable
            remote
            v-model='searchForm[item.formItemName_text]'
            :remote-method='item.querySearch'
            :loading='remoteContent[`loading${item.id}`]'
            :default-first-option='true'
            @change='item.handleChange && item.handleChange')
            el-option(v-for='(remoteItem, remoteKey) in remoteContent[`remoteList${item.id}`]' :key='remoteKey' :value='remoteItem[item.formItemNameInAPI]')
          template(v-if='item.type === "slot" && typeof $scopedSlots[item.slotName] === "function"')
            slot(:name='item.slotName' :searchForm='searchForm')
      .list-page_search-area-btns
        el-button.list-page_search-area-btn(type='primary' :loading='loading' @click='querySearchForm' :weblogs-anchor='config.searchWeblogs || undefined') 搜索
        el-button.list-page_search-area-btn(:loading='loading' @click='resetSearchForm') 重置
  card.list-page_table-wrapper(:noTitle='true' :noWrap='true')
    .list-page_head-buttons(v-if='config.headButtonGroup || typeof $scopedSlots.headerTop === "function"')
      div(v-if='config.headButtonGroup')
        template(v-for='(item, key) in config.headButtonGroup')
          el-button(v-if='item.type === "text"' @click='item.method' type='primary' :disabled='item.disabled' :weblogs-anchor='item.weblogs || undefined') {{item.text}}
          template(v-else-if='item.type === "link"')
            router-link(v-if='item.toRouter' :to='item.toRouter')
              el-button(type='primary') {{item.text}}
            a(v-else :href='item.toUrl')
              el-button(type='primary') {{item.text}}
      div(v-if='typeof $scopedSlots.headerTop === "function"')
        slot(name='headerTop' :row='searchForm')
    .list-page_table
      el-table(ref="tableList" stripe :data='tableList' v-loading='loading' v-if='config.tableHeader && config.tableHeader.length > 0' :fit='true' @sort-change='handleSortChange' :default-sort='getDefaultSort()' @selection-change="handleSelectionChange")
        el-table-column(type='selection' width="55" v-if='config.hasSelection')
        el-table-column(v-for='(item, key) in config.tableHeader' :key='key' :prop='item.property' :width='item.width' :min-width='item.minWidth' :align='item.align' :fixed='item.fixed' :header-align='item.headerAlign' :sortable='item.sortable')
          template(slot='header' slot-scope='{column, $index}')
            span(v-if='(typeof $scopedSlots[item.thSlotName]) !== "function"') {{item.name}}
            slot(v-else :name='item.thSlotName' :scope='{column, $index}')
          template(slot-scope='{row, column, $index}')
            div(v-if='item.isDynamic')
              slot(name='dynamic' :scope='{row, column, $index}' :row='row' :column='column' :tableHeaderItem='item')
            div.sort-cell(v-else-if='(typeof $scopedSlots[item.tdSlotName]) !== "function"') {{item.formatter ? (item.formatter(row[item.property], row) || '- -') : (!item.type ? (row[item.property] || '- -') : $index+1)}}
            slot(v-else :name='item.tdSlotName' :scope='{row, column, $index}' :row='row' :index="$index")
    .list-page_pagination
      el-pagination(
        :total='totalCount'
        :page-size='pageSize'
        :current-page='currentPage'
        @current-change='changePage'
        layout='total, prev, pager, next, jumper'
      )
</template>

<script>
import Card from '@/components/Card'
import { humpToLine, lineToHump } from '@/utils/util'
// import SearchAreaAndManager from '@/components/SearchAreaAndManager'
export default {
  props: {
    config: {
      type: Object,
      required: true
    },
    pageAlias: {
      type: String,
      default: 'pageNo'
    },
    retainParams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    selectionChange: {
      type: Object,
      default: () => {
        return {}
      }
    },
    cb: Function
  },
  data() {
    return {
      isChangePage: false,
      searchAreaHeight: 0, // 搜索区域的高度
      remoteContent: {},
      handleDates: {},
      loading: false,
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      searchForm: {},
      tableList: [],
      options: []
    }
  },
  methods: {
    async getOptions () {
      // 获取客服经理数据
      if (this.options.length > 0) return
      this.options = await this.$store.dispatch('getAreaAndManager')
      if (this.remoteContent.showDepartment) {
        this.options = this.options.filter(item => {
          return this.remoteContent.showDepartment.includes(item.label)
        })
      }
    },
    getDefaultSort() {
      const { descs, ascs } = this.searchForm
      const reSortMethod = this.config.reSortMethod
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
      const sortMethod = this.config.sortMethod
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
    initComponent() {
      let id = 0
      const that = this
      this.$set(this.searchForm, this.pageAlias, 1)
      this.config.searchParams.forEach(element => {
        element.forEach(col => {
          if (!['daterange', 'remote', 'customer'].includes(col.type) && col.formItemName) {
            // 初始化设置serchForm参数
            that.$set(that.searchForm, col.formItemName, '')
            return
          }
          const _flag = ++id
          col.id = _flag
          if (col.type === 'customer') {
            that.$set(that.searchForm, col.formItemName, [])
            that.$set(that.searchForm, col.customer, '')
            this.remoteContent.showDepartment = col.showDepartment || ''
            this.getOptions()
            col.handleChange = (v) => {
              let label
              let isMember = 0
              if (v && v[0]) {
                this.options.forEach((item, index) => {
                  if (item.value === v[0]) {
                    label = item.label
                  }
                })
              }
              if (label && label.match(/南区|东区|北区|特区/g)) {
                isMember = 1
              }
              that.searchForm[col.formItemName] = v
              that.searchForm[col.customer] = v[v.length - 1]
              that.$set(that.searchForm, 'isMember', isMember)
            }
          }
          if (col.type === 'daterange') {
            // 查询类型为时间间隔时，设置绑定值以及change方法
            that.$set(that.handleDates, `dates${_flag}`, [])
            that.$set(that.searchForm, col.formItemName_start, '')
            that.$set(that.searchForm, col.formItemName_end, '')
            that.handleDates[`$$dates${_flag}`] = [col.formItemName_start, col.formItemName_end]
            col.changeDate = () => {
              const dates = that.handleDates[`dates${_flag}`]
              that.searchForm[col.formItemName_start] = dates && dates.length > 0 ? dates[0] : ''
              that.searchForm[col.formItemName_end] = dates && dates.length > 0 ? dates[1] : ''
            }
          }
          if (col.type === 'remote') {
            // 查询类型为远程接口时，初始化绑定值以及querySearch，handleChange方法
            that.$set(that.searchForm, col.formItemName_text, '')
            that.$set(that.remoteContent, `loading${_flag}`, false)
            that.$set(that.remoteContent, `remoteList${_flag}`, [])
            col.querySearch = v => {
              if (v) {
                that[`loading${_flag}`] = true
                const remoteParamOther = col.remoteParamOther ? col.remoteParamOther() : {}
                col.remoteMethod({[col.remoteParamName]: v, ...remoteParamOther}).then(({ data }) => {
                  that.remoteContent[`loading${_flag}`] = false
                  that.remoteContent[`remoteList${_flag}`] = data.data || []
                })
              } else {
                that.remoteContent[`remoteList${_flag}`] = []
              }
            }
            if (!col.formItemName_id) return
            that.$set(that.searchForm, col.formItemName_id, '')
            col.handleChange = v => {
              let info = []
              if (v) {
                info = that.remoteContent[`remoteList${_flag}`].filter(item => item[col.formItemNameInAPI] === v)
                that.searchForm[col.formItemName_id] = info.length > 0 ? info[0][col.formItemIdInAPI] : ''
              } else {
                that.searchForm[col.formItemName_id] = ''
              }
            }
          }
        })
      })

      let lastRowColSum = 0 // 最后一行的col的和
      const rowLength = this.config.searchParams.length // 搜索区域会显示的行数
      let searchAreaHeight = 58 * rowLength + 20 * (rowLength - 1)
      if (this.config.searchParams.length) {
        this.config.searchParams[this.config.searchParams.length - 1].forEach(item => {
          lastRowColSum += item.col
        })
      }
      if (lastRowColSum > 18) {
        searchAreaHeight += 50 // 50=20+30 新增的一行只有按钮，按钮是由30的高度
      }
      this.searchAreaHeight = searchAreaHeight
      this.getTableList = async () => {
        this.loading = true
        const params = this.getSearchParams()
        Object.assign(params, {pageSize: params.pageSize || this.pageSize})
        const res = await this.config.getTableList.fn(params, this)
        // 通过传递Api接口组件自动获取数据
        if (this.config.getTableList.type === 'component') {
          if (res.data && res.data.code === '0') {
            const data = res.data.data
            if (data) {
              this.tableList = data.pagedRecords
              this.currentPage = data.pageNo
              this.totalCount = data.totalCount
            }
            if (this.cb) this.cb(this.tableList)
          }
        } else {
          // 自定义函数调用获取数据
          if (res && Object.keys(res).length > 0) {
            this.tableList = res.tableList
            this.currentPage = res.currentPage
            this.totalCount = res.totalCount
          }
          if (this.cb) this.cb(this.tableList)
        }
        this.loading = false
        this.isChangePage = false
      }
    },
    getSearchParams() {
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
      Object.assign(params, this.retainParams)
      // 兼容后端
      params[this.pageAlias] = params[this.pageAlias] && params[this.pageAlias].toString()
      // 参数个性化处理
      this.$emit('privateSearchParams', params)
      return params
    },
    changeSearch(params) {
      if (params) {
        for (const key in params) {
          this.searchForm[key] = params[key]
        }
      }
    },
    changeTab(e) {
      const tab = this.config.headTabList.filter(item => {
        return item.label === e.name
      })
      this.config.getTableList.fn = tab[0].fn
      this.getTableList()
    },
    changePage(pageNum) {
      const query = JSON.parse(JSON.stringify(this.$route.query))
      query[this.pageAlias] = pageNum.toString()
      Object.assign(query, this.retainParams)
      this.$router.push({
        name: this.$route.name,
        query
      })
      this.isChangePage = true
    },
    doSearch() {
      const query = this.getSearchParams()
      Object.assign(query, this.retainParams)
      this.$router.push({
        name: this.$route.name,
        query
      })
    },
    querySearchForm() {
      if (this.config.beforeSearch) {
        if (this.config.beforeSearch(this.searchForm, this.$message)) {
          this.searchForm[this.pageAlias] = 1
          this.doSearch()
        }
      } else {
        this.searchForm[this.pageAlias] = 1
        this.doSearch()
      }
    },
    resetSearchForm() {
      this.$refs.tableList.clearSort()
      if (Object.keys(this.$route.query).length === 0) {
        this.initMainParams()
        this.$emit('initSearchParams', this.searchForm)
      } else {
        const query = Object.keys(this.retainParams).length > 0 ? this.retainParams : {}
        this.$router.push({
          name: this.$route.name,
          query
        })
      }
    },
    initPage() {
      if (this.config.notInit) {
        // 首次不加载，且重置清空历史数据
        if (JSON.stringify(this.$route.query) !== '{}') {
          this.initMainParams()
          this.$emit('initSearchParams', this.searchForm)
          this.getTableList()
        } else {
          this.initMainParams()
          this.$emit('initSearchParams', this.searchForm)
          this.tableList = []
        }
      } else {
        this.initMainParams()
        this.$emit('initSearchParams', this.searchForm)
        this.getTableList()
      }
    },
    initMainParams() {
      const query = this.$route.query
      Object.keys(this.searchForm).forEach(e => {
        if (e === this.pageAlias) {
          this.searchForm[e] = +query[e] || 1
        } else {
          this.searchForm[e] = query[e] || (Array.isArray(this.searchForm[e]) ? [] : '')
        }
      })
      Object.keys(this.handleDates).forEach(e => {
        const dates = this.handleDates[`$$${e}`]
        if (dates && dates.length > 0 && this.searchForm[dates[0]] && this.searchForm[dates[1]]) {
          this.handleDates[e] = [this.searchForm[dates[0]], this.searchForm[dates[1]]]
        } else if (dates && dates.length > 0 && !this.searchForm[dates[0]] && !this.searchForm[dates[1]]) {
          this.handleDates[e] = []
        }
      })
    },
    // selection
    handleSelectionChange(val) {
      this.$emit('selectionChange', val)
    },
    clearSelection() {
      this.$refs.tableList.clearSelection()
    }
  },
  created() {
    this.initComponent()
  },
  mounted() {
    this.initPage()
  },
  components: {
    Card
  },
  watch: {
    $route(newRoute) {
      this.initPage()
    },
    // config(newVal) {
    //   this.initComponent()
    //   this.initPage()
    // }
  }
}
</script>

<style lang="stylus">
.list-page
  &_search-area
    position relative
    &-wrapper
      position relative
      margin-bottom 10px
      border-radius 4px
    &-row
      margin-bottom 20px
    &-label
      margin-bottom 10px
      font-size 12px
      color #494949
    &-btns
      position absolute
      right 0
      bottom 0
    &-btn
      width 76px
  &_table-wrapper
    border-top-color transparent !important
  &_head-buttons
    position relative
    display flex
    justify-content space-between
    margin 20px 20px 0
  &_table
    margin 20px
  &_pagination
    padding-top 8px
    padding-right 20px
    height 50px
    text-align right
    border-top 1px solid #F2F2F6

</style>
<style lang="stylus" scoped>
/deep/ .el-table th.el-table__cell.el-table-column--selection>.cell
  padding-left 15px
  padding-right 14px
</style>
