<template>
  <el-header class="app-header" height="64px">
    <!-- <i class="el-icon-tickets app-side-handle"></i> -->

    <!-- <el-breadcrumb class="app-breadcrumb" separator="/">
      <el-breadcrumb-item
        v-for="item in breadcrumb"
        :key="item.name"
        :to="{ name: item.name }">{{item.text}}
      </el-breadcrumb-item>
    </el-breadcrumb> -->
    <div class="app-header-left">
      <div class="amount month-amount">
        <span class="title">本月申请总额</span>
        <span class="sub-amount">￥ {{monthRequested | formatCurrency}}</span>
      </div>
      <div class="amount day-amount">
        <span class="title">当日申请总额</span>
        <span class="sub-amount">￥ {{dayRequested | formatCurrency}}</span>
      </div>
    </div>
    <div class="app-header-right">
      <el-dropdown :hide-on-click="false" @command="handleCommand" trigger="click">
        <span class="el-dropdown-link">
          <img class="avatar" src="@/images/1.jpg" alt="">
          <span class="name">{{profile.name}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">
            <i class="el-icon-bell"></i>
            个人资料
          </el-dropdown-item>
          <el-dropdown-item command="2">
            <i class="el-icon-setting"></i>
            设置
          </el-dropdown-item>
          <el-dropdown-item divided command="logout">
            <i class="el-icon-delete"></i>
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { getMonthRequested, getDayRequested } from '@/api/user'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'OrderDetail',
  data() {
    return {
      // breadcrumb: this.$route.meta.breadcrumb || []
      monthRequested: '',
      dayRequested: ''
    }
  },
  computed: {
    ...mapState({
      profile: state => state.user.profile
    })
  },
  methods: {
    ...mapActions(['Logout']),
    handleCommand(command) {
      if (command === 'logout') {
        this.Logout().then(res => {
          // this.$router.push('/login')
          window.location.href = '/'
        })
      }
    },
    setmonth() {
      getMonthRequested().then(res => {
        this.monthRequested = res.data
      })
    },
    setday() {
      getDayRequested().then(res => {
        this.dayRequested = res.data
      })
    },
    initRequested() {
      this.setmonth()
      this.setday()
    }    
  },
  created() {
    this.initRequested()
  },
  watch: {
    $route(val) {
      this.initRequested()
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar{
  position: relative; top: -2px;
  width: 24px; height: 24px;
  vertical-align: middle;
  border-radius: 50%;
}
</style>

