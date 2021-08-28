<template>
    <div id="container">
      <img class="image" alt="Vue logo" src="/assets/logo/logo-horizontal.png"/>
      <h2>Relatorio de Exercicios</h2>
      <Button data-html2canvas-ignore="true" @click="gerarPDF()" type="button" label="Download em PDF" ></Button>
      <div class="p-field p-col-12 p-md-3 select-student">
          <span>
            <label for="select-student">Classe: </label>
            <Dropdown inputId="select-class" v-model="selectedClasses" :options="classes" optionLabel="name" placeholder="Select" />
          </span>
          <span>
          <label for="select-student">Estudante: </label>
          <Dropdown inputId="select-student" v-model="selectedStudent" :options="students" optionLabel="name" placeholder="Select" />
          </span>
      </div>
      <table>
        <thead>
          <tr>
            <td>Data</td>
            <td>Pergunta</td>
            <td>Status</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rep in reports" v-bind:key="rep.id" :class="rep.answers[0].rightAnswer ? 'correto' : 'incorreto'">
            <td>{{ calcTime(rep.createdAt, rep.answers[0].createdAt) }}</td>
            <td>{{rep.expression}}</td>
            <td>{{(rep.answers[0].rightAnswer) ? "Certo" : "Errado" }}</td>
            
            <td><strong><a class="cursor-pointer" @click="display = true;
                modalValues.id = rep.id;
                modalValues.name = rep.users.name;
                modalValues.classCode = rep.users.classCode;
                modalValues.data = new Date(rep.createdAt);
                modalValues.level = rep.level;
                modalValues.rightAnswer = rep.answers[0].rightAnswer;
                modalValues.question = rep.expression;
                modalValues.answer = rep.expectedResult;
                modalValues.yourAnswer = rep.answers[0].response;
                modalValues.time = calcTime(rep.createdAt, rep.answers[0].createdAt)
              ">ver detalhes</a></strong>
            </td>
            
          </tr>
        </tbody>
      </table>
      <Dialog class="modal-q " v-model:visible="display">
        <template #header>
          <h2 class="center">{{ modalValues.id }}º Pergunta | Nível {{modalValues.level}}</h2>
        </template>
        <table>         
            <tbody>
              <tr>
                <td class="t-header">Aluno:</td>
                <td> {{modalValues.name}}</td>
              </tr>
              <tr>
                <td class="t-header">Tempo para responder:</td>
                <td> {{modalValues.time}}</td>
              </tr>
              <tr>
                <td class="t-header">Classe: </td>
                <td> {{modalValues.classCode}}</td>
              </tr>
            </tbody>
          </table>
          <h3>Questão: </h3>
          <p class="center">Considere a seguinte expressão matemática:</p>
          <p class="center response"><strong>{{modalValues.question}}</strong></p>
          
          <h3>Resposta: </h3>
          <label>Sua Resposta</label>
          <Message v-if="modalValues.rightAnswer" severity="success" :closable="false">" <strong>{{modalValues.yourAnswer}} </strong> "</Message>
          <Message v-if="!modalValues.rightAnswer" severity="error" :closable="false">" <strong>{{modalValues.yourAnswer}} </strong> "</Message>
          <br/>
          <label>Resposta Correta</label>
          <Message severity="success" :closable="false">" <strong>{{modalValues.answer}}</strong> "</Message>

            
        <template #footer>
          <Button @click="display = false" label="Fechar" icon="pi pi-check" autofocus />
        </template>
      </Dialog>
    </div>
</template>

<script>

  import { createReport } from '@/shared/services/jspdf-service';

  import Button from 'primevue/button';
  import Dropdown from 'primevue/dropdown'
  import Dialog from 'primevue/dialog';
  import Message from 'primevue/message';

  import { getReportQuestionsByUserIdAsync } from '@/restrict/services/question-report-service';
  import { Role } from '@/shared/consts/role';
  import { getUserStorage } from '@/shared/services/storage-service';
  import { getAllClassAsync } from '@/restrict/services/class-service';
  import { getAllStudentByClassCodeAsync } from '@/restrict/services/student-service';
  import { handleErrors } from '@/public/handlers/error-handler';
  import { calcTime } from '@/shared/services/calc-time'


export default {
    data(){
      const User = getUserStorage();
      const selectedClasses = null;
      const selectedStudent = null;
      const classes = [];
      const students = [];
      const modalValues = {
        name: '',
        classCode: '',
        data: '',
        time: '',
        level: '',
        rightAnswer: true,
        question: '',
        answer: '',
        yourAnswer: '',
      }
      return {
        reports:undefined,
        Role: Role ,
        User: User,
        selectedClasses,
        selectedStudent,
        classes,
        students,
        calcTime,
        modalValues,
        display: false

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
            getAllStudentByClassCodeAsync(this.selectedClasses.code).then((res)=>{
              let array = res.data.data;
              this.students.splice(0, this.students.length);
              array.forEach(element => {
                this.students.push({ name: element.name, code: element.id});
              });
          });
        } catch (error) {
            handleErrors(error, 'Falha ao carregar relatorio de aluno!'); 
        }
      },
      selectedStudent : function(){
        try {
            getReportQuestionsByUserIdAsync(this.selectedStudent.code).then((res) => {
              this.reports = res.data.data;
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
      Dropdown,
      Dialog,
      Message
    }
}
</script>

<style scoped>
  .modal-q .center{
    margin: 0 auto;
  }
  .modal-q .center { text-align:  center;}
  .select-student{
    margin-top: 20px;
  }
  .select-student span, .select-student span label{
    margin: 15px;
  }
  .modal-q .response {
    font-size: 28px;
  }
  .cursor-pointer {
    color: #1662a0 !important;
  }
  .t-header {
    font-weight: bolder;
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
    color: rgb(43, 43, 43);
  }
  table td, .lista-classe table th {
    border: 1px solid rgb(35, 110, 54);
    padding: 8px 13px;
    width: 180px;
    max-width: 100%;
  }
  thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
    font-weight: bolder;
    background-color: rgb(14, 78, 30);
    color: white;
  }
  .modal-q  tr:nth-child(odd) {
    background-color:#ffffff;
  }
  .modal-q tr:nth-child(even) {
    background-color:rgb(223, 226, 235);
  }
  .modal-q table td, .modal-q .lista-classe table th {
    border: 1.5px solid rgba(167, 175, 170, 0.384);
  }
  .correto{
    background-color:rgb(108, 218, 122);;
  }
  .incorreto{
    background-color:rgb(223, 101, 101);
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