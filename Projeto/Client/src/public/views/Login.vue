<template>
    <div class="login">
        <form class="p-fluid card" @submit.prevent="login">
            <h2>Login</h2>
            <div class="p-field">
                <div class="p-float-label">
                    <InputText id="email" name="email" type="email" v-model="values.email" 
                        :class="{ 'p-invalid': submitted && errors.email }"/>
                    <label for="email">E-mail</label>
                </div>
                <small class="p-error" v-if="submitted && !!errors.email">{{ errors.email }}</small>
            </div>
            <div class="p-field">
                <div class="p-float-label">
                    <InputText id="password" name="password" type="password" v-model="values.password"
                        :class="{ 'p-invalid': submitted && errors.password }"/>
                    <label for="password">Senha</label>
                </div>
                <small class="p-error" v-if="submitted && !!errors.password">{{ errors.password }}</small>
            </div>
            <Button type="submit" label="ENTRAR" :disabled="!isValid()"/>
        </form>
    </div>
</template>

<script>
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';
    import * as Yup from 'yup';

    import { loginAsync } from '@/shared/services/auth-service';
    import { saveTokenStorage, saveUserStorage } from '@/shared/services/storage-service';
    import { handleErrors } from '@/public/handlers/error-handler';

    export default {
        data() {
            return { 
                values: { email: '', password: '' },
                errors: { email: '', password: '' },
                submitted: false
            };
        },
        setup() {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('O campo é obrigatório')
                    .email('O email deve ser válido'),
                password: Yup.string()
                    .required('O campo é obrigatório')
            });

            return { schema };
        },
        watch: {
            'values.email'(){ this.validate('email'); },
            'values.password'(){ this.validate('password'); }
        },
        methods: {
            isValid() {
                if (!this.values.email || !this.values.password) return false;
                if (this.errors.email || this.errors.password) return false;
                return true;
            },
            login() {
                this.submitted = true;
                this.schema
                    .validate(this.values, { abortEarly: false })
                    .then(async () => {
                        this.errors = { };

                        try {
                            const { data: { data } } = await loginAsync(this.values);
                            saveTokenStorage(data.token);
                            saveUserStorage({
                                id: data._id,
                                name: data.name,
                                email: data.email,
                                role: data.role,
                                classCode: data.classCode
                            });
                            this.$router.push('/mathool/restrict');
                        } catch (error) { 
                            handleErrors(error, 'Falha ao realizar login!'); 
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
            InputText,
        }
    };
</script>

<style scoped>
  form {
    background-color: white;
    max-width: 350px;
    margin-top: 30vh;
    transform: translateY(-50%);
  }
</style>
