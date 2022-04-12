<template lang='pug'>
el-popover.list-popover(
  popper-class="popver-width"
  placement="right"
  width="1028"
  trigger="hover"
)
  .popover-main
    .popover-head 评估须知
    .popover-step
      .popover-main-title 评估步骤
      ul.popover-step__ul
        li.popover-step__li(v-for='item in config' :key='item.number')
          .popover-step__li-content
            .popover-step__li-number {{ item.number }}
            .step-line
              .step-line--border
              .step-line--icon
              .step-line--border
          .popover-step__li-text {{ item.text }}
    .popover-other
      .popover-other--left
        .popover-main-title 评估资料清单*
        .popover-other__content
          p 企业：企业信息授权书、基础工商信息、企业征信、银行流水
          p 法人代表夫妇：个人信息授权协议、基础公民信息、个人征信、银行流水、房产信息
          p 实控人夫妇：个人信息授权协议、基础公民信息、个人征信、银行流水、房产信息
      .popover-other--right
        .popover-main-title 授权协议模板*
        .popover-other__content
          a(
            href="https://cdn.qjdchina.com/public/fuwu/%E6%8E%88%E6%9D%83%E5%8D%8F%E8%AE%AE%E7%AD%BE%E7%BD%B2%E6%A8%A1%E6%8B%9F-%E4%BC%81%E4%B8%9A.docx"
            target="_blank"
          ) 授权协议签署模板 — 企业
          a(
            href="https://cdn.qjdchina.com/public/fuwu/%E6%8E%88%E6%9D%83%E5%8D%8F%E8%AE%AE%E7%AD%BE%E7%BD%B2%E6%A8%A1%E6%9D%BF-%E4%B8%AA%E4%BA%BA.doc"
            target="_blank"
          ) 授权协议签署模板 — 个人
  i.el-icon-warning.u-warning-icon(slot='reference')
    span 评估须知
</template>

<script>
export default {
  setup (props) {
    const config = [
      { number: 1, text: '收集评估资料*' },
      { number: 2, text: '下载授权协议模板进行签署*' },
      { number: 3, text: '新建评估录入资料' },
      { number: 4, text: '提交评估' },
      { number: 5, text: '查看评估结果' }
    ]
    return {
      config
    }
  }
}
</script>

<style lang='stylus' scoped>
.list-popover
  margin-left 10px
.popover-main
  padding 8px 8px 18px
.popover-head
  margin-bottom 10px
  font-size 14px
  font-weight 500
  color #2D2926
.popover-main-title
  font-size 12px
  color #2D2926
.popover-step
  margin-bottom 20px
  border-bottom 1px dashed #E1E1E1
  &__ul
    padding 20px
    display flex
    justify-content space-between
    align-items center
  &__li
    &-content
      display flex
      align-items center
    &-number
      width 40px
      height 40px
      margin 0 10px 10px
      font-size 20px
      color #9AA6B8
      text-align center
      line-height 40px
      border 1px solid #E8ECF7
      border-radius 50%
      position relative
    &-text
      font-size 12px
      color #2D2926
      text-align center
      margin-left -157px
    &:last-child
      .popover-step__li-text
        margin-left -12px
      .step-line
        display none
.step-line
  display flex
  align-items center
  li
    display flex
    margin-right 60px
    &:last-child
      margin-right 0
  &--border
    width 69px
    height 3px
    background #E8ECF7
  &--icon
    width 0
    height 0
    margin 0 10px
    border-width 4px 0 4px 4px
    border-style solid
    border-color transparent transparent transparent #E8ECF7
.popover-other
  display flex
  justify-content space-between
  &--left
    width 500px
    margin-right 20px
  &--right
    flex 1
  &__content
    margin-top 10px
    padding 20px
    height 110px
    font-size 12px
    color #2D2926
    background #F2F2F6
    border-radius 4px
    p
      margin 0
      margin-bottom 10px
    a
      display block
      margin-bottom 10px
</style>
