<template>
  <el-dialog title="确权人信息" :visible.sync="dialogFormVisible" :before-close="beforeClose" @open="openDialog" class="ledgerDialog" center>
    <el-form :model="form">
        <el-form-item label="标签:" :label-width="formLabelWidth">
          <span>确权人信息</span>
        </el-form-item>
        <p>确权人基本信息</p>
        <el-form-item label="姓名:" :label-width="formLabelWidth">
          <el-input v-model="form.confirm_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话:" :label-width="formLabelWidth">
          <el-input v-model="form.confirm_phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:" :label-width="formLabelWidth">
          <el-input v-model="form.confirm_id_no" auto-complete="off"></el-input>
        </el-form-item>
        <p>图片资料上传</p>
        <el-row>
          <el-col :span="12">
            <span class="title">确权人头像信息</span><label for="file0" class="uploadInfo">点击上传</label>
              <input type="file" name="file" id="file0" value="" accept="image/*, video/*" class="upFile" @change="handleFiles($event)"/>
            <div class="imgWrap">
              <img :src="headImg" alt="">
            </div>
          </el-col>
          <el-col :span="12">
            <span class="title">确权人手持身份证半身照片</span><label for="file1" class="uploadInfo">点击上传</label>
              <input type="file" name="file" id="file1" value="" accept="image/*, video/*" class="upFile" @change="handleCard($event)"/>
            <div class="imgWrap">
              <img :src="cardImg" alt="">
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="title">确权人身份证正面照片</span><label for="file2" class="uploadInfo">点击上传</label>
              <input type="file" name="file" id="file2" value="" accept="image/*, video/*" class="upFile" @change="cardFront($event)"/>
            <div class="imgWrap">
              <img :src="frontImg" alt="">
            </div>
          </el-col>
          <el-col :span="12">
            <span class="title">确权人身份证反面照片</span><label for="file3" class="uploadInfo">点击上传</label>
              <input type="file" name="file" id="file3" value="" accept="image/*, video/*" class="upFile" @change="cardReverse($event)"/>
            <div class="imgWrap">
              <img :src="reverseImg" alt="">
            </div>
          </el-col>
        </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import axios from 'axios'
import HOST from '@/api/host'
const SERVER = `${HOST}/erp-contract-service/api/v1`

export default {
  computed: {
    ...mapState({
      dialogFormVisible: state => state.contract.dialogConfirm,
      showNull: state => state.contract.showNull,
      confirmInfos: state => state.contract.confirmInfos,
      conIndex: state => state.contract.confirmInfoIndex,
      gettip: state => state.contract.setTip,
      ascription: state => state.contract.ascription
    }),
    ...mapGetters({
      getConfirmInfo: 'getConfirmInfo'
    })
  },
  watch: {
    headImg: function(val) {
      this.headImg = val
    }
  },
  data() {
    return {
      formLabelWidth: '80px',
      form: {
        confirm_name: '',
        confirm_phone: '',
        confirm_id_no: ''
      },
      headImg: '',
      cardImg: '',
      frontImg: '',
      reverseImg: '',
      // id
      headId: '',
      cardId: '',
      frontId: '',
      reverseId: '',
      // 相对路径
      AheadImg: '',
      AcardImg: '',
      AfrontImg: '',
      AreverseImg: '',
      confirms: [],
      flag: '',
      name: ''
    }
  },
  methods: {
    ...mapMutations({
      dialogConfirm: 'SET_CONTRACT_CONFIRM',
      confirmIndex: 'SET_CONTRACT_CONFIRM_INFO_INDEX',
      confirmInfo: 'SET_CONTRACT_CONFIRM_INFO',
      setTip: 'SET_CONTRACT_TIP'
    }),
    handleFiles(e) {
      let file = e.target.files[0]
      this.flag = 'headImg'
      this.upload(file)
    },
    handleCard(e) {
      let file = e.target.files[0]
      this.flag = 'cardImg'
      this.upload(file)
    },
    cardFront(e) {
      let file = e.target.files[0]
      this.flag = 'frontImg'
      this.upload(file)
    },
    cardReverse(e) {
      let file = e.target.files[0]
      this.flag = 'reverseImg'
      this.upload(file)
    },
    upload(file) {
      let formData = new FormData()
      axios({
        method: 'post',
        url: `${SERVER}/uploadFile?originalFilename=` + file.name
      }).then(response => {
        let res = response.data
        if (res.code === 0) {
          for (let key in res.data) {
            formData.append(key, res.data[key])
          }
          formData.append('file', file)
          this.uploadImg(formData, res.data.domain, res.data.url, res.data.key, file.type)
        }
      })
    },
    uploadImg(formData, setUrl, review_path, abstract_path, file_type) {
      axios.post(setUrl, formData).then(res => {
        if (res.status === 204) {
          if (this.flag === 'headImg') {
            this.headImg = review_path
            this.AheadImg = abstract_path
          } else if (this.flag === 'cardImg') {
            this.cardImg = review_path
            this.AcardImg = abstract_path
          } else if (this.flag === 'frontImg') {
            this.frontImg = review_path
            this.AfrontImg = abstract_path
          } else if (this.flag === 'reverseImg') {
            this.reverseImg = review_path
            this.AreverseImg = abstract_path
          } 
        }
      })
    },
    beforeClose(item) {
      this.form.confirm_name = ''
      this.form.confirm_phone = ''
      this.form.confirm_id_no = ''
      this.headImg = ''
      this.cardImg = ''
      this.frontImg = ''
      this.reverseImg = ''
      this.AheadImg = ''
      this.AcardImg = ''
      this.AfrontImg = ''
      this.AreverseImg = ''
      this.confirmIndex('')
      this.dialogConfirm(false)
    },
    dialogFormSubmit() {
      if (this.form.confirm_name === '') {
        this.$message({
          message: '确权人姓名不能为空',
          type: 'warning'
        })
        return
      }

      if (this.form.confirm_phone === '') {
        this.$message({
          message: '确权人联系方式不能为空',
          type: 'warning'
        })
        return
      }

      if (this.form.confirm_id_no === '') {
        this.$message({
          message: '确权人身份证号不能为空',
          type: 'warning'
        })
        return
      }

      if (this.headImg === '') {
        this.$message({
          message: '请上传确权人头像信息',
          type: 'warning'
        })
        return
      }

      if (this.cardImg === '') {
        this.$message({
          message: '请上传确权人手持身份证半身照片',
          type: 'warning'
        })
        return
      }

      if (this.frontImg === '') {
        this.$message({
          message: '请上传确权人身份证正面照片',
          type: 'warning'
        })
        return
      }

      if (this.reverseImg === '') {
        this.$message({
          message: '请上传确权人身份证反面照片',
          type: 'warning'
        })
        return
      }
     
      let data = {
        'confirm_name': this.form.confirm_name,
        'confirm_phone': this.form.confirm_phone,
        'confirm_id_no': this.form.confirm_id_no,
        'confirm_hand_id_no_image': this.cardImg,
        'attachs': [
          {
            'id': this.headId,
            'file_type': this.gettip,
            'file_path': this.headImg,
            'review_path': this.AheadImg,
            'confirm_name': this.form.confirm_name,
            'confirm_phone': this.form.confirm_phone,
            'confirm_id_no': this.form.confirm_id_no,
            'file_type_name': '头像',
            'file_code': '0'
          },
          {
            'id': this.cardId,
            'file_type': this.gettip,
            'file_path': this.cardImg,
            'review_path': this.AcardImg,
            'confirm_name': this.form.confirm_name,
            'confirm_phone': this.form.confirm_phone,
            'confirm_id_no': this.form.confirm_id_no,
            'file_type_name': '手持身份证半身照片',
            'file_code': '1'
          },
          {
            'id': this.frontId,
            'file_type': this.gettip,
            'file_path': this.frontImg,
            'review_path': this.AfrontImg,
            'confirm_name': this.form.confirm_name,
            'confirm_phone': this.form.confirm_phone,
            'confirm_id_no': this.form.confirm_id_no,
            'file_type_name': '身份证正面照片',
            'file_code': '2'
          },
          {
            'id': this.reverseId,
            'file_type': this.gettip,
            'file_path': this.reverseImg,
            'review_path': this.AreverseImg,
            'confirm_name': this.form.confirm_name,
            'confirm_phone': this.form.confirm_phone,
            'confirm_id_no': this.form.confirm_id_no,
            'file_type_name': '身份证反面照片',
            'file_code': '3'
          }
        ]
      }

      if (this.conIndex !== '') {
        const confirms = JSON.parse(JSON.stringify(this.confirmInfos))
        confirms.splice(this.conIndex, 1, data)
        this.confirmInfo(confirms)
      } else {
        this.confirmInfo(data)
      }

      this.dialogConfirm(false)

      this.form.confirm_name = ''
      this.form.confirm_phone = ''
      this.form.confirm_id_no = ''
      this.headImg = ''
      this.cardImg = ''
      this.frontImg = ''
      this.reverseImg = ''
    },
    openDialog() {
      if (this.ascription === '1') {
        this.setTip('1000012')
      } else {
        this.setTip('2000012')
      }
      if (this.showNull) {
        if (this.getConfirmInfo.confirm_phone !== undefined) {
          let arr = this.getConfirmInfo.attachs
          
          this.form.confirm_name = this.getConfirmInfo.confirm_name
          this.form.confirm_phone = this.getConfirmInfo.confirm_phone
          this.form.confirm_id_no = this.getConfirmInfo.confirm_id_no

          for (let i = 0; i < arr.length; i++) {
            if (arr[i].file_code === '0') {
              this.headImg = arr[i].file_path
              this.headId = arr[i].id
              let a = arr[i].file_path.split('?')[0]
              let num = a.indexOf('erp-attach')
              this.AheadImg = a.slice(num)
            } else if (arr[i].file_code === '1') {
              this.cardImg = arr[i].file_path
              this.cardId = arr[i].id
              let a = arr[i].file_path.split('?')[0]
              let num = a.indexOf('erp-attach')
              this.AcardImg = a.slice(num)
            } else if (arr[i].file_code === '2') {
              this.frontImg = arr[i].file_path
              this.frontId = arr[i].id
              let a = arr[i].file_path.split('?')[0]
              let num = a.indexOf('erp-attach')
              this.AfrontImg = a.slice(num)
            } else if (arr[i].file_code === '3') {
              this.reverseImg = arr[i].file_path
              this.reverseId = arr[i].id
              let a = arr[i].file_path.split('?')[0]
              let num = a.indexOf('erp-attach')
              this.AreverseImg = a.slice(num)
            }
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.uploadInfo {
  display: inline-block;
  padding: 2px 10px;
  background-color: #409EFF;
  margin-left: 20px;
  border: 1px solid #409EFF;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
.upFile {
  position: absolute;
  top: 0;
  opacity: 0;
  z-index: -1;
}
</style>
