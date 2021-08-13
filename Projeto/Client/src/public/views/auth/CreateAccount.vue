<template>
    <form class="centred p-fluid card" @submit.prevent="create">
        <h2>Criar Conta</h2>
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
                <InputText id="email" name="email" type="email" v-model="values.email" 
                    :class="{ 'p-invalid': submitted && errors.email }"/>
                <label for="email">E-mail</label>
            </div>
            <small class="p-error" v-if="submitted && !!errors.email">{{ errors.email }}</small>
        </div>
        <div class="p-field">
            <div class="p-float-label">
                <SelectButton id="role" name="role" v-model="values.role" :options="roles"
                    :class="{ 'p-invalid': submitted && errors.role }"/>
            </div>
            <small class="p-error" v-if="submitted && !!errors.role">{{ errors.role }}</small>
        </div>
        <div class="p-field" v-if="values.role === student">
            <div class="p-float-label">
                <InputText id="classCode" name="classCode" type="text" v-model="values.classCode"
                    :class="{ 'p-invalid': submitted && errors.classCode }"/>
                <label for="classCode">Código de Turma</label>
            </div>
            <small class="p-error" v-if="submitted && !!errors.classCode">{{ errors.classCode }}</small>
        </div>
        <div class="p-field">
            <div class="p-float-label">
                <InputText id="password" name="password" type="password" v-model="values.password"
                    :class="{ 'p-invalid': submitted && errors.password }"/>
                <label for="password">Senha</label>
            </div>
            <small class="help-text">A senha deve conter caracteres especiais, números e letras em maiúsculo e minúsculo com no mínimo 8 caracteres</small>
            <small class="p-error" v-if="submitted && !!errors.password">{{ errors.password }}</small>
        </div>
        <div class="p-field">
            <div class="p-float-label">
                <InputText id="confirmPassword" name="confirmPassword" type="password" v-model="values.confirmPassword"
                    :class="{ 'p-invalid': submitted && errors.confirmPassword }"/>
                <label for="confirmPassword">Confirmar Senha</label>
            </div>
            <small class="p-error" v-if="submitted && !!errors.confirmPassword">{{ errors.confirmPassword }}</small>
        </div>
        <Button type="submit" label="CRIAR"/>
    </form>
</template>

<script>
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';
    import SelectButton from 'primevue/selectbutton';
    import * as Yup from 'yup';

    import { Role } from '@/shared/consts/role';
    import { handleErrors } from '@/public/handlers/error-handler';
    import { createAsync } from '@/shared/services/user-service';

    export default {
        data() {
            const fields = {
                name: '',
                email: '',
                role: '',
                classCode: '',
                password: '',
                confirmPassword: ''
            };
            return { 
                student: Role.Student,
                roles: [Role.Student, Role.Teacher],
                values: { ...fields },
                errors: { ...fields },
                submitted: false
            };
        },        
        setup() {
            const schema = Yup.object().shape({
                name: Yup.string()
                    .required('O campo é obrigatório'),
                email: Yup.string()
                    .required('O campo é obrigatório')
                    .email('O email deve ser válido'),
                role: Yup.string()
                    .required('O campo é obrigatório'),
                password: Yup.string()
                    .required('O campo é obrigatório')
                    .matches(/[0-9]/, 'A senha deve conter números')
                    .matches(/[!@#$%^&]/, 'A senha deve conter caracteres especiais')
                    .matches(/[A-Z]/, 'A senha deve conter caracteres maiúsculos')
                    .matches(/[a-z]/, 'A senha deve conter caracteres minúsculos')
                    .min(8, 'A senha deve ter pelo menos 8 caracteres'),
                confirmPassword: Yup.string()
                    .required('O campo é obrigatório')
                    .oneOf([Yup.ref('password'), null], 'As senhas devem conincidir')
            });

            return { schema };
        },
        watch: {
            'values.name'(){ this.validate('name'); },
            'values.email'(){ this.validate('email'); },
            'values.role'(){ this.validate('role'); },
            'values.password'(){ this.validate('password'); },
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
                            await createAsync(this.values);
                            this.$router.push('/login');
                        } catch (error) { 
                            handleErrors(error, 'Falha ao cadastrar usuário!'); 
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
            SelectButton
        }
    };
</script>

<style scoped>
  form {
    background-color: white;
    max-width: 400px;
  }
  .help-text {
      opacity: .8;
      display: block;
  }
</style>