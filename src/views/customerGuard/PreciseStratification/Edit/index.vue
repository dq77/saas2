<template lang="pug">
.page-main
  Tab(:current='current' :detail='submitState.checkObj' @setCurrent='setCurrent')
  .p-content
    CompanyBlock(
      v-show='current === "one"'
      :companyInfo='infoState.companyInfo'
      :companyStockList='infoState.companyStockList'
      :companyMaterialList='infoState.companyMaterialList'
      @reFresh='infoState.init'
      ref='refCompanySubmit'
    )
    LegalBlock(
      v-show='current === "two"'
      :legalInfo='infoState.legalInfo'
      :legalMaterialList='infoState.legalMaterialList'
      :legalHouseList='infoState.legalHouseList'
      :spouseLegalInfo='infoState.spouseLegalInfo'
      :spouseLegalMaterialList='infoState.spouseLegalMaterialList'
      :spouseLegalHouseList='infoState.spouseLegalHouseList'
      @addPersonInfo='infoState.addPersonInfo'
      @reFresh='infoState.init'
      ref='refLegalSubmit'
    )
    PersonBlock(
      v-show='current === "three"'
      :personInfo='infoState.personInfo'
      :personMaterialList='infoState.personMaterialList'
      :personHouseList='infoState.personHouseList'
      :spousePersonInfo='infoState.spousePersonInfo'
      :spousePersonMaterialList='infoState.spousePersonMaterialList'
      :spousePersonHouseList='infoState.spousePersonHouseList'
      @addPersonInfo='infoState.addPersonInfo'
      @reFresh='infoState.init'
      ref='refPersonSubmit'
    )
    .p-submit
      .p-submit-inner
        el-button.u-btn(type='primary' :loading='submitState.loading' @click='submitState.save({isSubmit: true})') 评估
        el-button.u-btn(:loading='submitState.loading' @click='submitState.save({isSubmit: false})') 保存
        el-button.u-btn(@click='$router.back()') 返回
    Modal(
      title="发起评估"
      :sureTxt="'确定'"
      :visible="submitState.modalVisible"
      :width="'600px'"
      @cancleHandle="submitState.modalCancleHandle"
      @sureHandle="submitState.modalSureHandle"
      :disabled='submitState.residualNumber === "0"'
      :loading='submitState.modalLoading'
    )
      div(v-show='submitState.modalLoading') 正在评估，请稍后…
      div(v-show='!submitState.modalLoading') 您的评估服务还剩 <span style="color: #FEBB27">{{submitState.residualNumber}}</span> 次，是否确定发起
</template>
<script>
import { ref, reactive, toRefs, onBeforeUnmount } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import Tab from './components/tab'
import CompanyBlock from './components/companyBlock'
import PersonBlock from './components/personBlock'
import LegalBlock from './components/legalBlock'
import useInfo from './hooks/useInfo'
import useSubmit from './hooks/useSubmit'

export default {
  components: {
    Tab,
    CompanyBlock,
    PersonBlock,
    LegalBlock,
    Modal
  },
  setup(props, {root}) {
    const refCompanySubmit = ref()
    const refPersonSubmit = ref()
    const refLegalSubmit = ref()
    // state
    const state = reactive({
      visible: false,
      current: 'one',
      infoState: {},
      submitState: {}
    })
    // 获取初始化信息
    state.infoState = useInfo({
      params: {
        companyBasicCode: root.$route.query.companyBasicCode
      }
    })
    const setCurrent = (status) => {
      state.current = status
      state.submitState.check()
    }
    state.submitState = useSubmit({
      companyBasicCode: root.$route.query.companyBasicCode,
      refCompanySubmit,
      refPersonSubmit,
      refLegalSubmit,
      goToList: (companyBasicCode) => root.$router.push({name: 'preciseStratificationDetail', query: {companyBasicCode}}),
      initPage: () => state.infoState.init()
    })
    // 开始自动检测一次
    setTimeout(() => {
      state.submitState.check()
    }, 3000)
    // 每隔10分钟自动保存一次
    const autoSave = setInterval(() => {
      state.submitState.save({
        isSubmit: false,
        isAuto: true
      })
    }, 120000)
    // const reloadMaterial = setInterval(() => {
    //   state.infoState.reloadMaterialList()
    // }, 60000)
    onBeforeUnmount(() => {
      clearInterval(autoSave)
      // clearInterval(reloadMaterial)
    })
    return {
      refCompanySubmit,
      refPersonSubmit,
      refLegalSubmit,
      setCurrent,
      ...toRefs(state),
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-content
  margin 20px 0
  background #fff
  padding-bottom 100px
.p-submit
  position sticky
  z-index 999
  bottom 0
  left -20px
  right -20px
  padding 20px
  box-shadow 0px -2px 6px 0px rgba(51, 75, 133, 0.2)
  border 1px solid #ECEDF1
  background #fff
  .p-submit-inner
    display flex
    justify-content center
    align-items center
    .u-btn
      margin-right 20px
      &:last-child
        margin-right 0
</style>
