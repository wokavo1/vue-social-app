<template>
    <button class="gray-animated-button">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "GrayAnimatedButton",
};
</script>

<style scoped>
.gray-animated-button {
    padding: 10px 15px;
    color: black;
    border: 1px solid gray;
    background-color: white;
}

.gray-animated-button:hover {
    transition-duration: 500ms;
    background-color: gray;
    color: white;
    border: 1px solid white;
}
</style>
