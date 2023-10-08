<template>
    <iframe width="560" height="315" :src="embed_url"> </iframe>
</template>

<script>
//https://www.youtube.com/watch?v=POwTaVZ_CA0
//https://www.youtube.com/watch?v=8Eu3jmEUlzc&ab_channel=AJTheEngineer
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
        const videoId = getId(this.url);
        console.log("Video ID:", videoId);
        const embed_url = "//www.youtube.com/embed/" + videoId;
        this.embed_url = embed_url;
    },
};

function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
}
</script>

<style scoped></style>
