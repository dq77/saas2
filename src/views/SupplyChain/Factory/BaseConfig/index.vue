<template lang="pug">
.page-main
  PromptInfo(:title='promptInfoTitle')
  Card(title='新建客户与项目' style='background: none;border: none;')
    CardBlock(:blockData='item' v-for='(item, i) in configBOne' :key='i' @createHandle='createHandle')
  Card(title='新建产品信息' style='background: none;border: none;')
    CardBlock(:blockData='item' v-for='(item, i) in configBTwo' :key='i' @createHandle='createHandle')
  Card(title='新建价格信息' style='background: none;border: none;')
    CardBlock(:blockData='item' v-for='(item, i) in configBThree' :key='i' @createHandle='createHandle')
  Card(title='新建账户类型' style='background: none;border: none;')
    CardBlock(:blockData='item' v-for='(item, i) in configBFour' :key='i' @createHandle='createHandle')
  Card(title='新建和配置仓库' style='background: none;border: none;')
    CardBlock(:blockData='item' v-for='(item, i) in configBFive' :key='i' @createHandle='createHandle')
</template>

<script>
import PromptInfo from '../Components/PromptInfo.vue'
import { promptInfoTitle, configBOne, configBTwo, configBThree, configBFour, configBFive } from './config'
import Card from '@/components/Card'
import CardBlock from './CardBlock'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default {
  components: {
    PromptInfo,
    Card,
    CardBlock
  },
  setup(props, {root}) {
    const { order: { checkMenuAuth } } = ajaxStore.common
    const {doResult: _checkMenuAuth} = useAsync({
      request: checkMenuAuth,
      init: false,
    })
    const createHandle = (blockData) => {
      const name = blockData.name
      const params = { name, query: {} }
      if (blockData.query) params.query = blockData.query
      _checkMenuAuth({menuCode: blockData.menuTag}).then(res => {
        if (res?.data) {
          root.$router.push(params)
        }
      })
    }
    return {
      promptInfoTitle,
      configBOne,
      configBTwo,
      configBThree,
      configBFour,
      configBFive,
      createHandle
    }
  },
}
</script>

<style lang="stylus" scoped>
>>>.card-content
  display flex
  margin 0 0 20px
>>>.card-title
  .card-title_text
    margin-left 10px
  &:before
    content ''
    position absolute
    top 18px
    width 3px
    height 14px
    background #3B68F0
    border-radius 2px
.block-card
  width 23%
  background #fff
  margin-right 20px
  padding 20px
</style>
