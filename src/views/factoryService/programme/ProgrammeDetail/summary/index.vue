<template lang="pug">
.p-detail-item
  CardTitle(:title='projectInfo.name')
  .p-summary-content
    .p-summary-item
      .p-summary-line 项目地址: {{projectInfo.provinceName}} {{projectInfo.cityName}} {{projectInfo.areaName}}
      .p-summary-line 详细地址: {{projectInfo.address}}
      .p-summary-line 项目类型: {{projectType[projectInfo.projectType]}}
      .p-summary-line 评估日期: {{toDateStr(projectInfo.gmtModified, 'yyyy-mm-dd')}}
      .p-summary-line 项目公司: {{projectInfo.projectCompany}}
    .p-summary-item
      .p-summary-line 股东性质: {{shareholderType[projectInfo.shareholderType]}}
      .p-summary-line 项目方类型: {{projectPartyType[projectInfo.projectPartyType]}}
      FileItem(label='招标文件' :fileList='projectInfo.biddingDocuments')
      FileItem(label='合同文件' :fileList='projectInfo.contractFiles')
      FileItem(label='投标文件' :fileList='projectInfo.tenderDocuments')
</template>
<script>
import { projectType, shareholderType, projectPartyType } from '@/utils/enums'
import FileItem from './fileItem'
import CardTitle from '../components/cardTitle'
import { inject } from '@vue/composition-api'
export default {
  components: { CardTitle, FileItem },
  setup(props) {
    const projectInfo = inject('projectInfo')

    const toDateStr = (time) => {
      return time.replace(/\.0/, '').split(' ')[0]
    }

    return {
      projectInfo,
      projectType,
      shareholderType,
      projectPartyType,
      toDateStr
    }
  }
}
</script>
<style lang="stylus" scoped>
.p-detail-item
  width 100%
  background #ffffff
  padding 20px
  margin-bottom 20px
  .p-detail-item-title
    font-size 16px
    color #494949
    margin-bottom 10px
    display flex
    justify-content space-between
.p-summary-content
  display flex
  .p-summary-item
    border-right 1px solid #F3F4F8
    padding 0 20px
    width 50%
    .p-summary-line
      font-size 14px
      color #494949
      border-bottom 1px solid #F3F4F8
      line-height 45px
  .p-summary-item:first-child
    padding-left 0
  .p-summary-item:last-child
    border-right none
.p-file-btn
  color #3C5CA4
  cursor pointer
</style>
