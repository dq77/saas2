<template lang="pug">
.page-main
  Summary
  .p-history-title 评估历史
  TabsInCard(:defaultTab='tabItem' :tabs='tabs' @change='changeTab')
  list-page(
    ref='listPage'
    :config='listPageConfig'
    @privateSearchParams='privateSearchParams'
  )
    template(slot='area' slot-scope='{row}') {{row.provinceName}}{{row.cityName}}{{row.areaName}}
    template(slot='operation' slot-scope='{row}')
      el-button(type='text' @click='goPage(row.id, "edit")' v-if='row.status === "0"') 编辑
      el-button(type='text' @click='goPage(row.id, "add")' v-if='["2", "3", "4"].includes(row.status)') 重新评估
      el-button(type='text' v-if='row.status === "1"' @click='cancelItem(row.id, row.processId)') 取消
      el-button(type='text' v-if='row.status === "0"' @click='deleteItem(row.id, "1")') 删除
      el-button(type='text' @click='checkDetail(row.id)') 查看
</template>
<script>
import ajaxStore from '@/apis'
import TabsInCard from '@/components/TabsInCard'
import Card from '@/components/Card'
import Summary from './summary'
import { projectType, projectPartyType, projectStatus } from '@/utils/enums'
import moment from 'moment'
export default {
  components: { Card, Summary, TabsInCard },
  data() {
    return {
      tabItem: 'programmeEvaluationBase'
    }
  },
  computed: {
    tabs() {
      return [
        {
          name: 'programmeEvaluationMan',
          label: '人工项目评估'
        },
        {
          name: 'programmeEvaluationBase',
          label: '基本项目评估'
        }
      ]
    },
    listPageConfig () {
      return {
        searchParams: [
          [
            {
              type: 'text',
              label: '项目名称',
              placeholder: '请输入项目名称',
              formItemName: 'name',
              col: 6,
            },
          ]
        ],
        tableHeader: [
          { name: '项目名称', property: 'name', minWidth: '120'},
          { name: '项目地址', tdSlotName: 'area', },
          { name: '项目类型', property: 'projectType', formatter: (v) => projectType[v], minWidth: '100' },
          { name: '项目公司', property: 'projectCompany', minWidth: '120'},
          { name: '发起时间', property: 'gmtCreated', formatter: (v) => moment(v).format('yyyy-MM-DD HH:mm:ss'), minWidth: '160' },
          { name: '项目方类型', property: 'projectPartyType', formatter: (v) => projectPartyType[v], minWidth: '100' },
          { name: '评估状态', property: 'status', formatter: (v) => projectStatus[v] },
          { name: '项目评分', property: 'resultScore', formatter: (v, row) => row.status === '3' ? v : '' },
          { name: '项目状态', property: 'effective', formatter: (v, row) => { return ['0', '2', '4'].includes(row.status) ? '-' : v } },
          { name: '项目有效截止时间', property: 'stopTime', formatter: (v, row) => { return ['0', '1', '2', '4'].includes(row.status) ? '-' : moment(v).format('yyyy-MM-DD HH:mm:ss') }, minWidth: '160' },
          { name: '操作', tdSlotName: 'operation', minWidth: '120', fixed: 'right'},
        ],
        getTableList: {
          type: 'component',
          fn: ajaxStore.factoryService.programme.getProgrammeList
        }
      }
    }
  },
  methods: {
    checkDetail(id) {
      this.$router.push({
        name: 'evaluationDetail',
        query: { id }
      })
    },
    privateSearchParams(params) {
      params.type = '1'
    },
    changeTab(name) {
      this.$router.push({
        name
      })
    },
    cancelItem(id, processId) {
      this.$confirm('确定要取消吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await ajaxStore.factoryService.programme.cancelProgramme({
          id,
          processId
        })
        if (res.data && res.data.code === '0') {
          this.$message.success('取消项目成功')
          this.$refs.listPage.getTableList()
        }
      })
    },
    deleteItem(id) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await ajaxStore.factoryService.programme.projectEdit({
          id,
          isDeleted: '1'
        })
        if (res.data && res.data.code === '0') {
          this.$message.success('删除项目成功')
          this.$refs.listPage.getTableList()
        }
      })
    },
    goPage(id, type) {
      this.$router.push({
        name: 'evaluationMan',
        query: { id, type },
      })
    }
  },
  mounted() {

  }
}
</script>
<style lang="stylus" scoped>
.p-history-title
  font-size 18px
  font-weight bold
  margin 27px 0 21px 0
</style>
