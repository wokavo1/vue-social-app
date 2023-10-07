<template>
    <div class="flex-container">
        <h1 class="flex-container-item">Main page</h1>
        <WhiteAnimatedButton @click="rand" class="flex-container-item">Get random number</WhiteAnimatedButton>
        <div class="flex-container-item">Your random number: {{ rndnum }}</div>
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
            this.rndnum = Math.random();
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
