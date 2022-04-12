<template lang="pug">
.page-main
  el-card.attr-box
    div(slot='header' class='clearfix')
      span 价格策略
    .price-radio-box
      span(style='width: 70px;display: inline-block;margin-top: 6px;') 价格策略：
      div
        <el-radio-group v-model="radio">
          <el-radio :label="3">独立价格策略：只根据项目、客户或基础价格中的一个价格来确定产品的价格。</el-radio>
          <el-radio :label="6">联合价格策略：根据多个价格来源进行优先级排列，从优先级最高的价格开始依次取值，若最上级价格不存在，则取其下级的价格，以此类推。</el-radio>
        </el-radio-group>
    el-card(shadow='never' style='width:748px;margin-left: 70px;margin-top: 20px;background: #F8F9FA;')
      div(slot='header' class='clearfix')
        span 价格策略配置
      div(v-if="radio === 3") 请选择具体价格来源，所选择的价格将作为客户下单时的产品价格。
      div(v-else) 请至少选择两个价格来源，并对各个价格的优先级进行排序，一级价格为最高。若产品有一级价格，则此价格将作为客户下单时的产品价格；若没有一级价格，则会将其二级价格作为客户下单时的产品价格，以此类推。
      .price-value-box(v-if="radio === 3")
        el-select(v-model="singlePrice" placeholder="请选择")
          el-option(v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value")
      .price-joint-box(v-else)
        .joint-price-box
          div(v-for="(item,i) in jointStrategy" style='margin-bottom:20px')
            span {{item.priceText}}
            el-select(v-model="item.priceStrategy" placeholder="请选择")
              el-option(v-for="subitem in options"
                :key="subitem.value"
                :label="subitem.label"
                :value="subitem.value")
            span(v-if="i>1" style='color:#FF3E00;margin-left:10px;cursor:pointer' @click="handleDel") 移除
      el-button(type="primary" icon="el-icon-circle-plus-outline" plain v-if="radio !== 3 && jointStrategy.length<3" style='margin-left:60px' @click="handleAdd") 添加价格
  div(style='text-align:center;width:100%;margin-top:20px')
    el-button(type="primary" class='save-btn'  @click="handleSave") 保存
</template>

<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { Message } from 'element-ui'
import {isRepeat} from '@/utils/util.js'
export default {
  setup(props, {root}) {
    const radio = ref()
    const singlePrice = ref('')
    const options = [{label: '项目价格', value: 'project'}, {label: '客户价格', value: 'user'}, {label: '基础价格', value: 'goods'}]
    const jointStrategy = [{priceText: '一级价格：', priceStrategy: ''}, {priceText: '二级价格：', priceStrategy: ''}]
    const state = reactive({jointStrategy})
    const {type} = root.$route.query

    // 接口
    const {factory: {editPayCompute, addPayCompute, getPayCompute}} = ajaxStore
    useAsync({
      request: getPayCompute,
      init: true,
      successCallBack: ({data}) => {
        radio.value = data && data.strategy && data.strategy.includes('|') ? 6 : 3
        if (radio.value === 3) {
          singlePrice.value = data.strategy
        } else {
          state.jointStrategy = []
          data.strategy.split('|').map((item, i) => {
            const textData = ['一级价格：', '二级价格：', '三级价格：']
            state.jointStrategy.push({
              priceStrategy: item,
              priceText: textData[i]
            })
          })
        }
      }
    })
    // 添加
    const handleAdd = () => {
      state.jointStrategy.push({priceText: '三级价格：', priceStrategy: ''})
    }
    const handleDel = () => {
      state.jointStrategy.splice(2, 1)
    }
    const successCallBack = ({ code }) => {
      if (code === '0') {
        Message.success('处理成功')
        root.$router.go(-1)
      }
    }
    const { doResult: editFn } = useAsync({
      request: editPayCompute,
      init: false,
      successCallBack
    })

    const { doResult: addFn } = useAsync({
      request: addPayCompute,
      init: false,
      successCallBack
    })

    // 处理参数
    const getSendData = () => {
      if (radio.value === 3) {
        return {strategy: singlePrice.value}
      } else {
        return {
          strategy: state.jointStrategy.filter(item => item.priceStrategy).map(item => item.priceStrategy).join('|')
        }
      }
    }
    const handleSave = () => {
      console.log('radioooooo', radio)
      console.log('xxxxxxxx', getSendData())
      const arr = getSendData().strategy.split('|')
      const repeatFlag = isRepeat(arr)
      if (repeatFlag) {
        Message.warning('价格取值不可以重复')
        return
      }
      if (type === 'edit') {
        editFn(getSendData())
      } else {
        addFn(getSendData())
      }
    }
    return {
      radio,
      singlePrice,
      options,
      handleAdd,
      handleDel,
      handleSave,
      ...toRefs(state)
    }
  }
}

</script>
<style lang='stylus' scoped>
.attr-box
  position relative
  width 100%
  // min-height 719px
  background #FFFFFF
  box-shadow 0px 8px 16px 0px rgba(0, 0, 0, 0.05)
  border 1px solid #EAEBEE
  padding 20px
  .price-radio-box
    display flex
    .el-radio
      display block
      line-height 30px
  .price-value-box
    display flex
    align-items center
    margin-top 20px
  .joint-price-box
    display flex
    flex-flow column
  .price-joint-box
    display flex
    margin-top 20px
  .save-btn
    position absolute
    top 30px
    right 50px
</style>
