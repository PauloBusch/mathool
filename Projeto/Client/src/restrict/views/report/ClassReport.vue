<template>
    <div id="container">
      <img class="image" alt="Vue logo" src="/assets/logo/logo-horizontal.png"/>
      <h2>Relatorio de Desempenho</h2>
      <h4><strong>Aluno:</strong> {{User.name}}</h4>
      <Button data-html2canvas-ignore="true" @click="gerarPDF()" type="button" label="Download em PDF" ></Button>
    
        <span>
          <label for="select-student">Classe: </label>
          <Dropdown inputId="select-class" v-model="selectedClasses" :options="classes" optionLabel="name" placeholder="Select" />
        </span>
      <table>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Codigo de Classe</td>
            <td>Certas</td>
            <td>% Certas</td>
            <td>Erradas</td>
            <td>% Erradas</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rep in reports" v-bind:key="rep.id">
            <td>{{rep.name}}</td>
            <td>{{rep.classCode}}</td>
            <td>{{rep.rightAnswer}}</td>
            <td>{{rep.rightAnswerPercent}}</td>
            <td>{{rep.wrongAnswer}}</td>
            <td>{{rep.wrongAnswerPercent}}</td>
            <td>{{rep.totalAnswer}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>

import { createReport } from '@/shared/services/jspdf-service';

  import Button from 'primevue/button';
  import Dropdown from 'primevue/dropdown'

  // import { getReportAnswerByMyUserAsync  } from '@/restrict/services/student-report-service';
  import { Role } from '@/shared/consts/role';
  import { getUserStorage } from '@/shared/services/storage-service';
  import { getAllClassAsync } from '@/restrict/services/class-service';
  import { getReportAnswerByClassIdAsync } from '@/restrict/services/class-report-service';
  import { handleErrors } from '@/public/handlers/error-handler';

export default {
    data(){
      const User = getUserStorage();
      const selectedClasses = null;
      const classes = [];
      return {
        reports:undefined,
        Role: Role ,
        User: User,
        selectedClasses,
        classes
      }
    },

    mounted(){

      getAllClassAsync().then((res) =>{ 
        let array = res.data.data;
        array.forEach(element => {
          this.classes.push({ name: element.code, code: element.code});
        });
      });
      
    },

    watch: {
      selectedClasses : function(){
        try {
            getReportAnswerByClassIdAsync(this.selectedClasses.code).then((res)=>{
                this.reports = res.data;
            });
            
        } catch (error) {
            handleErrors(error, 'Falha ao carregar relatorio de aluno!'); 
        }
      },
      
    },

    methods: {
      
      gerarPDF(){

        createReport(document.querySelector('#container'), 'student-report');
      }
    },
    components: { 
      Button,
      Dropdown
    }
}
</script>

<style scoped>
  .select-student{
    margin-top: 20px;
  }
  .select-student span, .select-student span label{
    margin: 15px;
  }
  table {
    display: block;
    flex-wrap: wrap;
    max-width: 100%;
    overflow: none;
    width: 100%;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    border-collapse: collapse;
    border-spacing: 0;
    margin-top: 15px;
  }
  table td, .lista-classe table th {
    border: 1px solid rgb(216, 216, 216);
    padding: 8px 13px;
    width: 180px;
    max-width: 100%;
  }
  thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
    font-weight: bolder;
  }
  tr:nth-child(odd) {
    background-color:#ffffff;
  }
  tr:nth-child(even) {
    background-color:rgb(235, 240, 250);
  }
  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }

  #container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 780px;
    margin: auto;
    }

</style>