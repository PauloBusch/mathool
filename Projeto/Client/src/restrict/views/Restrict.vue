<template>
    <div>
        <h1>Bem vindo {{user.role}}</h1>
        <h3>This is restrict page</h3>

    </div>
</template>

<script>
    import { getUserStorage } from '@/shared/services/storage-service';
export default {
    data(){
        const user = getUserStorage();
        return{
            user
        }
    }
}
</script>