<template lang="pug">
.notice_box(
  :style="`background: ${typeInfos[type].background}; color: ${typeInfos[type].color}; top: ${top}px; right: ${right}px`"
)
  .notice_top(
    :style="`background: ${typeInfos[type].topBg};`"
  )
  .notice_header(ref="target")
    .notice_header_left
      i.icon.iconfont.icontishi(style="font-size: 14px; margin-right: 4px; position: relative; top: -1px")
      span 请注意{{ type === 'error' ? '，无法完成该类型授信' : ''}}
    .notice_header_right(@click="doneHandle") {{ status ? '收起' : '展开' }}
  .notice_content(:style="`max-height: ${ status ? '400px' : 0 }`")
    .notice_title {{ member ? `${member}，` : '你' }}已触犯的规则如下：
    .notice_rules
      div(
        v-for="(item, index) in (rules || [])"
        :key="index"
      ) {{ item }}
</template>
<script>
import { ref } from '@vue/composition-api'
// 配置信息
import { typeInfos } from './config'
import useMove from 'hooks/useMove'

export default {
  props: {
    rules: {
      type: Array,
      default: () => []
    },
    member: String,
    type: {
      type: String,
      default: 'warn'
    }
  },
  setup() {
    // 移动元素ref
    const target = ref(null)
    // 默认展开
    const status = ref(true)
    // 展开or收起
    const doneHandle = () => { status.value = !status.value }
    // 位置
    const { right, top } = useMove({ right: 30, top: 90, target, refWidth: 340, refHeight: 45 })
    return {
      target,
      top,
      right,
      status,
      typeInfos,
      doneHandle
    }
  },
}
</script>

<style lang="stylus" scoped>
.notice_box
  position fixed
  width 340px
  box-shadow 0px 4px 8px 0px rgba(0, 0, 0, 0.1)
  border-radius 4px
  font-size 12px
  z-index 3000
  overflow hidden
  .notice_top
    height 5px
    width 100%
  .notice_header
    height 45px
    padding 0 20px
    display flex
    justify-content space-between
    align-items center
    cursor move
    .notice_header_right
      cursor pointer
  .notice_content
    transition all .2s
    .notice_title
      padding-left 40px
      line-height 20px
      margin-bottom 10px
    .notice_rules
      padding-left 40px
      line-height 20px
      margin-bottom 32px
</style>
