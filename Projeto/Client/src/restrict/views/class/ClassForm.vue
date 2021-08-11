<template>
    <form class="centred p-fluid" @submit.prevent="save">
        <h2>{{isNew ? 'Cadastrar ': 'Alterar '}}Classe</h2>
        <div class="p-field">
            <div class="p-float-label">
                <InputText id="name" name="name" type="text" v-model="values.name"
                    :class="{ 'p-invalid': submitted && errors.name }"/>
                <label for="name">Nome</label>
            </div>
            <small class="p-error" v-if="submitted && !!errors.name">{{ errors.name }}</small>
        </div>
        <div class="p-field">
            <div class="p-float-label">
                <InputText id="serie" name="serie" type="number" v-model="values.serie" 
                    :class="{ 'p-invalid': submitted && errors.serie }"/>
                <label for="serie">Serie</label>
            </div>
            <small class="p-error" v-if="submitted && !!errors.serie">{{ errors.serie }}</small>
        </div>
        <div class="p-field">
            <div class="p-float-label">
                <InputText id="serie" name="serie" type="text" v-model="values.class" 
                    :class="{ 'p-invalid': submitted && errors.class }"/>
                <label for="serie">Classe</label>
            </div>
            <small class="p-error" v-if="submitted && !!errors.class">{{ errors.class }}</small>
        </div>
        <div class="p-field">
            <div class="p-float-label">
                <InputText id="year" name="year"  type="number" v-model="values.year"
                    :class="{ 'p-invalid': submitted && errors.year }"/>
                <label for="year">Ano</label>
            </div>
            <small class="p-error" v-if="submitted && !!errors.year">{{ errors.year }}</small>
        </div>
        <Button v-if="isNew" type="submit" label="CADASTRAR" />
        <Button v-if="!isNew" type="submit" label="ALTERAR" />
    </form>
</template>

<script>
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';
    import * as Yup from 'yup';
    import { createToast } from 'mosha-vue-toastify';

    import { handleErrors } from '@/public/handlers/error-handler';
    import { createAsync, getByIdAsync, updateAsync } from '@/restrict/services/class-service';

    export default {
        
        data() {
            const fields = {
                name: '',
                serie: '',
                class: '',
                year: '',
                id: ''

            };
            return { 
                values: { ...fields },
                errors: { ...fields },
                submitted: false,
                isNew: true
            };
        },        
        setup() {
            const schema = Yup.object().shape({
                name: Yup.string()
                    .required('O campo é obrigatório'),
                serie: Yup.string()
                    .required('O campo é obrigatório'),
                class: Yup.string()
                    .required('O campo é obrigatório'),
                year: Yup.string()
                    .required('O campo é obrigatório'),
            });

            return { schema };
        },
        mounted(){
            this.values.id = this.$route.params.id;
            if(this.values.id){
                this.isNew = false;
                getByIdAsync(this.values.id).then((res) => {
                    this.values.name = res.data.data.name;
                    this.values.serie = res.data.data.serie;
                    this.values.class = res.data.data.class;
                    this.values.year = res.data.data.year;
                });
            }



        },
        watch: {
            'values.name'(){ this.validate('name'); },
            'values.serie'(){ this.validate('serie'); },
            'values.class'(){ this.validate('class'); },
            'values.year'(){ this.validate('year'); },
        },
        methods: {
            save(){ 
                this.isNew ? this.create() : this.update(); 
            },
            create() {
                this.submitted = true;
                this.schema
                    .validate(this.values, { abortEarly: false })
                    .then(async () => {
                        this.errors = { };
                        try {
                            await createAsync(this.values);
                            createToast("Cadastrado", { type: 'success' })
                            setTimeout(() => this.$router.push('/mathool/list-class'), 1500);
                        } catch (error) { 
                            handleErrors(error, 'Falha ao cadastrar Classe!'); 
                        }
                    })
                    .catch(err => {
                        err.inner.forEach(error => {
                            this.errors[error.path] = error.message;
                        });
                    });
            },
            update() {
                this.submitted = true;
                this.schema
                    .validate(this.values, { abortEarly: false })
                    .then(async () => {
                        this.errors = { };
                        try {
                            await updateAsync(this.values).then((res) => {
                                console.log(res.data.data);
                            });
                            createToast("Alterado", { type: 'success' })
                            setTimeout(() => this.$router.push('/mathool/list-class'), 1500);
                        }catch (error){
                            handleErrors(error, 'Falha ao alterar Classe!'); 
                        }
                    })
                    .catch(err => {
                        err.inner.forEach(error => {
                            this.errors[error.path] = error.message;
                        });
                    });
            },
            validate(field) {
                
                this.schema
                    .validateAt(field, this.values)
                    .then(() => {
                        this.errors[field] = '';
                    })
                    .catch(err => {
                        this.errors[field] = err.message;
                    });
            },

        },
        components: { 
            Button,
            InputText
        }
    };
</script>

<style scoped>
  form {
    background-color: white;
    width: 50%;
    max-width: 800px;
  }

  @media only screen and (max-width: 640px) {
    form {
      width: 85%;
    }
  }
</style>