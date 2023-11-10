<template>
    <div class="row d-flex align-items-center flex-column post-filters">
        <div class="col-12 d-flex flex-column">
            <div class="mb-2">Название / Описание:</div>
            <div class="">
                <MyInputSm v-model:value="filters.searchQuery" style="width: 100%"></MyInputSm>
            </div>
        </div>
        <div class="col-12 d-flex flex-column mt-3">
            <div class="mb-2">Теги:</div>
            <div class="" style="margin-bottom: 10px">
                <MyInputSm @input="searchTags" v-model:value="tagsSearchQuery" style="width: 100%"></MyInputSm>
            </div>
            <!--SELECTED TAGS-->
            <div class="d-flex" style="flex-wrap: wrap">
                <PostTag v-for="tag in filters.selectedTags" :tag="tag" :isSelected="true" @selectedTagRemove="onSelectedTagRemove"></PostTag>
            </div>
            <!--SEARCHED TAGS-->
            <div class="d-flex" style="flex-wrap: wrap; margin-top: 10px">
                <PostTag v-for="tag in searchedTags" :tag="tag" :isSelected="false" @tagSelect="onTagSelect"></PostTag>
            </div>
        </div>
        <WhiteAnimatedButton class="justify-self-end align-self-center" style="margin: 12px; width: auto" @click="applyFilters"
            >Поиск</WhiteAnimatedButton
        >
    </div>
</template>

<script>
import PostTag from "./PostTag.vue";
import app_cfg from "../app_config.js";

export default {
    emits: ["apply_filters"],
    data() {
        return {
            filters: {
                searchQuery: "",
                selectedTags: [],
            },
            tagsSearchQuery: "",
            searchedTags: [],
        };
    },
    methods: {
        applyFilters() {
            this.$emit("apply_filters", this.filters);
        },
        async searchTags() {
            try {
                const res = await fetch(app_cfg.backend_url + "/tags?name=" + this.tagsSearchQuery, {
                    method: "GET",
                    cors: app_cfg.cors_mode,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const response = await res.json();

                console.log("response = ", response);

                this.searchedTags = response.body.tags.map((t) => {
                    return {
                        id: t._id,
                        name: t.name,
                    };
                });
            } catch (e) {
                console.error(e);
            }
        },
        onTagSelect(tag) {
            let alreadyAdded = false;
            this.filters.selectedTags.forEach((element) => {
                if (tag.id == element.id) {
                    alreadyAdded = true;
                }
            });
            if (!alreadyAdded) {
                this.filters.selectedTags.push(tag);
            }
        },
        onSelectedTagRemove(tag) {
            this.filters.selectedTags = this.filters.selectedTags.filter((element) => {
                return element.id != tag.id;
            });
        },
    },
    mounted() {
        this.searchTags();
    },
    components: { PostTag },
};
</script>

<style scoped>
.post-filters {
    background-color: white;
    box-shadow: 0px 0px 3px 2px lightgray;
    padding: 15px;
}
</style>
