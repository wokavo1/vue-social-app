<template>
    <div>Post Constructor</div>
    <div class="post-title-block">
        <div class="">Заголовок поста:</div>
        <MyInput style="margin-left: 15px; width: 80%" v-model:value="post_title"></MyInput>
    </div>
    <div class="post-desc-block">
        <div class="" style="margin-top: 15px">Краткое описание поста:</div>
        <MyTextarea style="margin-top: 5px; width: 80%" v-model:value="post_desc"></MyTextarea>
    </div>
    <div class="bricks-container">
        <ConstructorBrick v-for="brick in bricks" :brick="brick" :key="brick.id" @onDelete="onBrickDelete" />
    </div>
    <WhiteAnimatedButton @click="addNewBrick" class="">Add Brick</WhiteAnimatedButton>
    <button @click="dump_bricks()">dump_bricks</button>
</template>

<script>
import ConstructorBrick from "./ConstructorBrick.vue";

export default {
    data() {
        return {
            id: 0,
            bricks: [],
            post_title: "",
            post_desc: "",
        };
    },
    methods: {
        onBrickDelete(brick) {
            this.bricks = this.bricks.filter((element) => {
                return element.id != brick.id;
            });
        },
        addNewBrick() {
            this.bricks.push({
                id: this.id,
                data: {},
            });
            this.id++;
        },
        dump_bricks() {
            console.log("bricks = ", this.bricks);
        },
    },
    computed: {},
    components: { ConstructorBrick },
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
