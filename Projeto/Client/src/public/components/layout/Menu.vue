<template>
  <div id="menu">
    <a href="/"><img class="image" alt="Vue logo" src="/assets/logo/logo-horizontal-white.png"/></a>
    <ul class="links">
      <li><router-link to="/">Início</router-link></li>
      <li><router-link to="/mathcontent">Conteúdo</router-link></li>
      <li><router-link to="/tools">Ferramentas</router-link></li>
      <li><router-link to="/team">Equipe</router-link></li>
      <li><router-link to="/contact">Contato</router-link></li>
    </ul>
    <router-link to="/login" class="link-login">
      <i class="logout fas fa-user-circle" title="Entrar"></i>
    </router-link>
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

  .link-login {
    text-decoration: none;
    margin-left: auto;
  }

  .logout {
    cursor: pointer;
    color: white;
    font-size: 30px;
    transition: .2s;
    opacity: .8;
  }

  .router-link-exact-active .logout,
  .logout:hover {
    opacity: 1;
  }
</style>