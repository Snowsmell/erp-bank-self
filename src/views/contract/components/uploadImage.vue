<template>
  <div class="upload">
    <!-- <p>提示：只能上传PDF格式的文件</p> -->
    <el-upload
      action="string"
      :list-type="picture"
      :limit="limit"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :file-list="upfileList"
      :http-request="uploadImg">
      <!-- <i class="el-icon-plus"></i> -->
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">提示：只能上传PDF格式的文件</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <a :href="dialogImageUrl" target="_bank">点击查看PDF文件</a>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
import Store from '@/store'
import { saveUploadImg, deleteSealAttach } from '@/api/contract'
import img from '../../../images/pdf_icon.png'

export default {
  data() {
    return {
      dialogVisible: false,
      upfile: 'upfile',
      picture: 'picture',
      limit: 1,
      fileList: []
    }
  },
  computed: {
    ...mapState({
      upfileList: state => state.contract.backShowImg,
      imgId: state => state.contract.imgId,
      dialogImageUrl: state => state.contract.reviewPath
    })
  },
  methods: {
    ...mapMutations({
      setLoading: 'SET_LOADING',
      imageArr: 'SET_CONTRACT_IMG',
      setImgUrl: 'SET_CONTRACT_REVIEWPATH',
      proAttachsId: 'SET_CONTRACT_IMGID'
    }),
    handleRemove(file, fileList) {
      this.imageArr('')
      this.setImgUrl('')
      if (this.imgId) {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.setLoading(false)
          alert('xs')
          let res = deleteSealAttach(this.imgId)
          this.dialogImageUrl('')
        }).catch(() => {
          this.$router.push('/refresh')
        })
      }
    },
    handlePictureCardPreview(file) {
      this.dialogVisible = true
    },
    handleChange(file, fileList) {
      this.$nextTick(() => {
        let oImg = document.getElementsByClassName('el-upload-list__item-thumbnail')[0]
        oImg.setAttribute('src', img)
      })
    },
    uploadImg(item) {
      this.setLoading(true)
      let formData = new FormData()
      formData.append('upfile', item.file)
      // saveUploadImg(formData).then(res => {
      //   if (res.code === 0) {
      //     this.setLoading(false)
      //     this.setImgUrl(res.data.review_path)
      //     this.imageArr(res.data.abstract_path)
      //   }
      // }).catch(err => {
      //   console.log('报错', err)
      // })
    }
  }
}
</script>
