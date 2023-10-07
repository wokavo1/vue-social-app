<template>
    <select class="select" v-bind:value="value" @change="optionChanged">
        <option disabled value="">Выберите из списка</option>
        <option v-for="option in options" :key="option" :value="option">
            {{ option }}
        </option>
    </select>
</template>

<script>
export default {
    name: "MySelect",
    props: {
        value: {
            type: String,
        },
        options: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        optionChanged(event) {
            this.$emit("update:value", event.target.value);
        },
    },
};
</script>

<style scoped>
.select {
    width: 100%;
    border: 1px solid black;
    padding: 10px 15px;
}
</style>
