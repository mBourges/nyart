<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'app'
  };
</script>

<style>
  html {
    overflow: hidden;
  }

  .content-full {
    max-height: 100vh;
  }

  .scrollable {
    height: 100%;
    overflow: auto;
    backface-visibility: hidden;
  }
</style>