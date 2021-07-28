<template>
  <div>
    <Menu />
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>  
  import Menu from '@/restrict/components/layout/Menu.vue';

  export default {
    components: {
      Menu
    }
  }
</script>

<style scoped>
  .main {
    margin-top: calc(var(--menu-height) + 25px);
  }
</style>