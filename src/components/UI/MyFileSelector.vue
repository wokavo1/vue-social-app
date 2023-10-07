<template>
    <label class="file-select">
        <div class="select-button">
            <span v-if="value">Selected File: {{ value.name }}</span>
            <span v-else>Select File</span>
        </div>
        <input type="file" :accept="accept" @change="handleFileChange" />
    </label>
</template>

<script>
export default {
    emits: ["fileUrl"],
    name: "MyFileSelector",
    props: {
        value: {
            type: File,
            default: null,
        },
        accept: {
            type: String,
            default: "",
        },
    },

    methods: {
        handleFileChange(e) {
            //console.log("handleFileChange: e = ", e);
            this.$emit("update:value", e.target.files[0]);
            this.$emit("fileUrl", URL.createObjectURL(e.target.files[0]));
        },
    },
};
</script>

<style scoped>
.file-select > .select-button {
    padding: 1rem;

    color: white;
    background-color: rgb(100, 188, 240);
    border: 2px solid rgb(100, 188, 240);

    border-radius: 0.3rem;

    text-align: center;
    font-weight: bold;

    transition-duration: 500ms;
}
.file-select > .select-button:hover {
    color: rgb(100, 188, 240);
    background-color: white;

    transition-duration: 500ms;
}

.file-select > input[type="file"] {
    display: none;
}
</style>
