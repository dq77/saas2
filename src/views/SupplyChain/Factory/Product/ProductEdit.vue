<template lang="pug">
.page-main(v-loading='loadingPage')
  Card(noTitle)
    el-collapse(v-model='activeIndex')
      el-collapse-item(:name='1' title='产品详情')
        el-form.p-section(ref='productDetailForm' :model='productDetailForm' label-width='120px' :rules="formRules")
          el-row(:gutter='150')
            el-col(:span='12')
              el-form-item(label='产品名称：' prop="name")
                el-input(v-model='productDetailForm.name')
            el-col(:span='12')
              el-form-item(label='产品分类：' prop="categoryId")
                el-select(v-model='productDetailForm.categoryId' filterable clearable remote @change="handleChangeCategory" :remote-method='remoteProductClassify'  @focus='() => getSelectProductClassify("")' :loading='dialogLaading'  style='width:100%')
                  el-option(v-for='(item, index) in selectProductClassify' :label='item.name' :value='item.id' :key='item.id')
            el-col(:span='12')
              el-form-item(label='产品型号：' prop="productSn")
                el-input(v-model='productDetailForm.productSn')
            el-col(:span='12')
              el-form-item(label='产品简码：' prop="shortCode")
                el-input(v-model='productDetailForm.shortCode')
            el-col(:span='12')
              el-form-item(label='外部ID：')
                el-input(v-model='productDetailForm.extId' :disabled="productDetailForm.sourceType === 0")
            el-col(:span='12')
              el-form-item(label='产品规格：')
                el-input(v-model='productDetailForm.specification')
            el-col(:span='12')
              el-form-item(label='是否禁用：')
                el-switch(v-model='productDetailForm.publishStatus' :active-value='0' :inactive-value='1')
            el-col(:span='12')
              el-form-item(label='销售单位：')
                el-input(v-model='productDetailForm.unitName')
            el-col(:span='12')
              el-form-item(label='产品属性：')
                el-radio-group(v-model='productDetailForm.selectType')
                  el-radio(:label="0") 统一属性
                  el-radio(:label="2") 多级属性
            el-col(:span='12')
              span &nbsp;
            el-col(:span='12')
              el-form-item(label='产品标签' prop="labelCode")
                el-select(
                  filterable
                  v-model='productDetailForm.labelCode'
                )
                  el-option(
                    v-for='item in labelCodeOptions'
                    :label='item.label'
                    :value='item.value'
                    :key='item.value'
                  )
            el-col(:span='12')
              el-form-item(label='基础价格：')
                el-input(v-model='productDetailForm.basePrice' @input='(val) => limitInputFunc(val, productDetailForm)' placeholder='请输入基础价格')
            el-col(:span='24' v-if="productDetailForm.selectType === 2")
              el-form-item(label='')
                .attr-box(v-for="(attrItem,attrIdx) in attrData" :key="attrIdx")
                  .attr-content
                    span 产品属性：
                    el-select(v-model='attrItem.value' filterable clearable remote :remote-method='remoteAttrName' @focus='() => getSelectReleateAttr("")' :loading='dialogLaading' placeholder='请输入产品属性' style='width:80%' @change="()=>{attrItem.isChange = true}")
                      el-option(v-for='(item, index) in selectAttrData' :label='item.name' :value='item.spell' :key='item.id')
                  .attr-btn(@click="handleDelAttr(attrIdx)" style='cursor:pointer') 删除
                .add-attr-btn(@click="handleAddAttr" v-if="attrData && attrData.length<5")
                  i(class="el-icon-circle-plus-outline")
                  span 添加商品属性
          el-row(:gutter='150')
            el-col(:span='24')
              el-form-item(label='产品描述：')
                product-quill-editor(:detailHtml.sync='productDetailForm.detailHtml' ref='quillTextEditor' style='min-height:120px')
          el-row(style='margin-top:50px;text-align: center')
            el-button(type='primary' @click='updataProductDetail') 保存
      el-collapse-item(:name='2' title='轮播图')
        el-upload(:action='uploadImgUrl'
          :data='{goodsId}'
          :limit='5'
          :on-exceed='(file, fileList) => handleExceed(file, fileList, "5")'
          accept='.jpg,.png,.JPG,.PNG'
          :on-success='handleAlbumPicSuccess'
          :file-list='carouselList'
          list-type='picture-card'
          ref='pictureUpload'
        )
          i(slot='default' class='el-icon-plus')
          div(slot='file' slot-scope='{file, fileList}')
            img(:src='file.url' class='p-upload-item-img')
            span(class='p-upload-item-actions-deleate')
              span(@click='picDeleate(file)')
                i(class='el-icon-delete')
            div(class='p-upload-item-actions-set')
              span.p-tip-btn(v-if='file.url === mainPicPath' type='text') 主图
              el-button(style='color:#25becd;width:100%' v-else type='text' @click='setMainPic(file)') 设为主图
      el-collapse-item(:name='3' title='关联产品')
        el-button.p-button(type='primary' @click='dialogProductAdd=true') 新增
        el-table(:data='relateProductList')
          el-table-column(prop='mainPicPath' label='产品图片')
            template(slot-scope='{row}')
              el-image.u-img(:src='row.mainPicPath?downloadImgUrl + row.mainPicPath:""')
                div(slot='error')
                  img(:src='`${$assetsBaseUrl}/common/alt.png`')
          el-table-column(prop='name' label='产品名称')
          el-table-column(prop='productSn' label='产品型号')
          el-table-column(label='操作')
            template(slot-scope='{row}')
              el-button(type='text' @click='deleteReleateProduct(row)') 删除
      el-collapse-item(:name='3' title='上传附件')
        el-button.p-button(type='primary' @click='dialogAttachmentFile=true') 上传附件
        el-table(:data='attachmentFileList')
          el-table-column(prop='attachmentTitle' label='附件名称')
          el-table-column(label='附件描述')
            template(slot-scope='{row}')
              span {{row.attachmentMemo || '--'}}
          el-table-column(label='附件')
            template(slot-scope='{row}')
              a(:href='downloadFileUrl+row.attachmentFileKey' target='_blank') {{row.attachmentFileName}}
          el-table-column(label='操作')
            template(slot-scope='{row}')
              el-button(type='text' @click='deleteAttachmentFile(row)') 删除
    el-dialog(title='新增产品' :visible.sync='dialogProductAdd' center width='330px')
      el-select(v-model='relateProductId' filterable clearable remote :remote-method='remoteProductList' :loading='dialogLaading' placeholder='请输入关联商品' style='width:100%')
        el-option(v-for='(item, index) in selectReleateProductList' :label='item.name' :value='item.id' :key='item.id')
      span(slot='footer')
        el-button(@click='dialogProductAdd = false') 取消
        el-button(type='primary' @click='addReleateProduct') 确定
    el-dialog(title='上传附件' :visible.sync='dialogAttachmentFile' center width='470px')
      el-form(:model='attachmentFileForm' ref='attachmentFileForm')
        el-form-item(label='附件名称' prop='fileTitle' :rules='{required: true, message: "请输入附件名称", trigger: "blur"}')
          el-input(v-model='attachmentFileForm.fileTitle')
        el-form-item(label='附件描述' prop='fileMemo')
          el-input(v-model='attachmentFileForm.fileMemo')
        el-form-item(label='上传')
          el-upload(:action='uploadFileUrl'
            :on-success='handleAttachmentFileSuccess'
            accept='.jpg,.png,.pdf,.JPG,.PNG,.PDF'
            :limit='1' :on-exceed='(file, fileList) => handleExceed(file, fileList, "1")'
            :file-list='uploadFileList'
            :data='{goodsId, fileTitle: attachmentFileForm.fileTitle, fileMemo: attachmentFileForm.fileMemo}'
            :auto-upload='false'
            class='p-upload'
            ref='uploadAttachmentFile'
          )
            el-button(type='primary' plain) 上传
            div(slot='tip' class='p-upload-slot') 仅支持PDF、JPG、PNG，大小不超过50M
      span(slot='footer')
        el-button(@click='dialogAttachmentFile = false') 取消
        el-button(type='primary' @click='addAttachmentFile') 确定
</template>

<script>
import Card from '@/components/Card'
import { baseUrl } from '@/utils/config'
import ProductQuillEditor from './Components/ProductQuillEdit'

export default {
  data() {
    return {
      isSelectCategory: false,
      loadingPage: false,
      activeIndex: [1, 2, 3, 4],
      goodsId: this.$route.query.id,
      productDetailForm: {
        selectType: 0
      },
      relateProductList: [],
      attachmentFileList: [],
      carouselList: [],
      dialogProductAdd: false,
      dialogAttachmentFile: false,
      relateProductId: '',
      selectReleateProductList: [],
      dialogLaading: false,
      selectProductClassify: [], // 产品分类
      uploadFileList: [],
      attachmentFileForm: {
        fileMemo: ''
      },
      selectAttrData: [],
      attrData: [{
        value: '',
        isChange: false
      }],
      formRules: {
        name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
        categoryId: [{required: true, message: '请选择产品分类', trigger: 'blur'}],
        productSn: [{required: true, message: '请输入产品编码', trigger: 'blur'}],
        shortCode: [{required: true, message: '请输入产品简码', trigger: 'blur'}],
        unitName: [{required: true, message: '请输入销售单位', trigger: 'blur'}],
      },
      mainPicPath: '',
      labelCodeOptions: [], // 产品标签的下拉项
    }
  },
  computed: {
    uploadImgUrl: () => `${baseUrl}/saas-ofc/org/goodsAlbum/picUpload`,
    downloadImgUrl: () => `${baseUrl}/saas-ofc/org/goodsAlbum/getAttachment?fileKey=`,
    uploadFileUrl: () => `${baseUrl}/saas-ofc/org/goodsAttachment/attachmentUpload`,
    downloadFileUrl: () => `${baseUrl}/saas-ofc/org/goodsAttachment/getAttachment?fileKey=`,
  },
  components: {
    Card,
    ProductQuillEditor
  },
  methods: {
    // 模糊搜索属性名
    remoteAttrName(query) {
      if (query !== '') {
        this.dialogLaading = true
        setTimeout(() => {
          this.dialogLaading = false
          this.getSelectReleateAttr(query)
        }, 200)
      } else {
        this.selectAttrData = []
      }
    },
    // 获取属性名
    async getSelectReleateAttr(query) {
      const res = await this.$http.factory.getAttrName({ attributeName: query })
      if (res.data && res.data.code === '0') {
        this.selectAttrData = res.data.data
      }
    },
    async getLabelCodeOptions() {
      const res = await this.ajaxStore.factory.getProductSignList()
      if (res?.data?.code === '0') {
        this.labelCodeOptions = res.data.data.map(item => {
          return {
            label: item.labelName,
            value: item.labelCode
          }
        })
      }
    },
    // 添加商品属性
    handleAddAttr() {
      this.attrData.push({value: '', isChange: false})
    },
    // 删除商品属性
    handleDelAttr(idx) {
      this.attrData.splice(idx, 1)
    },
    // 产品分类选中函数
    handleChangeCategory(val) {
      this.isSelectCategory = true
    },
    // 过滤返回数据
    filterSign(arr) {
      const arr1 = []
      if (!arr) return []
      arr.map(item => {
        const obj = {}
        obj.value = item.name
        obj.name = item.value.slice(2)
        obj.isChange = false
        arr1.push(obj)
      })
      return arr1
    },
    async getProductDetail() {
      const res = await this.$http.factory.getProductDetail({ id: this.goodsId })
      if (res.data && res.data.code === '0') {
        const {goodsDetailsVO, relationGoodsVOList, goodsAttachmentVOList, goodsAlbumVOList, categoryName, extendAttribute} = res.data.data
        this.productDetailForm = res.data.data
        this.productDetailForm.noChangeCategoryId = res.data.data.categoryId
        this.productDetailForm.categoryId = categoryName
        this.$set(this.productDetailForm, 'selectType', extendAttribute && extendAttribute.length ? 2 : 0)
        // 处理多级属性
        this.attrData = this.filterSign(extendAttribute)
        this.productDetailForm.detailHtml = goodsDetailsVO && goodsDetailsVO.detailHtml
        this.productDetailForm.detailHtmlId = goodsDetailsVO && goodsDetailsVO.id
        this.relateProductList = relationGoodsVOList
        this.attachmentFileList = goodsAttachmentVOList
        this.carouselList = this.fileterFileFunc(goodsAlbumVOList)
        this.mainPicPath = this.carouselList.length && this.carouselList[0].url
      }
    },
    async getReleateProductList() {
      const res = await this.$http.factory.getReleateProductList({ goodsId: this.goodsId })
      if (res.data && res.data.code === '0') {
        this.relateProductId = ''
        this.selectReleateProductList = []
        this.relateProductList = res.data.data
      }
    },
    async getAttachmentFileList() {
      const res = await this.$http.factory.getAttachmentFileList({ goodsId: this.goodsId })
      if (res.data && res.data.code === '0') {
        this.attachmentFileList = res.data.data
      }
    },
    remoteProductClassify(query) {
      if (query !== '') {
        this.dialogLaading = true
        setTimeout(() => {
          this.dialogLaading = false
          this.getSelectProductClassify(query)
        }, 200)
      } else {
        this.selectProductClassify = []
      }
    },
    // 获取产品分类
    async getSelectProductClassify(query) {
      const res = await this.$http.factory.categorySearch({ keyword: query })
      if (res.data && res.data.code === '0') {
        this.selectProductClassify = res.data.data
      }
    },
    async getAlbumList() {
      const res = await this.$http.factory.getAlbumList({ goodsId: this.goodsId })
      if (res.data && res.data.code === '0') {
        this.carouselList = this.fileterFileFunc(res.data.data)
        this.mainPicPath = this.carouselList.length && this.carouselList[0].url
      }
    },
    async addReleateProduct() {
      if (!this.relateProductId) {
        this.$message.error('请输入选择关联商品')
        return
      }
      const res = await this.$http.factory.addReleateProduct({ goodsId: this.goodsId, relationGoodsId: this.relateProductId })
      if (res.data && res.data.code === '0') {
        this.$message.success('产品新增成功')
        this.dialogProductAdd = false
        this.getReleateProductList()
      }
    },
    // 是否有重复数据
    isRepeat(arr) {
      const hash = {}
      for (const i in arr) {
        if (hash[arr[i]] && arr[i]) {
          return true
        }
        hash[arr[i]] = true
      }
      return false
    },
    deleteReleateProduct(row) {
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.factory.deleteReleateProduct({ id: row.id })
        if (res.data && res.data.code === '0') {
          this.$message.success('删除成功！')
          this.getReleateProductList()
        }
      })
    },
    async updataProductDetail() {
      const sendAttrData = []
      this.attrData.map(item => {
        const obj = {}
        if (!item.isChange) {
          obj.value = item.name
        } else {
          obj.value = item.value
        }
        sendAttrData.push(obj)
      })
      const repeatFlag = this.isRepeat(sendAttrData.map(item => item.value))
      if (repeatFlag) {
        this.$message.warning('不可以选择重复的属性')
        return
      }
      this.$refs.productDetailForm.validate(async valid => {
        if (valid) {
          const {categoryId, ...otherField} = this.productDetailForm
          const params = {
            categoryId: this.isSelectCategory ? categoryId : this.productDetailForm.noChangeCategoryId,
            ...otherField,
            id: this.goodsId,
            goodsDescDTO: {
              id: otherField.detailHtmlId,
              detailHtml: otherField.detailHtml
            },
            extendAttribute: this.productDetailForm.selectType === 0 ? null : sendAttrData,
          }
          // console.log('77777777', sendAttrData)
          const res = await this.$http.factory.updataProductDetail(params)
          if (res.data && res.data.code === '0') {
            this.$message.success('保存成功！')
            this.getProductDetail()
          }
        }
      })
    },
    addAttachmentFile() {
      this.$refs.attachmentFileForm.validate(valid => {
        if (valid) {
          this.$refs.uploadAttachmentFile.submit()
          this.$refs.attachmentFileForm.resetFields()
          this.dialogAttachmentFile = false
          setTimeout(() => {
            this.uploadFileList = []
          }, 500)
        }
      })
    },
    remoteProductList(query) {
      if (query !== '') {
        this.dialogLaading = true
        setTimeout(() => {
          this.dialogLaading = false
          this.getSelectReleateProductList(query)
        }, 200)
      } else {
        this.selectReleateProductList = []
      }
    },
    async getSelectReleateProductList(query) {
      const res = await this.$http.factory.getSelectReleateProductList({ id: this.goodsId, name: query })
      if (res.data && res.data.code === '0') {
        const { pagedRecords } = res.data.data
        this.selectReleateProductList = pagedRecords
      }
    },
    async deleteAttachmentFile(row) {
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.factory.deleteAttachmentFile({ id: row.id })
        if (res.data && res.data.code === '0') {
          this.$message.success('删除成功！')
          this.getAttachmentFileList()
        }
      })
    },
    async picDeleate(file) {
      const res = await this.$http.factory.picDeleate({ goodsId: this.goodsId, id: file.id })
      if (res.data && res.data.code === '0') {
        this.$message.success('删除成功！')
        this.getAlbumList()
      }
      // this.$refs.pictureUpload.handleRemove(file)
    },
    async setMainPic(file) {
      const res = await this.$http.factory.setMainPic({ goodsId: this.goodsId, id: file.id })
      if (res.data && res.data.code === '0') {
        this.$message.success('主图设置成功')
        this.getAlbumList()
      }
    },
    handleExceed(file, fileList, count) {
      this.$message.warning(`当前限制上传 ${count} 个文件！`)
    },
    handleAttachmentFileSuccess(res, file, fileList) {
      const {code, message} = res
      if (code === '0') {
        // this.dialogAttachmentFile = false
        this.getAttachmentFileList()
      } else {
        this.$message.error(message)
      }
    },
    handleAlbumPicSuccess(res, file, fileList) {
      const {code, message} = res
      if (code === '0') {
        this.getAlbumList()
      } else {
        this.$message.error(message)
      }
    },
    fileterFileFunc(fileList) {
      return fileList.map(item => {
        return {
          name: item.fileName,
          url: `${this.downloadImgUrl}${item.fileKey}`,
          id: item.id
        }
      })
    },
    limitInputFunc(value, row) {
      row.basePrice = ('' + value).replace(/[^\d^.]+/g, '').replace(/^0+(\d)/, '$1').replace(/^\./, '0.').match(/^\d*(\.?\d{0,2})/g)[0] || ''
    },
  },
  created() {
    this.getProductDetail()
    this.getLabelCodeOptions()
  },
}
</script>

<style lang="stylus" scoped>
.add-attr-btn
  width 116px
  height 32px
  background #FFFFFF
  border-radius 4px
  border 1px solid #4D7FD5
  padding 7px 14px
  color #4D7FD5
  display flex
  align-items center
  font-size 12px
  margin-top 10px
  cursor pointer
.attr-box
  display flex
  align-items center
  margin-bottom 10px
  .attr-content
    width 364px
    padding 20px
    background #F8F9FA
    border-radius 4px
    display flex
    align-items center
  .attr-btn
    color #FF3E00
    font-size 12px
    margin-left 10px
.btn-box
  display flex
  margin-top 10px
  align-items center
  justify-content center
.p-section
  padding 30px 120px 40px 47px
.p-button
  margin 14px 0 20px
.u-img
  width 60px
  height 60px
  img
    width 100%
.p-upload
  position relative
  >>>.el-upload
    width 100%
    text-align left
  .p-upload-slot
    position absolute
    top 32px
    left 68px
.p-upload-item-img
  width 100%
  // height 100%
>>>.el-collapse-item__content
  padding-bottom 45px
  .el-upload-list__item
    overflow initial
    vertical-align middle
    &>div
      width 146px
      height 100%
      overflow hidden
.p-upload-item-actions-deleate
  position absolute
  width 100%
  height 100%
  left 0
  top 0
  cursor default
  text-align center
  opacity 0
  font-size 20px
  background-color rgba(0, 0, 0, .5)
  transition opacity .3s
  color #fff
  &:hover
    opacity 1
  &>span
    position absolute
    top 56px
    left 63px
.p-upload-item-actions-set
  position absolute
  width 100%
  bottom -34px
  cursor default
  text-align center
  .p-tip-btn
    width 50px
    height 20px
    background #EDF2FA
    border-radius 10px
    color #4D7FD5
    font-size 12px
    display inline-block
.clearfix
  zoom: 1
  &:after
    content ''
    display block
    height 0
    clear both
    visibility hidden
</style>
