<template>
    <div class="bricks-container">
        <ConstructorBrick v-for="brick in bricks" :brick="brick" :key="brick.id" @onDelete="onBrickDelete" />
    </div>
    <WhiteAnimatedButton @click="addNewBrick" class="">Add Brick</WhiteAnimatedButton>
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
    },
    computed: {},
    components: { ConstructorBrick },
};
</script>

<style scoped></style>
