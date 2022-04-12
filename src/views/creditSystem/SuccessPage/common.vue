<template lang="pug">
.content
  img(:src="`${$assetsBaseUrl}/creditSystem/overview/success.png`")
  .success_title {{ title }}提交成功
  .success_info {{ title }}信息已提交完成 , 辛苦了～
  .content_box
    el-button(@click="backOverHandle") 返回赊销工作台
    el-button(type="primary" @click="goonHandle") 继续提交{{ title }}
</template>
<script>
import { configs } from './config'

export default {
  setup(props, { root }) {
    const { $route: { query: { key } }, $router } = root

    const title = configs?.[key]?.title ?? ''

    const name = configs?.[key]?.name ?? ''

    const backOverHandle = () => $router.push({ name: 'creditOverview' })

    const goonHandle = () => $router.push({ name })

    return {
      title,
      backOverHandle,
      goonHandle
    }
  },
}
</script>
<style lang="stylus" scoped>
.content
  display flex
  flex-direction column
  align-items center
  justify-content: center
  height: 100%
  img
    width 230px
  .success_title
    height 20px
    font-size 14px
    font-weight 500
    color #494949
    line-height 20px
    margin-bottom 6px
  .success_info
    height 17px
    font-size 12px
    font-weight 400
    color #A9AFB8
    line-height 17px
    margin-bottom 28px
</style>
