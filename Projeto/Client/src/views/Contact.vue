<template>
    <div class="contact">
        <h2>Contato</h2>
        <form class="p-fluid">
            <div class="p-float-label">
                <InputText id="name" type="text" v-model="name"/>
                <label for="name">Nome Completo</label>
            </div>
            <div class="p-float-label">
                <InputText id="email" type="email" v-model="email"/>
                <label for="email">E-mail</label>
            </div>
            <div class="p-float-label">
                <Textarea id="message" v-model="message" rows="5" cols="30"/>
                <label for="message">Mensagem</label>
            </div>
            <Button label="ENVIAR" />
        </form>
    </div>
</template>

<script>
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';
    import Textarea from 'primevue/textarea';

    export default { 
        data() {
            return { name: '', email: '', message: '' };
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