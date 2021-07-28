<template>
    <form class="centred p-fluid card" @submit.prevent="create">
        <h2>Alteração de Senha</h2>
        <div class="p-field">
            <div class="p-float-label">
                <InputText id="newPassword" name="newPassword" type="password" v-model="values.newPassword"
                    :class="{ 'p-invalid': submitted && errors.newPassword }"/>
                <label for="newPassword">Senha</label>
            </div>
            <small class="p-error" v-if="submitted && !!errors.newPassword">{{ errors.newPassword }}</small>
        </div>
        <div class="p-field">
            <div class="p-float-label">
                <InputText id="confirmPassword" name="confirmPassword" type="password" v-model="values.confirmPassword"
                    :class="{ 'p-invalid': submitted && errors.confirmPassword }"/>
                <label for="confirmPassword">Confirmar Senha</label>
            </div>
            <small class="p-error" v-if="submitted && !!errors.confirmPassword">{{ errors.confirmPassword }}</small>
        </div>
        <Button type="submit" label="ALTERAR"/>
    </form>
</template>

<script>
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';
    import { createToast } from 'mosha-vue-toastify';
    import * as Yup from 'yup';

    import { handleErrors } from '@/public/handlers/error-handler';
    import { changePasswordAsync } from '@/shared/services/auth-service';

    export default {
        data() {
            const fields = {
                newPassword: '',
                confirmPassword: ''
            };
            return { 
                values: { ...fields, token: this.$route.query.token },
                errors: { ...fields },
                submitted: false
            };
        },        
        setup() {
            const schema = Yup.object().shape({
                newPassword: Yup.string()
                    .required('O campo é obrigatório')
                    .matches(/[0-9]/, 'A senha deve conter números')
                    .matches(/[!@#$%^&]/, 'A senha deve conter caracteres especiais')
                    .matches(/[A-Z]/, 'A senha deve conter caracteres maiúsculos')
                    .matches(/[a-z]/, 'A senha deve conter caracteres minúsculos')
                    .min(8, 'A senha deve ter pelo menos 8 caracteres'),
                confirmPassword: Yup.string()
                    .required('O campo é obrigatório')
                    .oneOf([Yup.ref('newPassword'), null], 'As senhas devem conincidir')
            });

            return { schema };
        },
        watch: {
            'values.newPassword'(){ this.validate('newPassword'); },
            'values.confirmPassword'(){ this.validate('confirmPassword'); }
        },
        methods: {
            create() {
                this.submitted = true;
                this.schema
                    .validate(this.values, { abortEarly: false })
                    .then(async () => {
                        this.errors = { };

                        try {
                            await changePasswordAsync(this.values);
                            createToast('Senha alterada com sucesso', { type: 'success' });
                            this.$router.push('/login');
                        } catch (error) { 
                            handleErrors(error, 'Falha ao alterar senha!'); 
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