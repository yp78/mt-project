<script setup lang="ts">
import request from '@/utils/request'
request('/login/password', 'post', { mobile: '13211112222', password: 'abc123456' })
  .then((res) => {
    console.log(res, 'login')
  })
  .catch((res) => {
    console.log(res)
  })
</script>

<template>
  <div class="login-page">login</div>
</template>

<style lang="scss" scoped></style>
