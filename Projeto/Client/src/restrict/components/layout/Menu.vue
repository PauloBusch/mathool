<template>
    <div class="container">
        <div id="menu">
            <i @click="visibleLeft = true" class="fas fa-bars buttonVisible cursor-pointer"></i>
            <img class="image" alt="Vue logo" src="/assets/logo/logo-horizontal-white.png"/>
            <div class="link-login">
                <i @click="logout()" class="logout fas fa-sign-out-alt" title="Sair"></i>    
            </div>
        </div>
        <Sidebar v-model:visible="visibleLeft">
            <ul class="links">
                <li><router-link to="/mathool/restrict">Início</router-link></li>
                <li><router-link to="/mathool/list-class">Lista de Classes</router-link></li>
                <li><router-link to="/mathool/class-report">Relatorio de classe</router-link></li>
                <li v-if="(teacher == user.role)"><router-link to="/mathool/class-form">Cadastrar Classes</router-link></li>
            </ul>
        </Sidebar>
    </div>
</template>

<script>
import Sidebar from 'primevue/sidebar';

import { Role } from '@/shared/consts/role';
import { getUserStorage, removeUserStorage, removeTokenStorage } from '@/shared/services/storage-service';
export default {
    data(){
        const user = getUserStorage();
        return {
            visibleLeft: false,
            visibleRight: false,
            visibleTop: false,
            visibleBottom: false,
            visibleFull: false,
            student: Role.Student, 
            teacher: Role.Teacher,
            user
        }
    },
    methods: {
        logout(){
            removeUserStorage();
            removeTokenStorage();
            this.$router.push('/');
        }
    },
    components: {
      Sidebar
    }
}
</script>

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
    margin-bottom: 25px;
  }
  #menu>a {
    display: flex;
  }
  #menu .buttonVisible {
      color: white;
      font-size: 35px;
      margin: 0px 20px;

  }
  .image {
    height: 40px;
  }
  .links {
    margin: 0 0 0 0px;
    padding: 0;
    display: block;
    list-style: none;
  }
  .links a {
    display: block;  
    opacity: .8;
    transition: .2s;
    padding: 15px;
    text-decoration: none;
    font-size: var(--font-size-h2);
    color:var(--blue-500);
  }
  .p-sidebar { padding: 0 !important;  }
  .links a:hover {
    opacity: 1;
    text-decoration: none;
    background-color: var(--blue-500);
    color: white;
    padding-left: 20px;
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