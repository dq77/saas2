<template lang="pug">
.p-multi-account-bar(:class='{"u-bac": showBac}')
  .u-total-data
    div
      .u-label {{ totalData.label }}
      .u-content {{ totalData.content }}
  .u-accounts-data
    el-scrollbar(style='width: 100%; height: 100%;')
      .u-accounts-data-wraper
        .u-list-item(v-for='item in accountsData')
          slot(v-if='item.isSlot' :name='item.name')
          template(v-else)
            .u-left(v-if='item.svgId')
              svg.icon(aria-hidden='true')
                use(:xlink:href='`#${item.svgId}`')
            .u-right
              .u-label {{ item.label }}
              .u-content-group
                span.u-content {{ item.content }}
                span.u-link(v-if='item.link' @click='clickDetail(item.link)') 查看明细 &rsaquo;
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    showBac: {
      type: Boolean,
      default: true
    },
    totalData: {
      type: Object,
      default: () => ({})
    },
    /** 数组项字段说明
     * lable: String 字段标题
     * content: String 字段值
     * svgId: String 非必传，用于左侧图标
     * link: <LinkObject> 非必传，有则显示“查看明细”链接
     * isSlot: Boolean 非必传，是否使用插槽
     * key: String 非必传，用于isSlot为true时作为插槽的name
     * --
     * LinkObject字段说明，直接用于router.push()
     * name: String
     * query: Object
     * */
    accountsData: {
      type: Array,
      default: () => []
    }
  },
  setup(props, {root}) {
    const clickDetail = (linkObj) => {
      root.$router.push(linkObj)
    }
    return {
      clickDetail
    }
  },
})
</script>

<style lang="stylus" scoped>
.p-multi-account-bar
  display: flex
  &.u-bac
    background: url('//cdn.qjdchina.com/static-online/saas/SupplyChain/orderMaster/bar-bac.jpg') no-repeat
    background-position: top right
    background-size: auto 100%
  .u-total-data
    display: flex
    align-items: center
    padding: 20px 0 20px 10px
    width: 200px
    border-right: 1px solid #F2F2F6
    .u-content
      color #3B68F0
  .u-accounts-data
    flex 1
    padding-left: 20px 60px 20px 20px
    width: 0
  .u-accounts-data-wraper
    display: flex
    align-items: center
    padding-left 40px
    height: 100%
  .u-list-item
    display: flex
    align-items: center
    flex none
    padding-left 20px
    width: 22%
  .u-left
    .icon
      width: 40px
      height: 40px
  .u-right
    margin-left 8px
  .u-label
    color #494949
    font-size: 12px
    line-height: 17px
  .u-content-group
    margin-top 3px
  .u-content
    color #494949
    font-size: 22px
    font-weight bold
    line-height: 31px
  .u-link
    margin-left 6px
    font-size: 12px
    color #3B68F0
    cursor: pointer
</style>
