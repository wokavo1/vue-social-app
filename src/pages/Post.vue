<template>
    <div class="container">
        <PostView :post_id="$route.params.id" />
    </div>
</template>

<script>
import PostView from "../components/PostView.vue";

export default {
    data() {
        return {};
    },
    methods: {},
    computed: {},
    components: { PostView },
};
</script>

<style scoped></style>
