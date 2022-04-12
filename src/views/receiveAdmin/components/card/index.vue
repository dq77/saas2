<template lang="pug">
.card_box
  .card_title
    span {{ title }}
    span(v-if="percent || percent === 0") :
    span.card_percent(v-if="percent || percent === 0") {{ percent }}%
  .card_content
    slot(name="content")
    span(v-if="!slots['content']") {{ money }}
    span.unit {{ unit }}
</template>
<script>
export default {
  props: {
    title: String,
    percent: [Number, String],
    money: [Number, String],
    unit: String
  },
  setup(props, { slots }) {
    return {
      slots
    }
  },
}
</script>
<style lang="stylus" scoped>
.card_box
  width: 25%;
  height: 80px;
  background: #F8F9FA;
  border-radius: 4px;
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  margin-right: 20px
  .card_title
    font-size: 12px;
    font-weight: 400;
    color: #383B42;
    margin-bottom: 8px
  .card_percent
    color: #3B68F0
    margin-left: 3px
  .card_content
    font-size: 18px;
    font-weight: 600;
    color: #383B42;
    .unit
      font-weight: normal
      font-size: 12px
      margin-left: 4px
</style>
