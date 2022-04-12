<template lang="pug">
Card(noTitle v-loading='detailState.loading')
  div
    .p-row
      .p-col-12
        .p-label 公司名
        .p-value {{ detailState.detail.customerName || '- -' }}
      .p-col-12
        .p-label 社会信用代码
        .p-value {{ detailState.detail.socialCode || '- -' }}
    .p-row
      .p-col-12
        .p-label 联系邮箱
        .p-value {{ detailState.detail.contactEmail || '- -' }}
      .p-col-12
        .p-label 法人姓名
        .p-value {{ detailState.detail.legalPersonName || '- -' }}
    .p-row
      .p-col-12
        .p-label 联系手机号
        .p-value {{ detailState.detail.contactPhone || '- -' }}
      .p-col-12
        .p-label 法人身份证号
        .p-value {{ detailState.detail.legalPersonCode || '- -' }}
    .p-row
      .p-col-12
        .p-label 等级（外部）
        .p-value {{ detailState.vipLevelEnum[detailState.detail.vipLevel] || '- -' }}
      .p-col-12
        .p-label 法人手机号
        .p-value {{ detailState.detail.legalPersonMobile || '- -' }}
    .p-row
      .p-col-12
        .p-label 状态
        .p-value {{ customerStatusMap[detailState.detail.status] || '- -' }}
      .p-col-12
        .p-label 客户编号（外部）
        .p-value {{ detailState.detail.extCustomCode || '- -' }}
    .p-row
      .p-col-24
        .p-label 备注
        .p-value {{ detailState.detail.remark || '- -' }}
    .p-row
      .p-col-12
        .p-label 客户登录账号开通
        .p-value {{ detailState.detail.loginFlag === 0 ? '订货大师登录账号' : '未开通' }}
    .p-row(v-if='detailState.detail.loginFlag === 0')
      .p-col-12
        .p-label 当前客户登录账号
        .p-value {{ detailState.detail.loginAccount || '- -' }}
    el-divider
    .p-row
      .p-col-12
        .p-label 业务员
        .p-value {{ detailState.detail.businessNameListStr || '- -' }}
      .p-col-12
        .p-label 客服
        .p-value {{ detailState.detail.customerServiceNameListStr || '- -' }}
    .p-row
      .p-col-12
        .p-label 创建方式
        .p-value {{ customerCreateTypeMap[detailState.detail.createType] || '- -' }}
      .p-col-12
        .p-label 创建时间
        .p-value {{ detailState.detail.createdTime || '- -' }}
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import Card from '@/components/Card'
import { customerCreateTypeMap, customerStatusMap } from '@/utils/enums'
import useDetail from './useDetail'

export default {
  components: {
    Card,
  },
  setup(props, { root }) {
    const { customerId } = root.$route?.query ?? {}

    const detailState = useDetail({
      customerId
    })

    const state = reactive({
      detailState
    })

    return {
      customerCreateTypeMap,
      customerStatusMap,
      ...toRefs(state),
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './style.styl'
</style>
