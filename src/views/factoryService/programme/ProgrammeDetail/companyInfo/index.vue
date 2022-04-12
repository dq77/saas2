<template lang="pug">
div
  //- 公司基本信息
  BaseInfo(:companyName='projectInfo[type]' :type='type')
  .p-detail-flex(:class='type !== "realEstateCompany" ? "p-single" : ""')
    //- 财务数据
    Finance(:companyName='projectInfo[type]' :type='type')
    //- 三条红线
    RedLine(:companyName='projectInfo[type]' v-if='type === "realEstateCompany"')
  .p-detail-flex
    //- 企业自身舆情风险
    RiskNews(:companyName='projectInfo[type]' :type='type')
    //- 关联企业风险舆情
    RelationRiskNews(:companyName='projectInfo[type]' :type='type')
</template>

<script>
import BaseInfo from './baseInfo'
import Finance from './finance'
import RedLine from './redLine'
import RiskNews from './riskNews'
import RelationRiskNews from './relationRiskNews'
import { inject } from '@vue/composition-api'
export default {
  components: {
    BaseInfo,
    Finance,
    RedLine,
    RiskNews,
    RelationRiskNews
  },

  props: {
    type: {
      type: String,
      default: 'realEstateCompany'
    },
    showRedLine: {
      type: Boolean,
      default: true
    }
  },

  setup(props, { root }) {
    const projectInfo = inject('projectInfo')
    return {
      projectInfo
    }
  }
}
</script>
<style lang="stylus" scoped>
.p-detail-flex
  display flex
  margin-bottom 30px
.p-detail-flex.p-single
  margin-right 0
  .p-detail-item
    width 100%
</style>
