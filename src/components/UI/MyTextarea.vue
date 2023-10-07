<template>
    <textarea :type="type" :value="value" :rows="rows" :placeholder="placeholder" @input="updateInput" class="input"></textarea>
</template>

<script>
export default {
    name: "MyTextarea",
    props: {
        value: {
            type: [String, Number],
        },
        type: {
            type: String,
            default: "text",
        },
        rows: {
            type: String,
            default: "4",
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
    width: 100%;
    border: 3px solid lightgray;
    padding: 10px 15px;
}
</style>
