<!--
 * @Date: 2021-05-20 10:14:06
 * @LastEditors: 掉漆
 * @LastEditTime: 2021-06-07 14:43:31
-->
<template lang="pug">
.pie
  .back-card(:style='{backgroundColor: bgColor}')
  .sector1(:style='{transform: rotate1, backgroundColor: ftColor}')
  .sector2(:style='{transform: rotate2, backgroundColor: ftColor}')
  .blank-card
  .top-card
  .num {{ num }}
</template>

<script>

export default {
  props: {
    degree: { // 显示角度
      type: Number,
      default: 0
    },
    num: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      rotate1: 'rotate(-90deg)',
      rotate2: 'rotate(-270deg)',
      bgColor: '#E29A27',
      ftColor: '#EAEBEE'
    }
  },
  methods: {
    draw(degree) {
      if (degree <= 180) {
        this.rotate2 = `rotate(${degree - 270}deg)`
      } else if (degree <= 360) {
        this.rotate1 = `rotate(${degree - 450}deg)`
        this.bgColor = '#EAEBEE'
        this.ftColor = '#E29A27'
      }
    }
  },
  mounted() {
    this.draw(this.degree)
  },
  watch: {
    degree: () => {
      console.log('change')
    }
  }
}
</script>

<style lang="stylus" scoped>
.pie
  width 104px
  height 104px
  position relative
  margin 0 auto
  .back-card
    background-color #E29A27
    width 104px
    height 104px
    border-radius 52px
    z-index 2
    position absolute
    top 0
    left 0
    overflow hidden
  .sector1,.sector2
    transform-origin: 52px 52px;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 104px;
    height: 50px;
    background-color: #EAEBEE
    border-radius: 52px 52px 0 0;
    z-index 3
  .blank-card
    position absolute
    top 6px
    left 6px
    width 92px
    height 92px
    z-index 4
    border-radius 46px
    background-color #fff
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2) inset;
  .top-card
    z-index 5
    width 74px
    height 74px
    position absolute
    top 15px
    left 15px
    border-radius 37px
    background: linear-gradient(180deg, #FFFFFF 0%, #E7EAED 100%);
    box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.2), -1px 2px 4px 0px #FFFFFF, 1px -1px 4px 0px rgba(0, 0, 0, 0.1) inset;
  .num
    position absolute
    top 0
    left 2px
    width 100%
    line-height 108px
    height 104px
    font-size 28px
    z-index 6
</style>
