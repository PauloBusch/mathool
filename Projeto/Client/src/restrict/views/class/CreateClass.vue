<template>
    <form class="centred p-fluid card" @submit.prevent="create">
        <h2>Cadastrar Classe</h2>
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
                <InputText id="code" name="code" type="text" v-model="values.code"
                    :class="{ 'p-invalid': submitted && errors.code }"/>
                <label for="code">Código de Turma</label>
            </div>
            <small class="p-error" v-if="submitted && !!errors.code">{{ errors.code }}</small>
        </div>
        <Button type="submit" label="CADASTRAR"/>
    </form>
</template>

<script>
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';
    import * as Yup from 'yup';
    import { createToast } from 'mosha-vue-toastify';

    import { handleErrors } from '@/public/handlers/error-handler';
    import { createAsync } from '@/restrict/services/class-service';
    import { getUserStorage } from  '@/shared/services/storage-service';

    export default {
        
        data() {
            const USER = getUserStorage();
            const fields = {
                name: '',
                serie: '',
                class: '',
                code: '',
                professor_id: USER.id
            };
            return { 
                values: { ...fields },
                errors: { ...fields },
                submitted: false
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
                code: Yup.string()
                    .required('O campo é obrigatório'),
            });

            return { schema };
        },
        watch: {
            'values.name'(){ this.validate('name'); },
            'values.serie'(){ this.validate('serie'); },
            'values.class'(){ this.validate('class'); },
            'values.classCode'(){ this.validate('class'); },
        },
        methods: {
            create() {
                
                this.submitted = true;
                this.schema
                    .validate(this.values, { abortEarly: false })
                    .then(async () => {
                        this.errors = { };
                        try {
                            await createAsync(this.values);
                            createToast("Cadastrado", { type: 'success' })
                            setTimeout(() => this.$router.push('/'), 1500);
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
    max-width: 400px;
  }
</style>