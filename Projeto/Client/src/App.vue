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

  #modal {
    display: flex;
    flex-wrap: wrap;
    min-width: 300px;
    width: 400px;
    min-height: 180px;
    background: rgb(255, 255, 255);
    position: fixed;
    margin: auto;
    border: 1px solid rgba(180, 180, 180, 0.548);
    border-radius: 4px;
    box-shadow: 5px 8px 20px rgba(0, 0, 0, 0.349);
  }
  #modal .header, #modal .body, #modal .footer {
    width: 100%;
    line-height: 1.2em;
    padding: 15px;
    margin: 0;
    min-height: 50px;
  }
  #modal .header{
    border-radius:4px 4px  0px 0px;
    border-bottom: 1px solid rgb(228, 228, 228);
    color: rgb(73, 75, 97);
    max-height: 50px;
    font-size: var(--font-size-h2);
  }
  #modal .footer{
    border-radius:0px 0px  4px 4px;
    border-top: 1px solid rgb(228, 228, 228);
    color: rgb(73, 75, 97);
    max-height: 100px;
    height: auto;
    align-self: flex-end;
  }
  #modal .dispose {
    position: absolute;
    top: 15px;
    right: 15px;
    color: rgb(142, 177, 221);
    font-size: 20px;
  }
  .cursor-pointer{ cursor: pointer;}
  #modal .dispose:hover {
    color:rgba(93, 136, 189, 0.555);
  }
  #modal Button {
    margin: 0 15px;
  }
  .cursor-pointer{ cursor: pointer;}
</style>
