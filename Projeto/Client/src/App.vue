<template>
  <div>
    <Menu/>
    <Content/>
  </div>
</template>

<script>  
  import Menu from '@/components/layout/Menu.vue';
  import Content from '@/components/layout/Content.vue';
    
  import 'primevue/resources/themes/saga-blue/theme.css';
  import 'primevue/resources/primevue.min.css';
  import 'primeicons/primeicons.css';
  import 'mosha-vue-toastify/dist/style.css';

  export default {
    components: {
      Menu,
      Content
    }
  }
</script>

<style>
  :root {
    --horizontal-space: 10%;
    --menu-height: 60px;

    --font-size-h1: 30px;
    --font-size-h2: 25px;
    --font-size-h3: 20px;
  }

  h1 { font-size: var(--font-size-h1); }

  body {
    padding: 0;
    margin: 0;
    font-family: Roboto, sans-serif;
  }

  #app {
    text-align: center;
  }

  h1 { font-size: var(--font-size-h1); }

  h2 { font-size: var(--font-size-h2); }

  h3 { font-size: var(--font-size-h3); }

  .p-field {
    margin-bottom: 1.5rem;
    text-align: left;
  }

  .mosha__toast {
    top: calc(12px + var(--menu-height)) !important;
  }
</style>
