<template>
  <el-button
    type="primary"
    @click="onClick"
    :disabled="disabled || sending || time > 0"
    class="el-button--sms"
    style="width: 112px">
    {{text}}
  </el-button>
</template>
<script>
import { sendSMS } from '@/api/user'

export default {
  name: 'SMSButton',
  props: {
    second: {
      type: Number,
      default: 60
    },
    disabled: {
      type: Boolean,
      default: false
    },
    phone: String
  },
  data () {
    return {
      time: 0,
      count: 0, // 次数
      sending: false
    }
  },
  computed: {
    text () {
      return this.sending ? '正在获取...' : this.time > 0 ? this.time + ' (s)' : this.count > 0 ? '重新获取' : '获取验证码'
    }
  },
  methods: {
    onClick (e) {
      if (!this.phone) {
        return this.$message.error('请填写手机号码')
      }
      if (!(/^1[34578]\d{9}$/.test(this.phone))) {
        return this.$message.error('手机号码格式不正确')
      }
      
      this.handleSend()
    },
    timer () {
      if (this.time > 0) {
        this.time--
        setTimeout(this.timer, 1000)
      }
    },
    handleSend() {
      this.sending = true
      sendSMS(this.phone)
        .then(res => {
          this.time = this.second
          this.sending = false
          this.count++
          this.timer()
          this.$emit('update:sms', res.data)
        }).catch(err => {
          this.sending = false
        })
    }
  }
}
</script>
