<template>
    <div class="container">
        <PostConstructor :edit="$route.params.id" />
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
    async mounted() {},
};
</script>

<style scoped></style>
