<template lang="pug">
.p-block(:style='`background-color: ${bgColor}`')
  .u-bg-img(:style='`background-image: url(${bgImg})`')
  .u-wrap
    .u-title {{ title }}
    .u-info {{ info }}
    .u-btn(v-if='hasPermission' @click='clickForward' v-weblogs.click='weblogs') 立即前往
    .u-btn-no-permission(v-else) 暂无权限
</template>

<script>
export default {
  props: {
    title: String,
    info: String,
    bgColor: String,
    bgImg: String,
    hasPermission: Boolean,
    routeName: String,
    weblogs: String,
  },
  setup(props, { root }) {
    const clickForward = () => root.$options.router.push({ name: props.routeName })
    return {
      clickForward
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-block
  position relative
  flex 1
  min-width 220px
  height 124px
  font-size: 14px;
  font-weight: 500;
  color: var(--fontColor);
  line-height: 20px;
  &:hover
    .u-bg-img
      opacity 100
  .u-bg-img
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    background-size: contain
    background-position: bottom;
    background-repeat: no-repeat;
    opacity 0
    transition opacity .5s
  .u-wrap
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    padding: 22px 20px 0 20px;
  .u-info
    font-size: 12px;
    font-weight: 400;
    color: #6D7278;
    line-height: 17px;
    margin-bottom: 8px;
    white-space: nowrap;
  .u-btn
    width: 90px;
    height: 32px;
    cursor: pointer;
    line-height: 32px;
    background: #fff;
    font-size: var(--smallSize);
    font-weight: 500;
    text-align: center;
    &:hover
      background: var(--defaultColor);
      color: #fff;
  .u-btn-no-permission
    width: 90px;
    height: 32px;
    line-height: 32px;
    font-size: var(--smallSize);
    font-weight: 500;
    text-align: center;
    background: var(--defaultColor);
    color: #fff;
</style>
