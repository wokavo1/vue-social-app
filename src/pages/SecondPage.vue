<template>
    <div class="flex-container">
        <h1 class="flex-container-item">Second page</h1>
        <WhiteAnimatedButton @click="rand" class="flex-container-item">Get random integer</WhiteAnimatedButton>
        <div class="flex-container-item">Your random integer (1-100): {{ rndnum }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rndnum: 0,
        };
    },
    methods: {
        rand() {
            this.rndnum = Math.floor(Math.random() * 100);
        },
    },
};
</script>

<style scoped>
.flex-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.flex-container-item {
    margin-top: 15px;
}
</style>
