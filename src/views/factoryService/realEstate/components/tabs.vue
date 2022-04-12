<template lang="pug">
.p-mode-main
  el-button.p-mode-btn(@click='changePage("realEstateDetail")' :class='page === "realEstateDetail" ? "p-current-btn" : ""' weblogs-anchor='factory-customerEvaluation-company') 开发商详情
  el-button.p-mode-btn(@click='changePage("realEstateMyFollow")' :class='page === "realEstateMyFollow" ? "p-current-btn" : ""' weblogs-anchor='factory-customerEvaluation-follow') 我的关注
  el-button.p-mode-btn(@click='changePage("myRealEstateReport")' :class='page === "myRealEstateReport" ? "p-current-btn" : ""' weblogs-anchor='factory-customerEvaluation-report') 我的报告
</template>

<script>
export default {

  props: {
    page: {
      type: String,
      default: 'realEstateDetail'
    }
  },

  setup(props, { root }) {
    const changePage = (name) => {
      root.$router.push({
        name
      })
    }

    return {
      changePage
    }
  }

}
</script>

<style lang="stylus" scoped>
.p-mode-main
  margin-bottom 20px
.p-mode-btn
  border none
  padding 13px 30px
  color #3C5DA4
  font-size 14px
  height auto
  border-radius 4px
  box-shadow 0px 8px 16px 0px rgba(0, 0, 0, 0.05)
.p-current-btn
  background #3C5DA4
  color #fff
</style>
