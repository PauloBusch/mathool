<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>

<style scoped>
    .content {
        box-sizing: border-box;
        margin-top: var(--menu-height);
        padding: 25px var(--horizontal-space);
    }
</style>