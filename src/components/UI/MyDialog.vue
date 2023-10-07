<template>
    <div class="dialog" v-if="show" @click="hideDialog">
        <div @click.stop class="dialog__content"> <!--click.stop вызвает stopPropagation-->
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideDialog() {
            this.$emit('update:show', false)
        }
    },
    name: 'MyDialog',
    mounted() {},
}
</script>

<style scoped>
.dialog{
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    position: fixed;
    display: flex;
}

.dialog__content {
    margin:auto;
    background: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    max-width: 70%;
    padding: 20px;
}
</style>
