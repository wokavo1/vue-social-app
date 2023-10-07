<template>
    <iframe width="420" height="315" :src="embed_url"> </iframe>
</template>

<script>
export default {
    props: {
        url: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            embed_url: "",
        };
    },
    mounted() {
        console.log(this.url);
        this.embed_url = this.url.replace("/watch?v=", "/embed/");
    },
};
</script>

<style scoped></style>
