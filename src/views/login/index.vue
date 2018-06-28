<template>
  <div class="sign-container">
    <div class="sign-head">
      <img class="logo" src="@/images/logo1.png" width="48" alt="">
      <span class="title">华瑞钰翔银企直联</span>
    </div>
    <LoginForm/>
  </div>
</template>

<script>
import LoginForm from './loginForm'

export default {
  name: 'Login',
  components: {
    LoginForm
  }
}
</script>
