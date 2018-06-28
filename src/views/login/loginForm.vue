<template>
  <el-form :model="signForm" :rules="loginRule" ref="signForm" class="sign-form">
    <el-form-item prop="username">
      <el-input
        placeholder="手机号"
        prefix-icon="el-icon-mobile-phone"
        maxlength=11
        v-model="signForm.username"
        auto-complete="off">
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="signForm.password"
        placeholder="短信验证码"
        prefix-icon="el-icon-message"
        auto-complete="off"
        maxlength=4
        class="hw-input--counter"
        @keyup.enter.native="onSubmit('signForm')">
        <template slot="append">
          <button-sms :second="60" :phone="signForm.username" :sms.sync="signForm.sms"></button-sms>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        class="el-button--full"
        @click="onSubmit('signForm')"
        :loading="loading">
        {{loading ? '登录中...' : '立即登录'}}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import ButtonSms from '@/components/SMSButton'
import { mapActions } from 'vuex'
import { getToken } from '@/utils/auth'

export default {
  name: 'LoginForm',
  components: {
    ButtonSms
  },
  data () {
    return {
      loading: false,
      signForm: {
        username: '',
        password: '',
        sms: {}
      },
      loginRule: {
        username: [
          { required: true, message: '请填写手机号码', trigger: 'blur' },
          { validator (rule, val, cb) { return !(/^1[3|4|5|7|8]\d{9}$/.test(val)) ? cb(new Error('手机号码格式不正确')) : cb() }, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写手机验证码', trigger: 'blur' },
          { validator (rule, val, cb) { return !(/^[a-z0-9]{4,6}$/i.test(val)) ? cb(new Error('手机验证码格式不正确')) : cb() }, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (getToken()) {
      this.redirect()
    }
  },
  methods: {
    ...mapActions({
      login: 'LoginBySMS'
    }),
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        }
        this.handleLogin()
      })
    },
    handleLogin () {
      this.loading = true
      const { username, password, sms } = this.signForm
      this.login({
        username,
        password,
        sms: sms.serial_number
      }).then(res => {
        this.loading = false
        this.redirect()
      }).catch(() => {
        this.loading = false
      })
    },
    redirect(url) {
      if (!url) {
        url = decodeURIComponent(this.$route.query.redirect || '/')
      }
      this.$router.push(url)
    }
  }
}
</script>
