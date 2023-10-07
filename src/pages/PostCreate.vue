<template>
    <div class="container">
        <div>Post Constructor</div>
        <div class="post-title-block">
            <div class="">Заголовок поста:</div>
            <MyInput style="margin-left: 15px; width: 80%" v-model:value="post_title"></MyInput>
        </div>
        <div class="post-desc-block">
            <div class="" style="margin-top: 15px">Краткое описание поста:</div>
            <MyTextarea style="margin-top: 5px; width: 80%" v-model:value="post_desc"></MyTextarea>
        </div>
        <PostConstructor />
    </div>
</template>

<script>
import PostConstructor from "../components/constructor/PostConstructor.vue";

export default {
    data() {
        return {};
    },
    methods: {},
    computed: {},
    components: { PostConstructor },
};
</script>

<style scoped>
.post-title-block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}
.post-desc-block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 15px;
}
</style>
