<template>
    <div class="main">
        <h2 style="align-self: center">Регистрация прошла успешно!</h2>
        <WhiteAnimatedButton @click="$router.push('/login')"> Авторизироваться </WhiteAnimatedButton>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.main {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 30%;
    margin-right: 30%;
}
</style>
