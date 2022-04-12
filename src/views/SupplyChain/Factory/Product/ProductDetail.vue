<template lang="pug">
  .page-main(v-loading='loadingPage')
    el-collapse(v-model='activeIndex')
      el-collapse-item(:name='1' title='产品详情')
        .p-section1
          .p-section1-left
            el-image(style='width:364px;height: 364px' :src='productDetail.mainPicPath?downloadImgUrl + productDetail.mainPicPath:""')
              div(slot='error')
                img(:src='`${$assetsBaseUrl}/common/alt.png`')
          .p-section1-right
            .p-section1-title
              span {{productDetail.name || '好用的油漆'}}
            .p-section1-content
              dl
                dt 原价（元）：
                dd
                  span(v-if='productDetail.basePrice').p-line-through {{productDetail.basePrice}}
                  span.p-red {{productDetail.salePrice || ''}}
                  span /{{productDetail.unitName || '--'}}
              dl
                dt 产品分类：
                dd {{productDetail.categoryName  || '--'}}
              dl
                dt 产品型号：
                dd {{productDetail.productSn || '--'}}
              dl
                dt 产品简码：
                dd {{productDetail.shortCode || '--'}}
              dl
                dt 规&ensp;&ensp;格：
                dd {{productDetail.specification || '--'}}
              dl
                dt 销售单位：
                dd {{productDetail.unitName || '--'}}
              dl
                dt 产品属性：
                dd(v-if="productDetail.extendAttribute && productDetail.extendAttribute.length") {{attrText}}
                dd(v-else) 统一属性
              dl
                dt 产品标签：
                dd {{productDetail.labelName || '--'}}
      el-collapse-item(:name='2' title='产品描述')
        div(v-if='productDetail.detailHtml' v-html='productDetail.detailHtml')
        div(v-else class='p-none') 暂无产品描述~~~
      el-collapse-item(:name='3' title='关联产品')
        el-table(:data='relateProductList')
          el-table-column(prop='mainPicPath' label='产品图片')
            template(slot-scope='{row}')
              el-image.u-img(:src='row.mainPicPath?downloadImgUrl + row.mainPicPath:""')
                div(slot='error')
                  img(:src='`${$assetsBaseUrl}/common/alt.png`')
          el-table-column(prop='name' label='产品名称')
          el-table-column(prop='productSn' label='产品型号')
      el-collapse-item(:name='4' title='附件')
        el-table(:data='attachmentFileList')
          el-table-column(prop='attachmentTitle' label='附件名称')
          el-table-column(prop='attachmentMemo' label='附件描述')
          el-table-column(label='附件')
            template(slot-scope='{row}')
              a(:href='downloadFileUrl+row.attachmentFileKey' target='_blank') {{row.attachmentFileName}}
    //- .p-button
    //-   el-button(round @click="$router.go(-1)") 返回
</template>

<script>
import { baseUrl } from '@/utils/config'

export default {
  data() {
    return {
      loadingPage: false,
      activeIndex: [1, 2, 3, 4],
      productDetail: {},
      relateProductList: [],
      attachmentFileList: [],
      attrText: ''
    }
  },
  computed: {
    downloadImgUrl: () => `${baseUrl}/saas-ofc/org/goodsAlbum/getAttachment?fileKey=`,
    downloadFileUrl: () => `${baseUrl}/saas-ofc/org/goodsAttachment/getAttachment?fileKey=`,
  },
  methods: {
    async getProductDetail() {
      const res = await this.$http.factory.getProductDetail({ id: this.$route.query.id })
      if (res.data && res.data.code === '0') {
        const {goodsDetailsVO, relationGoodsVOList, goodsAttachmentVOList} = res.data.data
        this.productDetail = res.data.data
        this.productDetail.detailHtml = goodsDetailsVO && goodsDetailsVO.detailHtml
        this.relateProductList = relationGoodsVOList
        this.attachmentFileList = goodsAttachmentVOList
        this.attrText = res.data.data.extendAttribute && res.data.data.extendAttribute.length ? res.data.data.extendAttribute.map(item => item.name).join('、') : ''
      }
    }
  },
  created() {
    this.getProductDetail()
  },
}
</script>

<style lang='stylus' scoped>
>>>.el-collapse
      padding 20px
      background-color #fff
      border-radius 10px
      border none
      .el-collapse-item__header
        font-size 16px
      .el-collapse-item__wrap
        border-bottom none
      .el-collapse-item__header.is-active
        border-bottom-color #EBEEF5
.page-main
  .p-section1
    display flex
    // justify-content space-between
    padding 20px 20px 40px
    .p-section1-left
      width 364px
    .p-section1-right
      flex 1
      margin-left 20px
      .p-section1-title
        font-size 18px
        color #494949
  .p-section1-content
    dl
      dt
        display inline-block
        width 80px
        // vertical-align top
      dd
        display inline-block
        width 460px
    .p-line-through
      text-decoration line-through
    .p-red
      font-size 18px
      color #F55849
  .u-img
    width 60px
    height 60px
    img
      width 100%
.el-image
  width 364px
  height 364px
  img
    width 100%
.p-none
  text-align center
  margin-top 20px
</style>
