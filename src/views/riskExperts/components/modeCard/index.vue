<template lang="pug">
.mode-card(:style='{background: modeType[type][mode].background,backgroundSize: "cover"}')
  .mode-recommend-icon(v-if='recommend')
  img.mode-icon(:src='modeType[type][mode].icon')
  .mode-title {{modeType[type][mode].title}}
  .mode-detail {{modeType[type][mode].detail}}
  .mode-summary
    .mode-summary-item
      .mode-summary-item-label 所需材料：
      .mode-summary-item-value
        .mode-summary-item-value-item(v-for='item in modeType[type][mode].info' :style='{width: item.length > 8 ? "100%" : "46%"}')
          .mode-summary-icon(:style='{borderColor: modeType[type][mode].color}')
            .mode-summary-icon-circle(:style='{background: modeType[type][mode].color}')
          .mode-summary-icon-name {{item}}
    .mode-summary-item
      .mode-summary-item-label 增值服务：
      .mode-summary-item-value
        .mode-summary-item-value-item(v-for='item in modeType[type][mode].service' :style='{width: item.length > 8 ? "100%" : "46%"}')
          .mode-summary-icon(:style='{borderColor: modeType[type][mode].color}')
            .mode-summary-icon-circle(:style='{background: modeType[type][mode].color}')
          .mode-summary-icon-name {{item}}
  .mode-btn(@click='goPage') 立即开始
</template>

<script>
import { modeType } from './config'
export default {
  props: {
    type: {
      type: String
    },
    mode: {
      type: String
    },
    recommend: {
      type: Boolean,
      default: false
    },
    permissions: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { root }) {
    const goPage = () => {
      if (props.permissions) {
        root.$router.push({
          name: modeType[props.type][props.mode].next,
          query: {
            mode: props.mode
          }
        })
      } else {
        root.$message.error('您还未开通此项服务，请联系售前商务')
      }
    }
    return {
      modeType,
      goPage
    }
  }
}
</script>

<style lang="stylus" scoped>
.mode-card
  width 30%
  max-width 358px
  padding-bottom 60px
  border 1px solid rgba(151, 151, 151, 0)
  border-radius 8px
  box-shadow 3px 3px 15px 4px #EDEDF2
  position relative
.mode-icon
  width 48px
  height 48px
  margin 48px auto 17px auto
  display block
.mode-title
  color #494949
  font-size 18px
  text-align center
  margin-bottom 20px
.mode-detail
  color #494949
  font-size 14px
  line-height 20px
  width 85%
  margin 0 auto 25px auto
.mode-summary
  width 85%
  margin 0 auto
.mode-summary-item
  width 100%
  margin-bottom 10px
.mode-summary-item-label
  color #848484
  margin-bottom 15px
.mode-summary-item-value
  display flex
  flex-wrap wrap
.mode-summary-item-value-item
  color #383B42
  position relative
  padding-left 20px
  margin-bottom 15px
.mode-summary-item-value-item:nth-child(odd)
  margin-right 20px
.mode-summary-icon
  padding 2px
  border 1px solid #8D4BFE
  display block
  position absolute
  left 0
  top 3px
  border-radius 50%
  .mode-summary-icon-circle
    width 6px
    height 6px
    background #8D4BFE
    border-radius 50%
.mode-btn
  width 88px
  height 30px
  background linear-gradient(90deg, #7997FB 0%, #527AFD 100%)
  box-shadow 0px 2px 11px 1px rgba(152, 164, 210, 0.6)
  border-radius 15px
  border-image linear-gradient(92deg, rgba(119, 150, 251, 1), rgba(94, 123, 227, 1)) 1 1
  position absolute
  left calc(50% - 44px)
  bottom 36px
  color #ffffff
  text-align center
  line-height 30px
  cursor pointer
.mode-recommend-icon
  background url('https://qjdstatic.oss-cn-hangzhou.aliyuncs.com/static-online/saas/riskExperts/chooseMode/recommend.png') no-repeat
  background-size contain
  width 25px
  height 33px
  position absolute
  top 0
  left 37px
</style>
