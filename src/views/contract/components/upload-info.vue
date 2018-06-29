<template>
  <el-dialog
    title="立项资料选择上传"
    :visible.sync="dialogVisible"
    width="30%"
    @open="openDialog"
    :before-close="handleClose">
    <el-row>
      <span>标签：</span>
      <select-type :options="options" v-on:select="setSelect"></select-type>
      <label for="file" class="selectFile" >选择上传文件</label>
      <input type="file" name="file" id="file" value="" accept="image/*, video/*" :disabled="disabled" class="upFile" @change="handleFiles($event)"/>
    </el-row>
  </el-dialog>
</template>

<script>
import SelectType from './select'
import { saveUploadImg } from '@/api/contract'
import { mapState, mapMutations } from 'vuex'

import axios from 'axios'
import { apiURL } from '@/api/config'
const SERVER = apiURL('erp-contract-service')

export default {
  name: 'UploadInfo',
  components: {
    SelectType
  },
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState({
      dialogVisible: state => state.contract.dialogVisible,
      getTip: state => state.contract.setTip,
      contractType: state => state.contract.contractType
    })
  },
  data() {
    return {
      getSelect: '',
      disabled: true
    }
  },
  methods: {
    ...mapMutations({
      setVisible: 'SET_CONTRACT_DIALOG_VISIBLE',
      pictureList: 'SET_CONTRACT_PICTURE',
      pdfList: 'SET_CONTRACT_PDF',
      mediaList: 'SET_CONTRACT_MEDIA',
      loading: 'SET_CONTRACT_LOADING',
      dialogConfirm: 'SET_CONTRACT_CONFIRM',
      showNull: 'SET_CONTRACT_CONFIRM_INFO_SHOW'
    }),
    setSelect(val) {
      console.log(val)
      this.getSelect = val
      if (val === '') {
        this.disabled = true
        return 
      }
      this.disabled = false
    },
    handleClose(item) {
      this.setVisible(false)
    },
    handleFiles(e) {
      if (this.getSelect === '') {
        this.$message({
          message: '请选择相应的标签，再进行上传',
          type: 'warning'
        })
      }
      let file = e.target.files[0]
      let formData = new FormData()

      if (e.target.files.length === 0) { return }
      if (!(file.type.indexOf('png') > 0 || file.type.indexOf('jpg') > 0 || file.type.indexOf('jpeg') > 0 || file.type.indexOf('mp4') > 0 || file.type.indexOf('pdf') > 0)) {
        this.$message({
          message: '文件上传格式',
          type: 'error'
        })
        return
      }

      if (file.size > 52128800) {
        this.$message({
          message: '上传文件的大小不能超过50M',
          type: 'error'
        })
        return
      }

      this.setVisible(false)
      this.loading(true)
      axios({
        method: 'post',
        url: `${SERVER}/uploadFile?originalFilename=` + file.name
      }).then(response => {
        let res = response.data
        this.loading(false)
        if (res.code === 0) {
          for (let key in res.data) {
            formData.append(key, res.data[key])
          }
          formData.append('file', file)
          this.uploadImg(formData, res.data.domain, res.data.url, res.data.key, file.type)
        }
      })
    },
    async uploadImg(formData, setUrl, review_path, abstract_path, file_type) {
      this.loading(true)
      let data = {
        'name': this.contractType[this.getTip],
        'review_path': review_path,
        'abstract_path': abstract_path
      }
      await axios.post(setUrl, formData).then(res => {
        if (res.status === 204) {
          if (file_type.indexOf('pdf') > -1) { 
            this.pdfList(data)
          }
          if (file_type.indexOf('video') > -1) { 
            this.mediaList(data)
          }
          if (file_type.indexOf('jpg') > -1 || file_type.indexOf('png') > -1 || file_type.indexOf('jpeg') > -1) {
            this.pictureList(data)
          }
        }
        this.loading(false)
      })
    },
    openDialog() {
      this.showNull(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.upFile {
  position: absolute;
  opacity: 0;
}
.selectFile {
  display: inline-block;
  padding: 8px 20px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #409EFF;
  border-color: #409EFF;
  cursor: pointer;
}
</style>
