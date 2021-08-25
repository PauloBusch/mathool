<template>    
    <form class="centred p-fluid card" @submit.prevent="registerAsync">
        <div v-if="!question">
            <span>Carregando...</span>
        </div>
        <div v-if="question">
            <h2>{{ question.id }}º Pergunta | Nível {{ question.level }}</h2>
            
            <p>Considere a seguinte expressão matemática: </p>
            <div class="expression">{{ question.expression }}</div>
            <p v-if="question.variables.length">Utilize estas variáveis</p>
            <div v-if="question.variables.length" class="variables">
                {{ question.variables.map(v => `${v.name}: ${v.value.toLocaleString()}`).join(', ') }}
            </div>
            
            <div class="p-field">
                <div class="p-float-label">
                    <InputText id="response" name="response" type="numeric" v-model="values.response" :disabled="question.answer"
                        :class="{ 'p-invalid': submitted && feedback.response.error, 'p-valid': submitted && feedback.response.success }"/>
                    <label for="response">Resposta</label>
                </div>
                <small class="help-text">Para valores decimais, utilize duas casas após a virgola</small>
                <small class="p-error" v-if="submitted && !!errors.response">{{ errors.response }}</small>
            </div>

            <div v-if="submitted && (feedback.response.error || feedback.response.success)" 
                class="feedback" :class="{ 'success': feedback.response.success, 'error': feedback.response.error }">
                {{ feedback.response.message }}
            </div>

            <Button type="submit" label="ENVIAR" v-if="!question.answer"/>
            <Button type="button" label="PRÓXIMA" v-if="question.answer" @click="goNextAsync()"/>
        </div>
    </form>
</template>

<script>
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';
    import * as Yup from 'yup';

    import { handleErrors } from '@/public/handlers/error-handler';
    import { getLastAsync, goNextAsync } from '@/restrict/services/question-service';
    import { createAsync } from '@/restrict/services/answer-service';

    export default {
        data() {
            return { 
                question: null,
                values: { response: '' },
                errors: { response: '' },
                feedback: { response: { error: false, success: false, message: '' } },
                submitted: false
            };
        },     
        setup() {
            const schema = Yup.object().shape({
                response: Yup.string()
                    .required('O campo é obrigatório')
            });

            return { schema };
        },
        async mounted() {
            try {
                const result = await getLastAsync();
                this.question = result.data.data;
                if (this.question.answer) {
                    const { answer } = this.question;
                    this.submitted = true;
                    this.values.response = answer.response;
                    this.feedback.response = {
                        error: !answer.rightAnswer, 
                        success: answer.rightAnswer,
                        message: answer.rightAnswer 
                            ? 'Resposta correta, continue em frente' 
                            : `Resposta errada, era esperado ${answer.expectedResult.toLocaleString()}`
                    }
                }
            } catch (error) {
                handleErrors(error, 'Falha ao carregar pergunta!'); 
            }
        },
        methods: {
            async goNextAsync() { 
                try {
                    await goNextAsync();
                    const result = await getLastAsync();
                    this.question = result.data.data;
                    this.feedback = { response: { error: false, success: false, message: '' } };
                    this.values = { response: '' };
                    this.submitted = false;
                } catch (error) {
                    handleErrors(error, 'Falha ao avançar para a próxima pergunta!'); 
                }
            },
            async registerAsync(){ 
                this.submitted = true;
                this.schema
                    .validate(this.values, { abortEarly: false })
                    .then(async () => {
                        this.errors = { };

                        try {
                            const data = { 
                                response: this.values.response.replace(/,/g, '.'), 
                                questionId: this.question.id 
                            };
                            const result = await createAsync(data);
                            const answer = result.data.data;
                            this.question.answer = answer;
                            this.feedback.response = {
                                error: !answer.rightAnswer, 
                                success: answer.rightAnswer,
                                message: answer.rightAnswer 
                                    ? 'Resposta correta, continue em frente' 
                                    : `Resposta errada, era esperado ${answer.expectedResult.toLocaleString()}`
                            }
                        } catch (error) { 
                            handleErrors(error, 'Falha ao enviar resposta!'); 
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
        watch: {
            'values.response'(){ this.validate('response'); }
        },
        components: { 
            Button,
            InputText
        }
    }
</script>

<style scoped>    
    form {
        max-width: 600px;
    }

    .help-text {
        opacity: .8;
        margin-top: 5px;
        display: block;
    }

    .p-field {
        margin-top: 20px;
    }

    .expression,
    .variables {
        font-size: 18px;
        font-weight: bold;
    }

    .feedback {
        margin-bottom: 35px;
    }

    .feedback.error {  
        color: red;
    }

    .feedback.success {  
        color: green;
    }

    .p-valid {
        border: 1px solid green;
    }
</style>