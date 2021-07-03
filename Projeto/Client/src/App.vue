<template>
  <div>
    <app-menu></app-menu>
    <app-content></app-content>
  </div>
</template>

<script>
  import Menu from '@/components/layout/Menu.vue';
  import Content from '@/components/layout/Content.vue';

  export default {
    components: {
      'app-menu': Menu,
      'app-content': Content
    }
  }
</script>

<style>
  :root {
    --primary: #42b983;
    --secondary: #2c3e50;

    --horizontal-space: 10%;
    --menu-height: 60px;

    --font-size-h1: 30px;
    --font-size-h2: 25px;
    --font-size-h3: 20px;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
  }

  #app {
    text-align: center;
    color: var(--secondary);
  }
</style>
