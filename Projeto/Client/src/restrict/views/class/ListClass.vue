<template>
  <div class="lista-classe">
    <table>
      <thead>
        <tr>
          <td>codigo</td>
          <td>nome</td>
          <td>serie</td>
          <td>classe</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="classe in classes" v-bind:key="classe.code">
          <td>{{classe.code}}</td>
          <td>{{classe.name}}</td>
          <td>{{classe.serie}}</td>
          <td>{{classe.class}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

  import { getAllAsync } from '@/restrict/services/class-service';
  export default {
    data(){
      return {
        classes:undefined
      }
    },
    mounted(){
      getAllAsync().then((res) =>{ 
        this.classes = res.data.data;
        });
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


</style>