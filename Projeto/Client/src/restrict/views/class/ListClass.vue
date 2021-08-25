<template>
  <div class="lista-classe">
    <table>
      <thead>
        <tr>
          <td>Codigo</td>
          <td>Nome</td>
          <td>Serie</td>
          <td>Classe</td>
          <td>Ano</td>
          <td v-if="!(Role.Teacher == User.role)"></td>
          <td colspan="2" v-if="(Role.Teacher == User.role)">Ações</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cla in classes" v-bind:key="cla.code">
          <td>{{cla.code}}</td>
          <td>{{cla.name}}</td>
          <td>{{cla.serie}}</td>
          <td>{{cla.class}}</td>
          <td>{{cla.year}}</td>
          <td v-if="(Role.Teacher == User.role)" class="invite"><router-link :to="'/mathool/class-form/' + cla._id"><i class="far fa-edit" title="editar"> Editar</i></router-link></td>
          <td v-if="(Role.Student == User.role)" class="invite">
            <i v-on:click="modalEditActive = true; classe = cla" class="cursor-pointer fa fa-sign-in-alt" title="se inscrever na sala">
              {{ registered(cla.code) ? ' Sair':' Inscrever-se' }}
            </i>
          </td>
          <td v-if="(Role.Teacher == User.role)" class="invite">
            <i v-on:click="modalArchiveActive = true; classe = cla" class="cursor-pointer fas fa-archive" v-bind:class="{ arquivado: !cla.active_class }" title="Arquivar Sala"> 
              {{ cla.active_class ?' Arquivar Sala' : ' Desarquivar Sala' }}
            </i>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="modalEditActive" class="modal">
        <span v-on:click="modalEditActive = false" class="dispose cursor-pointer">x</span>
        <h4 class="header">{{classe.code}}</h4>
        <p class="body">
          <span v-if="registered(classe.code)">
               Gostaria de sair da sala <strong>{{classe.name}}</strong>
          </span>
          <span v-if="!registered(classe.code)">
               Gostaria de se inscrever na sala <strong>{{classe.name}}</strong>, <br/>obs.: sua incrição nessa sala resultara na saida das demais
          </span>
        </p>
        <p class="body">
          <strong>{{classe.serie}}</strong> Serie, Turma <strong>{{classe.class}}</strong>
        </p>
        <div class="footer">
          <Button @click="modalEditActive = false; registered(classe.code) ? removeClass() : addClass(classe.code) " label="OK" />
          <Button class="p-button-secondary" @click="modalEditActive = false" label="CANCELAR" />
        </div>
    </div>

    <div v-if="modalArchiveActive" class="modal">
        <span v-on:click="modalArchiveActive = false" class="dispose cursor-pointer">x</span>
        <h4 class="header">{{classe.code}}</h4>
        <p class="body">
          Gostaria de {{ classe.active_class ? 'Arquivar a ': 'desarquivar a '}}sala: <strong>{{classe.name}}</strong>
        </p>
        <p class="body">
          <strong>{{classe.serie}}</strong> Serie, Turma <strong>{{classe.class}}</strong>
        </p>
        <div class="footer">
          <Button @click="modalArchiveActive = false; classe.active_class ? desactiveClass() : activeClass() " label="OK" />
          <Button class="p-button-secondary" @click="modalArchiveActive = false" label="CANCELAR" />
        </div>
    </div>
  </div>
</template>

<script>

  import Button from 'primevue/button';
  import { createToast } from 'mosha-vue-toastify';

  import { handleErrors } from '@/public/handlers/error-handler';

  import { getAllClassAsync, indexAsync } from '@/restrict/services/class-service';
  import { getAsync, updateAsync } from '@/restrict/services/student-service';
  import { Role } from '@/shared/consts/role';
  import { getUserStorage } from '@/shared/services/storage-service';

  export default {
    data(){
      const User = getUserStorage();
      return {
        classes:undefined,
        Role: Role ,
        User,
        modalEditActive: false,
        modalArchiveActive: false,
        classe: '',
        myClass: { _id: '', classCode: '' }

      }
    },
    mounted(){
      getAllClassAsync().then((res) =>{ 
        this.classes = res.data.data;
      });

      getAsync().then((res) => {
        this.myClass = res.data.data;
      });

    },
    methods: {
      
      registered(classe){
        if(this.myClass.classCode) return this.myClass.classCode.indexOf(classe) !== -1;
      },
      addClass(classe){
        this.myClass.classCode = classe;
        this.updateStudentClass();
      },
      removeClass(){   
        this.myClass.classCode = ' ';
        this.updateStudentClass();
      },
      updateStudentClass() {
        try {
            updateAsync(this.myClass).then(() => {
              createToast("Alterado", { type: 'success' })
            });
        }catch (error){
            handleErrors(error, 'Falha ao alterar Classe!'); 
        }
      },
      activeClass(){
        this.classe.active_class = true;
        try {
            indexAsync(this.classe).then(() => {
              createToast("Sala Desarquivada", { type: 'success' })
            });
        }catch (error){
            handleErrors(error, 'Falha ao Desarquivar Classe!'); 
        }
      },
      desactiveClass(){
        this.classe.active_class = false;
        try {
            indexAsync(this.classe).then(() => {
              createToast("Sala Arquivada", { type: 'success' })
            });
        }catch (error){
            handleErrors(error, 'Falha ao Arquivar Classe!'); 
        }
      }


    },
    components: { 
      Button
    }
  }
</script>

<style scoped>

.lista-classe table {
    display: block;
    flex-wrap: wrap;
    max-width: 100%;
    overflow: auto;
    width: 100%;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    border-collapse: collapse;
    border-spacing: 0;
  }
  .lista-classe table td, .lista-classe table th {
    border: 1px solid rgb(216, 216, 216);
    padding: 8px 13px;
    width: 180px;
    max-width: 100%;
  }
  .lista-classe thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
  }
  .lista-classe tr:nth-child(odd) {
    background-color:#ffffff;
  }
  .lista-classe	tr:nth-child(even) {
    background-color:rgb(235, 240, 250);
  }
  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }

  .lista-classe {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .lista-classe a {
    opacity: .8;
    transition: .2s;
    color: var(--blue-500);
  }

  .lista-classe a:hover {
    opacity: 1;
  }

  .invite, .invite a{ color: var(--blue-500) }
  .invite:hover, .invite a:hover{ color: var(--blue-200) }

  .arquivado {
    color: rgb(226, 90, 90) !important
  }
</style>