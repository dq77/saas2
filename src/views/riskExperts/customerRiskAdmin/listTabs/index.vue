<template lang="pug">
.p-mode-main
  TabsInCard(:tabs='tabConfig' :defaultTab='page' @change='changePage')
</template>

<script>
import TabsInCard from '@/components/TabsInCard'
export default {
  components: {
    TabsInCard
  },

  props: {
    tabConfig: {
      type: Array,
      default: () => ([])
    },
    page: {
      type: String,
      default: ''
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
