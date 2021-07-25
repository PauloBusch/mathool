<template>
  <router-view></router-view>
</template>

<script>      
  import 'primevue/resources/themes/saga-blue/theme.css';
  import 'primevue/resources/primevue.min.css';
  import 'primeicons/primeicons.css';
  import 'mosha-vue-toastify/dist/style.css';

  export default { };
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
    margin-bottom: 2.5rem;
    text-align: left;
  }

  .mosha__toast {
    top: calc(12px + var(--menu-height)) !important;
  }

  .card {    
    padding: 25px;
    box-sizing: border-box;
    box-shadow: 0 0 10px rgb(178 178 178);
  }

  form {
    width: 40vw;
    display: block;
    margin: 0 auto;
  }

  @media only screen and (max-width: 1000px) {
    form {
      width: 80%;
    }
  }
</style>
