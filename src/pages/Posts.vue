<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <PostFilters class="mt-5" @apply_filters="applyFilters"></PostFilters>
            </div>
            <div class="col-9">
                <div class="mt-5">
                    <PostCard class="mb-3" v-for="post in posts" :post="post"></PostCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PostCard from "../components/PostCard.vue";
import PostFilters from "../components/PostFilters.vue";

export default {
    data() {
        return {
            posts: [],
        };
    },
    methods: {
        async applyFilters(filters) {
            console.log(filters);
        },
        async getPosts() {
            this.posts = [
                {
                    id: 1,
                    title: "Пост 1",
                    description: "Описание к первому посту.",
                    img: "https://thecsrjournal.in/wp-content/uploads/2018/10/speed-post.png",
                    karma: 2,
                },
                {
                    id: 2,
                    title: "Пост 2",
                    description: "Описание ко второму посту.",
                    img: "https://thecsrjournal.in/wp-content/uploads/2018/10/speed-post.png",
                    karma: -2,
                },
                {
                    id: 3,
                    title: "Lorem, ipsum dolor.",
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint totam veniam molestiae, culpa optio excepturi autem repellat quibusdam iusto vitae?",
                    img: "https://thecsrjournal.in/wp-content/uploads/2018/10/speed-post.png",
                    karma: 10,
                },
                {
                    id: 4,
                    title: "Lorem ipsum dolor sit.",
                    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, expedita quod iure itaque voluptas quis!",
                    img: "https://thecsrjournal.in/wp-content/uploads/2018/10/speed-post.png",
                    karma: -10,
                },
            ];
        },
    },
    components: { PostCard, PostFilters },
    async mounted() {
        await this.getPosts();
    },
};
</script>

<style scoped></style>
