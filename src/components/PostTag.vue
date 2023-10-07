<template>
    <div
        class="tag px-1 d-flex flex-row align-items-center"
        style="margin-right: 4px; margin-top: 4px"
        :class="{ selected: isSelected, cursorPointer: !isSelected }"
    >
        <div @click="onClick">{{ tag.name }}</div>
        <CloseButtonSm v-if="isSelected" @click="onCloseClick"></CloseButtonSm>
    </div>
</template>

<script>
export default {
    emits: ["tagSelect", "selectedTagRemove"],
    props: {
        tag: {
            type: Object,
            required: true,
        },
        isSelected: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        onClick() {
            this.$emit("tagSelect", this.tag);
        },
        onCloseClick() {
            this.$emit("selectedTagRemove", this.tag);
        },
    },
};
</script>

<style scoped>
.tag {
    border-radius: 3px;
    background-color: rgb(188, 236, 252);
}
.cursorPointer {
    cursor: pointer;
}
.selected {
    background-color: wheat;
}
</style>
