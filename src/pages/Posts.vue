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
import app_cfg from "../app_config.js";

export default {
    data() {
        return {
            posts: [],
        };
    },
    methods: {
        async applyFilters(filters) {
            console.log(filters);
            try {
                const res = await fetch(app_cfg.backend_url + "/posts?titleQuery=" + filters.searchQuery, {
                    method: "GET",
                    cors: app_cfg.cors_mode,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const response = await res.json();

                console.log("response = ", response);

                this.posts = response.body.posts.map((p) => {
                    return {
                        id: p._id,
                        title: p.title,
                        description: "NOT_IMPLEMENTED",
                        img: "https://thecsrjournal.in/wp-content/uploads/2018/10/speed-post.png",
                        karma: p.karmaCounter,
                    };
                });
            } catch (e) {
                console.error(e);
            }
        },
        async getPosts() {
            try {
                const res = await fetch(app_cfg.backend_url + "/posts", {
                    method: "GET",
                    cors: app_cfg.cors_mode,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const response = await res.json();

                console.log("response = ", response);

                this.posts = response.body.posts.map((p) => {
                    return {
                        id: p._id,
                        title: p.title,
                        description: "NOT_IMPLEMENTED",
                        img: "https://thecsrjournal.in/wp-content/uploads/2018/10/speed-post.png",
                        karma: p.karmaCounter,
                    };
                });
            } catch (e) {
                console.error(e);
            }
        },
    },
    components: { PostCard, PostFilters },
    async mounted() {
        await this.getPosts();
    },
};
</script>

<style scoped></style>
