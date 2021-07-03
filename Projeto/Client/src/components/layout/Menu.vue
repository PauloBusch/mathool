<template>
  <div id="menu">
    <a href="/"><img class="image" alt="Vue logo" src="../../assets/logo-horizontal-white.png"/></a>
    <ul class="links">
      <li><router-link to="/">Início</router-link></li>
      <li><router-link to="/contact">Contato</router-link></li>
      <li><router-link to="/about">Sobre</router-link></li>
    </ul>
  </div>
</template>

<style scoped>
  #menu {
    top: 0;
    position: fixed;
    box-sizing: border-box;
    z-index: 1;
    width: 100%;
    height: var(--menu-height);
    padding: 10px var(--horizontal-space);
    box-shadow: 0 0 5px #828282;
    background-color: var(--blue-500);
    display: flex;
    align-items: center;
  }

  #menu>a {
    display: flex;
  }

  .links {
    margin: 0 0 0 25px;
    padding: 0;
    display: flex;
    list-style: none;
    justify-content: space-between;
  }

  .image {
    height: 40px;
  }

  .links a {
    opacity: .8;
    transition: .2s;
    padding: 15px;
    text-decoration: none;
    font-size: var(--font-size-h2);
    color: white;
  }

  .links a:hover {
    opacity: 1;
    text-decoration: none;
  }

  .links a.router-link-exact-active {
    opacity: 1;
  }
</style>