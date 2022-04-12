<template lang="pug">
el-dialog(
  title='提示'
  width='550px'
  @close='afterClose'
  :visible.sync='visible')
  .p-tips 请先添加关注的企业
  .p-title 推荐企业
  el-scrollbar.p-company-list
    .p-item(v-for='(item, index) in top' :class='item.selected ? "p-selected" : ""' @click='switchSelect(item.name)')
      span {{item.name}}
      svg.icon.u-summary-icon(aria-hidden='true' v-if='item.selected')
        use(xlink:href='#iconxuanze')
      svg.icon.u-summary-icon(aria-hidden='true' v-else)
        use(xlink:href='#iconweixuanze')
  .p-footer
    el-button.p-btn(type='primary' plain @click='close') 取消
    el-button.p-btn(type='primary' @click='follow' :loading='followLoading') 确定
</template>

<script>
import { watch, reactive, toRefs } from '@vue/composition-api'
import useLoading from 'hooks/useLoading'
import useEventBus from '@/hooks/useEventBus'
import busStore from '@/utils/busStore'
import useFollow from '../hooks/useFollow'
import useRealEstateList from '../hooks/useRealEstateList'
export default {

  setup(props, { root, emit }) {
    const state = reactive({
      visible: false,
      top: []
    })

    const {
      followCompanyList,
      getFollowCompanyList,
      followCompanys
    } = useFollow()

    // loading
    const loadingMain = useLoading()
    const load = {
      loading: loadingMain.loading,
      checkLoading: loadingMain.checkLoading
    }

    const { getCompanyList, realEstateList } = useRealEstateList()

    getCompanyList()

    if (realEstateList.value && realEstateList.value.length) {
      realEstateList.value.slice(0, 9).map((item) => {
        state.top.push({
          name: item,
          selected: false
        })
      })
    }

    const init = async () => {
      await getFollowCompanyList()
      if (!followCompanyList.value.length) {
        state.top.map((company, key) => {
          state.top[key].selected = false
        })
        state.visible = true
      }
    }

    const afterClose = () => {
      if (!followCompanyList.value.length) {
        root.$router.back()
      }
    }

    const close = () => {
      state.visible = false
    }

    const switchSelect = (item) => {
      state.top.map((company, key) => {
        if (item === company.name) {
          state.top[key].selected = !state.top[key].selected
        }
      })
    }

    const { emitEvent } = useEventBus({
      event: busStore.reloadTopList,
    })

    const follow = async () => {
      const selectCompanys = []
      state.top.map((item) => {
        if (item.selected) {
          selectCompanys.push({
            accountId: '',
            companyName: item.name
          })
        }
      })
      load.checkLoading(true)
      await followCompanys(selectCompanys)
      load.checkLoading(false)
      state.visible = false
      emit('changeFollow')
      emitEvent()
    }

    init()

    const { initEvent } = useEventBus({
      event: busStore.checkRecommend
    })
    initEvent((data) => {
      init()
    })

    watch(
      () => realEstateList.value,
      (value) => {
        value.slice(0, 9).map((item) => {
          state.top.push({
            name: item,
            selected: false
          })
        })
      }
    )

    return {
      followCompanyList,
      realEstateList,
      switchSelect,
      follow,
      close,
      afterClose,
      followLoading: load.loading,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-company-list
  width 495px
  height 177px
  overflow hidden
  border 1px solid #F2F2F6
.p-tips
  text-align center
  margin-bottom 20px
.p-title
  margin-bottom 10px
.p-item
  padding 5px 10px
  cursor pointer
  display flex
  justify-content space-between
  align-items center
.p-item.p-selected
  background #E8ECF7
  color #3C5DA4
.p-footer
  display flex
  justify-content center
  margin-top 20px
.p-btn
  border-color #EAEBEE
</style>
