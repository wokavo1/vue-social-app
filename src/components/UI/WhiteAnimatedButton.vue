<template>
    <button class="white-animated-button">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "WhiteAnimatedButton",
};
</script>

<style scoped>
.white-animated-button {
    padding: 10px 15px;
    color: black;
    border: 1px solid black;
    background-color: white;
}

.white-animated-button:hover {
    transition-duration: 500ms;
    background-color: black;
    color: white;
    border: 1px solid white;
}
</style>
