<template>
    <div class="contact">
        <h2>Contato</h2>
        <form class="p-fluid" @submit.prevent="sendMessage">
            <div class="p-field">
                <div class="p-float-label">
                    <InputText id="name" name="name" type="text" v-model="values.name"
                        :class="{ 'p-invalid': errors.name }"/>
                    <label for="name">Nome Completo</label>
                </div>
                <small class="p-error" v-if="!!errors.name">{{ errors.name }}</small>
            </div>
            <div class="p-field">
                <div class="p-float-label">
                    <InputText id="email" name="email" type="email" v-model="values.email" 
                        :class="{ 'p-invalid': errors.email }"/>
                    <label for="email">E-mail</label>
                </div>
                <small class="p-error" v-if="!!errors.email">{{ errors.email }}</small>
            </div>
            <div class="p-field">
                <div class="p-float-label">
                    <Textarea id="message" name="message" v-model="values.message" rows="5" cols="30"
                        :class="{ 'p-invalid': errors.message }"/>
                    <label for="message">Mensagem</label>
                </div>
                <small class="p-error" v-if="!!errors.message">{{ errors.message }}</small>
            </div>
            <Button type="submit" label="ENVIAR" />
        </form>
    </div>
</template>

<script>
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';
    import Textarea from 'primevue/textarea';
    import { createToast } from 'mosha-vue-toastify';
    import * as Yup from 'yup';

    import { sendEmailAsync } from '@/services/contact-service'; 

    export default { 
        data() {
            return { 
                values: { name: '', email: '', message: '' },
                errors: { name: '', email: '', message: '' }
            };
        },
        setup() {
            const schema = Yup.object().shape({
                name: Yup.string()
                    .required('O campo é obrigatório'),
                email: Yup.string()
                    .required('O campo é obrigatório')
                    .email('O email deve ser válido'),
                message: Yup.string()
                    .required('O campo é obrigatório')
            });

            return { schema };
        },
        watch: {
            'values.name'(){ this.validate('name'); },
            'values.email'(){ this.validate('email'); },
            'values.message'(){ this.validate('message'); }
        },
        methods: {    
            sendMessage() {
                this.schema
                    .validate(this.values, { abortEarly: false })
                    .then(async () => {
                        this.errors = { };

                        try {
                            await sendEmailAsync(this.values);
                            createToast('Mensagem enviada com sucesso', { type: 'success' });
                        } catch {
                            createToast('Falha ao enviar mensagem!', { type: 'danger' });
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
            Textarea
        }
    };
</script>

<style scoped>
    form {
        width: 40vw;
        display: block;
        margin: 0 auto;
    }

    @media only screen and (max-width: 1000px) {
        form {
            width: 100%;
        }
    }
</style>