<template lang="pug">
  div(v-loading='loadingPage')
    el-collapse(:value='[1,2,3,4,5]')
      el-collapse-item(:name='1' title='项目基本信息')
        .p-mian
          .p-item
            dl
              dt 外部编号：
              dd {{detailData.extId || '--'}}
            dl
              dt 客户名称：
              dd {{detailData.customerName || '--'}}
            dl
              dt 详细地址：
              dd {{detailData.detailAddress}}
            dl
              dt 项目方名称：
              dd {{detailData.projectPartnerName || '--'}}
            dl
              dt 项目方公司名称：
              dd {{detailData.projectCompany || '--'}}
            dl
              dt 项目股东性质：
              dd {{detailData.projectShareholderType ? projectShareholderType[detailData.projectShareholderType] : '--'}}
          .p-item
            dl
              dt 项目名称：
              dd {{detailData.name ? detailData.name : '--'}}
            dl
              dt 项目地址：
              dd {{detailData.province}} {{detailData.city}} {{detailData.region}}
            dl
              dt 项目类型：
              dd {{detailData.projectType ? projectType[detailData.projectType] : '--'}}
            dl
              dt 项目方类型：
              dd {{detailData.projectPartnerType ? projectPartnerType[detailData.projectPartnerType]: '--'}}
            dl
              dt 备注：
              dd {{detailData.remark || '--'}}
      el-collapse-item(:name='2' title='项目概况')
        .p-mian
          .p-item
            dl
              dt 建筑面积：
              dd {{detailData.buildingArea | toAmountStr(2, true) || '--'}}
            dl
              dt 项目工期：
              dd {{detailData.startTime || '--'}} 至 {{detailData.endTime || '--'}}
            dl
              dt 项目合同金额（万元）：
              dd {{detailData.contractAmount | toAmountStr(2, true) || '--'}}
          .p-item
            dl
              dt 总造价金额（万元）：
              dd {{detailData.totalCostAmount | toAmountStr(2, true) || '--'}}
            dl
              dt 项目周期：
              dd {{detailData.projectCycle || '--'}}
            dl
              dt 当前已回款金额（万元）：
              dd {{detailData.projectCollectedAmount | toAmountStr(2, true) || '--'}}
      el-collapse-item(:name='3' title='项目文件')
        div(
          style="padding-top: 10px;"
          v-for="(item, index) in fileLists"
          :key="index"
        )
          div {{ nameList ? nameList[item.fileType] : '' }}
          Files(:fileList="item.files || []")
      el-collapse-item(:name='4' title='项目预计回款信息')
        el-table(:data="tableData" style="width: 100%")
          el-table-column(prop='payNode' label='付款节点')
            template(slot-scope='{ row }')
              span {{paymentNodeType[row.paymentNode]}}
          el-table-column(prop='payType' label='付款方式')
            template(slot-scope='{ row }')
              span {{paymentWayType[row.paymentType]}}
          el-table-column(prop='paymentDate' label='预计付款时间')
          el-table-column(prop='paymentComputeType' label='付款金额计算方式')
            template(slot-scope='{ row }')
              span {{row.paymentComputeType=== 1 ? '按比例' : '按金额'}}
          el-table-column(prop='paymentProportion' label='付款比例（%）')
            template(slot-scope='{ row }')
              span {{ row.paymentProportion | toAmountStr(2, true)}}
          el-table-column(prop='paymentAmount' label='付款金额（元）')
            template(slot-scope='{ row }')
              span {{ row.paymentAmount | toAmountStr(2, true)}}
        .p-pagination
          el-pagination(
            background
            :total='totalCount'
            :page-size='pageSize'
            :current-page='currentPage'
            @current-change='handleChangePage'
            layout='prev, pager, next, total, jumper'
          )
      el-collapse-item(:name='5' title='合同信息')
        Table(
          :columns="columns"
          :dataSource="orgProjectContractDetailResponses"
        )
          template(slot="files" slot-scope="{ row }")
            Files(:fileList="row.projectContractFileList || []")
    .p-button(v-if="isPage")
      el-button(@click="$router.go(-1)") 返回
    .sure_box(v-else)
      el-button(@click="cancleHandle") 返回
</template>

<script>
import ajaxStore from '@/apis'
import {projectType, projectSourceType, projectPartnerType, projectShareholderType, paymentNodeType, paymentWayType} from '@/utils/enums'
import { columns } from './config'
import Table from '@/components/qjd/table/index.vue'
import Files from '@/components/qjd/files'

export default {
  components: {
    Table,
    Files
  },
  props: {
    isPage: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      columns,
      loadingPage: false,
      // activeIndex: 1,
      detailData: {},
      tableData: [],
      totalCount: 0,
      pageSize: 10,
      pageNo: 1,
      currentPage: 1,
      projectType,
      projectSourceType,
      projectPartnerType,
      projectShareholderType,
      paymentNodeType,
      paymentWayType,
      orgProjectContractDetailResponses: [],
      fileLists: [],
      nameList: {}
    }
  },
  methods: {
    cancleHandle() {
      this.$emit('cancleHandle')
    },
    setFiles(files) {
      const obj = {}
      const dataSource = []
      files.forEach(item => {
        obj[item.fileType] = item
      })
      Object.keys(obj).forEach(key => {
        const currentData = {}
        const currentFiles = []
        files.forEach(item => {
          if (item.fileType === key && (item.fileKey || item.fileName)) {
            currentFiles.push({ fileKey: item.fileKey, fileName: item.fileName })
          }
        })
        currentData.fileType = key
        currentData.files = currentFiles
        dataSource.push({ ...currentData })
      })
      this.fileLists = dataSource
    },
    async getProjectDetail() {
      const res = await this.$http.factory.getProjectDetail({ id: this.$route.query.id })
      if (res.data && res.data.code === '0') {
        this.detailData = res.data.data || {}
        this.orgProjectContractDetailResponses = res?.data?.data?.orgProjectContractDetailResponses ?? []
        this.setFiles(res?.data?.data?.projectContractFileList ?? [])
      }
    },
    async getProjectDetailList() {
      const res = await this.$http.factory.getProjectDetailList({ projectId: this.$route.query.id, pageNo: this.currentPage || 1})
      if (res.data && res.data.code === '0') {
        this.tableData = res.data.data.pagedRecords
        this.totalCount = res.data.data.totalCount
      }
    },
    handleChangePage (pageNum) {
      this.currentPage = pageNum
      this.pageNo = pageNum
      this.getProjectDetailList()
    },
    async getFileName() {
      try {
        this.loadingPage = true
        const { common: { openPlat: { getDictListPage } } } = ajaxStore
        const res = await getDictListPage({ pageNo: 1, pageSize: 1000, dictCategoryCode: 'project_contract_file_type' })
        await this.getProjectDetail()
        const { data } = res?.data ?? {}
        data.pagedRecords.forEach(item => {
          this.nameList[item.dictCode] = item.dictName
        })
        this.loadingPage = false
      } catch (error) {
        console.error(`error: ${error}`)
        this.loadingPage = false
      }
    }
  },
  mounted() {
    this.getProjectDetailList()
    this.getFileName()
  }
}
</script>

<style lang="stylus" scoped>
>>> .el-collapse
      padding: 20px;
      background-color: #fff;
      border none
      .el-collapse-item__header
        font-size 16px
      .el-collapse-item__wrap
        border-bottom none
      .el-collapse-item__header.is-active
        border-bottom-color #EBEEF5
.p-button
  padding-top 50px
  text-align center
  .el-button
    width 76px
    height 32px
.p-mian
  display flex
  padding-top 30px
  .p-item
    flex 1
    &:first-child
      border-right 2px dotted #CDD0D4
      margin-right 18px
    dl
      display flex
      overflow hidden
      dt
        color #738A9E
        width 150px
        text-align right
      dd
        margin-inline-start 0px
        flex 1
.p-pagination
  margin-top 20px
  text-align center
.sure_box
  position: absolute
  bottom: 0
  left: -20px
  width: calc(100% + 40px);
  height: 60px;
  background: #FFFFFF;
  box-shadow: 0px -2px 6px 0px rgba(51, 75, 133, 0.2);
  border: 1px solid #ECEDF1;
  box-sizing: border-box
  display: flex
  justify-content: center
  align-items: center
  z-index: 2000
</style>
