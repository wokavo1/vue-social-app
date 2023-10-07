<template>
    <input :type="type" :value="value" :placeholder="placeholder" @input="updateInput" class="input" type="text" />
</template>

<script>
export default {
    name: "MyInput",
    props: {
        value: {
            type: [String, Number],
        },
        type: {
            type: String,
            default: "text",
        },
        placeholder: {
            type: String,
            default: "",
        },
    },
    methods: {
        updateInput(e) {
            this.$emit("update:value", e.target.value);
        },
    },
};
</script>

<style scoped>
.input {
    width: auto;
    border: 1px solid black;
    padding: 10px 15px;
}
</style>
