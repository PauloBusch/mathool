<template>
    <form class="centred p-fluid card" @submit.prevent="create">
        <h2>Recuperar Conta</h2>
        <div class="p-field">
            <div class="p-float-label">
                <InputText id="email" name="email" type="email" v-model="values.email" 
                    :class="{ 'p-invalid': submitted && errors.email }"/>
                <label for="email">E-mail</label>
            </div>
            <small class="p-error" v-if="submitted && !!errors.email">{{ errors.email }}</small>
        </div>
        <Button type="submit" label="RECUPERAR"/>
    </form>
</template>

<script>
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';
    import * as Yup from 'yup';

    import { createToast } from 'mosha-vue-toastify';
    import { handleErrors } from '@/public/handlers/error-handler';
    import { forgotPasswordAsync } from '@/shared/services/auth-service';

    export default {
        data() {
            return { 
                values: { email: '' , baseUrl: `${window.location.origin}/#/change-password` },
                errors: { email: '' },
                submitted: false
            };
        },        
        setup() {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('O campo é obrigatório')
                    .email('O email deve ser válido')
            });

            return { schema };
        },
        watch: {
            'values.email'(){ this.validate('email'); }
        },
        methods: {
            create() {
                this.submitted = true;
                this.schema
                    .validate(this.values, { abortEarly: false })
                    .then(async () => {
                        this.errors = { };

                        try {
                            await forgotPasswordAsync(this.values);
                            createToast('Um email de recuperação foi enviado', { type: 'success' });
                            this.$router.push('/login');
                        } catch (error) { 
                            handleErrors(error, 'Falha ao enviar email de recuperação!'); 
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