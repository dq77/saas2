<template lang="pug">
  .page-main
    .product-list-content
      PromptInfo(title='您可以在产品管理页面上传您的产品信息，这些产品信息将会展示在客户端，并且客户可以对这些产品进行下单。')
      TopTotalInfo
      Card(noTitle noWrap style='margin-bottom: 10px;')
        .form-area
          el-form(:model="form" label-position="top")
            .search-area
              .search-item
                el-form-item(label="分类")
                  el-select(v-model="form.categoryId" placeholder="请选择分类")
                    el-option(v-for='(val,key) in productClassifyList' :key='key' :label="val" :value="key")
              .search-item
                el-form-item(label="产品名称")
                  el-input(v-model="form.name" placeholder="请输入产品名称")
              .search-item
                el-form-item(label="产品型号")
                  el-input(v-model="form.productSn" placeholder="请输入产品型号")
              .search-item
                el-form-item(label="价格区间")
                  .u-range-wrap
                    el-input.u-range-input(v-model='form.minPrice' type='number' placeholder='最低价格')
                    span.u-gx -
                    el-input.u-range-input(v-model='form.maxPrice' type='number' placeholder='最高价格')
              .search-item
                el-form-item(label="产品状态")
                  el-select(v-model="form.publishStatus" placeholder="请选择产品状态")
                    el-option(label="生效" value="1")
                    el-option(label="失效" value="0")
              .search-item.btn-list
                el-button(type='primary' :loading='loading' @click='querySearchForm') 搜索
                el-button(:loading='loading' @click='resetSearchForm') 重置
      Card(noTitle noWrap)
        .table-area
          el-button.creat-product-btn(@click='toCreateProduct' type="primary" weblogs-anchor='supplyChain-factory-product-create') 新建产品
          el-button.creat-product-btn(@click='toBatchImport' type="primary" weblogs-anchor='supplyChain-factory-product-import') 批量导入
          el-table(:data="tableList" v-loading='loading' stripe)
            el-table-column(prop="mainPic" label="图片")
              template(slot-scope='{row}')
                el-image.u-img(:src='row.mainPicPath ? downloadImgUrl + row.mainPicPath : ""')
                  div(slot='error')
                    img(:src='`${$assetsBaseUrl}/common/alt.png`')
            el-table-column(prop="name" label="产品名称")
            el-table-column(prop="productSn" label="产品型号")
            el-table-column(prop="categoryName" label="分类")
            el-table-column(prop="specification" label="规格")
            el-table-column(prop="unitName" label="销售单位")
            el-table-column(prop="basePrice" label="单价")
              template(slot-scope='{row}')
                span {{row.basePrice ? `¥${toAmountStr(row.basePrice, 2, true)}` : '--'}}
            el-table-column(prop="publishStatus" label="产品状态")
              template(slot-scope='{row}')
                span {{row.publishStatus === 1 ? '生效' : '失效'}}
            el-table-column(prop="operate" label="操作")
              template(slot-scope='{row}')
                router-link.u-edit(:to='{ name: "productDetail", query: { id: row.id } }' weblogs-anchor='supplyChain-factory-product-detail') 查看
                router-link.u-edit(:to='{ name: "productEdit", query: { id: row.id } }' weblogs-anchor='supplyChain-factory-product-edit') 编辑
            template(slot='empty')
              .list-content-empty
                img.empty-img(:src='`${$assetsBaseUrl}/common/home/empty-table.png`')
              el-button(type='primary' @click='toCreateProduct') 新建产品
        el-pagination(:total='totalCount' :current-page.sync='pageNo' @current-change='changePage' layout='total, prev, pager, next, jumper')
</template>
<script>
import { onMounted, computed, ref, reactive } from '@vue/composition-api'
import { toAmountStr } from '@/utils/util'
import ajaxStore from '@/apis'
import TopTotalInfo from './Components/topTotalInfo'
import Card from '@/components/Card'
import { saasOrderStatus } from '@/utils/enums'
import { baseUrl } from '@/utils/config'
import { deepCopy } from '@/utils/qjd'
import Router from '@/router'
import PromptInfo from '../Components/PromptInfo.vue'

export default {
  components: {
    TopTotalInfo, Card, PromptInfo
  },
  setup(props, context) {
    const loading = ref(true)
    const tableList = ref([])
    const productClassifyList = ref([])
    const pageNo = ref(1)
    const totalCount = ref(0)
    const downloadImgUrl = computed(() => `${baseUrl}/saas-ofc/org/goodsAlbum/getAttachment?fileKey=`)
    const form = reactive({
      categoryId: '',
      name: '',
      productSn: '',
      minPrice: '',
      maxPrice: '',
      publishStatus: '',
    })
    const params = ref({})

    // 获取表格信息
    const getTableList = async (params) => {
      params.PageSize = 10
      for (const key in params) {
        if (params[key] === '') {
          delete params[key]
        }
      }
      loading.value = true
      const { factory: { getProductList } } = ajaxStore
      const res = await getProductList(params)
      loading.value = false
      if (res.data && res.data.code === '0') {
        tableList.value = res.data.data.pagedRecords
        totalCount.value = res.data.data.totalCount
      }
    }

    const toCreateProduct = () => { Router.push({ name: 'ProductCreate' }) }
    const toBatchImport = () => { Router.push({ name: 'productImport' }) }

    const querySearchForm = async () => {
      pageNo.value = 1
      params.value = deepCopy(form)
      getTableList({ pageNo: pageNo.value, ...params.value })
    }

    const resetSearchForm = async () => {
      for (const key in form) {
        if (form[key] !== '') {
          form[key] = ''
          params.value[key] = ''
        }
      }
      querySearchForm()
    }

    const getProductClassifyList = async () => {
      const res = await ajaxStore.factory.getProductClassifyList()
      if (res.data && res.data.code === '0') {
        const list = {}
        res.data.data.forEach((item) => {
          list[item.id] = item.name
        })
        productClassifyList.value = list
      }
    }

    const changePage = () => {
      getTableList({ pageNo: pageNo.value, ...params.value })
    }

    onMounted(() => {
      getProductClassifyList()
      getTableList({ pageNo: pageNo.value })
    })

    return {
      pageNo,
      totalCount,
      loading,
      form,
      tableList,
      productClassifyList,
      downloadImgUrl,
      saasOrderStatus,
      toCreateProduct,
      toBatchImport,
      getTableList,
      querySearchForm,
      resetSearchForm,
      changePage,
      toAmountStr
    }
  }
}
</script>
<style lang="stylus">
.product-list-content
  .form-area
    padding 20px 10px 0
    .search-area
      display flex
      flex-wrap wrap
      .search-item
        width 25%
        padding 0 10px
        .el-form-item__label
          color #494949
          line-height 14px
        .el-select
          width 100%
        .u-range-wrap
          width 100%
          border: 1px solid #DCDFE6;
          border-radius: 4px;
          .u-range-input
            width 45%
            .el-input__inner
              border none
          .u-gx
            display inline-block
            width 10%
            text-align center
      .btn-list
        margin-left auto
        display flex
        justify-content flex-end
        align-items flex-end
        padding-bottom 18px
  .table-area
    padding 20px
    .creat-product-btn
      margin-bottom 10px
    .u-img
      width 60px
      height 60px
      img
        width 100%
    .u-edit
      cursor pointer
      margin-right 5px
      display inline-block
  .el-pagination
    text-align right
    padding 20px
  .list-content-empty
    color #9AA6B8
    display flex
    flex-direction column
    justify-content center
    align-items center
    padding 15px 0
    text-align center
    .empty-img
      height 118px
    .fill-txt
      margin-top 20px
      line-height 20px
</style>
