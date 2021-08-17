<template>
  <div class="header">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <router-link to="/auth/login">login</router-link>
    <router-link to="/auth/signup">signup</router-link>
  </div>
</template>

<script>

export default {
  name: 'header',
  components: {
  }
}
</script>