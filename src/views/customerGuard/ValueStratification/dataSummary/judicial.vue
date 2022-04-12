<template lang='pug'>
.vs-judicial
  .vs-judicial__title
    span 司法风险
    router-link(:to='{ name: "riskDetails" }' weblogs-anchor='customerGuard-worth-more') 查看更多<i class='el-icon-arrow-right'></i>
  ul.vs-judicial__total
    li.vs-judicial__total-li(v-for='(item, index) in list' :key='index')
      .vs-judicial__total-li--number {{item.value}}
      .vs-judicial__total-li--title {{item.title}}<br/>(个)
</template>

<script>
import ajaxStore from '@/apis'
import { ref } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'

export default {
  setup() {
    const list = ref([])
    // api
    const { selectOneYuqing } = ajaxStore.risk
    const { loading } = useAsync({
      isLoading: true,
      request: selectOneYuqing,
      successCallBack: ({ data }) => {
        const { sifaCnt, zhixingCnt, shixinCnt, xiangaoCnt, jingyingycCnt, dongchanCnt, chufaCnt } = data
        list.value = [
          { title: '司法诉讼案件数', value: sifaCnt },
          { title: '被执行人案件数', value: zhixingCnt },
          { title: '失信案件数', value: shixinCnt },
          { title: '限制高消费案件数', value: xiangaoCnt },
          { title: '经营异常案件数', value: jingyingycCnt },
          { title: '动产抵押案件数', value: dongchanCnt },
          { title: '行政处罚案件数', value: chufaCnt }
        ]
      }
    })
    return {
      loading,
      list
    }
  }
}
</script>

<style lang='stylus' scoped>
.vs-judicial
  &__title
    font-size 14px
    margin-bottom 20px
    display flex
    align-items center
    justify-content space-between
    a
      font-size 12px
  &__total
    height 150px
    margin-bottom 10px
    display flex
    justify-content space-between
    align-items center
    border 1px solid #EAEBEE
    &-li
      height 73px
      flex-grow 1
      text-align center
      border-right 1px solid #EAEBEE
      &--number
        margin-bottom 10px
        font-size 26px
        font-weight bold
      &--title
        font-size 12px
        font-weight bold
        color #9AA6B8
</style>
