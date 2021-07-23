<template>
  <div>
    <Menu/>
    <Content/>
  </div>
</template>

<script>  
  import Menu from '@/public/components/layout/Menu.vue';
  import Content from '@/public/components/layout/Content.vue';

  export default {
    components: {
      Menu,
      Content
    }
  }
</script>