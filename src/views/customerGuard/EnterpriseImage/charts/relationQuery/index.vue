<template lang="pug">
.p-relation-ship
  // .p-header 企业关联关系查询
  .p-body
    .p-left
      .p-form-content(v-if='isShow')
        el-form(ref='form' :model='form')
          el-form-item(label='请添加要查询的2家公司名称')
            .p-input-search(@click='queryCompany(1)' :placeholder='!form.nameFrom') {{form.nameFrom || '公司1'}}
            .p-input-search(@click='queryCompany(2)' :placeholder='!form.nameTo') {{form.nameTo || '公司2'}}
          el-form-item(label='请选择要查询的关联关系')
            el-checkbox-group(v-model='form.types')
              el-checkbox(v-for='(item, key) in relationship' :key='key' :label='key') {{item}}
          //- el-form-item(label='第三步：请选择关联深度')
          //-   el-radio-group(v-model='form.depth')
          //-     el-radio(:label='2') 2度
          //-     el-radio(:label='4') 4度
          //-     el-radio(:label='6') 6度
          el-form-item
            el-button(@click='queryNow' :loading='loading' type='primary' round) 立即查询
      .p-form-operate(@click='showForm')
        i(v-if='isShow').el-icon-arrow-left 收起
        i(v-else).el-icon-arrow-right 展开
    .p-enterprise-diagram
      graph(ref='chart' :relationData='relationData')
</template>

<script>
import { relationship, EventBus } from './config'
import Graph from './graph'
import ajaxStore from '@/apis'
export default {
  props: {
    companyName: {
      type: String,
    }
  },
  data() {
    return {
      relationship,
      isShow: true,
      loading: false,
      form: {
        nameFrom: '',
        nameTo: '',
        // types: ['OWN', 'SERVE_ALL', 'INVEST', 'BRANCH', 'LAW', 'CAC', 'EQ'],
        types: ['OWN', 'SERVE_ALL', 'INVEST'],
        depth: 6
      },
      relationData: {},
      companyId: ''
    }
  },
  methods: {
    showForm() {
      this.isShow = !this.isShow
      if (this.relationData.relationships && this.relationData.relationships.length > 0) {
        this.$refs.chart.updateGraph(this.isShow)
      }
    },
    async queryNow() {
      if (!this.form.nameFrom || !this.form.nameTo) {
        return this.$message.warning('请选择关联公司')
      }
      this.loading = true
      const form = { ...this.form }
      form.types = form.types.join(',')
      const res = await ajaxStore.factoryService.realEstate.queryRelation(form)
      if (res.data && res.data.code === '0') {
        this.relationData = res.data.data || []
        this.relationData.form = this.form
        if (!this.relationData || !this.relationData.relationships) {
          this.$message.warning('当前查询条件下，两个企业之间没有关联关系！')
          this.relationData = {
            nodes: [],
            relationships: []
          }
        } else {
          setTimeout(() => {
            window.layoutScrollbar.wrap.scrollTo({
              top: 260,
              behavior: 'smooth'
            })
          }, 0)
          this.isShow = false
        }
      }
      this.loading = false
    },
    queryCompany(id) {
      this.companyId = id
      EventBus.$emit('queryCompanyEvent')
    },
    matchCompanyEvent(name) {
      if (this.companyId === 1) {
        this.form.nameFrom = name
      } else {
        this.form.nameTo = name
      }
    }
  },
  mounted() {
    this.form.nameFrom = this.companyName || ''
    this.form.nameFrom = decodeURIComponent(this.form.nameFrom)
    EventBus.$on('matchCompanyEvent', (name) => { this.matchCompanyEvent(name) })
  },
  components: {
    Graph
  }
}
</script>

<style lang="stylus" scoped>
.p-relation-ship
  position relative
  .p-header
    font-size 20px
    color #3b3c5a
    margin-left 20px
  .p-body
    background #fff
    padding 20px
    display flex
    flex 1
    min-height 500px
    .p-enterprise-diagram
      flex 1
      padding 20px 0
      position relative
      overflow hidden
    .p-left
      position relative
      .p-form-operate
        background #f9fafc
        position absolute
        top 50%
        right -20px
        width 40px
        height 40px
        line-height 40px
        cursor pointer
        z-index 99
        color #babcbf
        i
          font-weight bold
    .p-form-content
      width 300px
      background #f9fafc
      padding 20px
      height 100%
      .p-input-search[placeholder=true]
       color #c5c8cc
      .p-input-search:first-child
        margin-bottom 15px
      .p-input-search
        display inline-block
        padding-left 10px
        width 100%
        height 32px
        line-height 32px
        border 1px solid #dcdfe6
        border-radius 4px
        cursor pointer
      .el-checkbox-group
        display inline-block
      .el-checkbox
        margin-left 5px
        margin-right 5px
      .el-button
        width 100%
  >>>.el-dialog__body
    padding-top 0
    padding-bottom 0
  >>>.el-dialog__footer
    text-align center
  .dialog-body
    .el-input
      width 210px
    .dialog-button
      float right
      width 95px
    .dialog-match-box
      height 242px
      border 1px solid #dcdfe6
      margin-top 35px
      box-sizing border-box
      overflow auto
      .dialog-no-data
        text-align center
        margin-top 100px
      .dialog-match-row
        padding 0 10px
        line-height 30px
        cursor pointer
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
      .dialog-match-row:hover
        background #dcdfe6
      .activeMatch
        color #409eff
</style>
