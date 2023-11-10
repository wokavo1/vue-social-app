<template>
    <div class="post-card">
        <div style="display: flex; flex-direction: row; width: 100%">
            <div class="img-cont"><img :src="post.img" class="post-image" /></div>
            <div class="desc-cont">
                <div>
                    <strong>{{ post.title }}</strong>
                </div>
                <div>
                    <text>{{ post.description }}</text>
                </div>
            </div>
        </div>
        <div class="btns-cont bg-gray">
            <div style="margin-left: 21px" :class="{ greenKarma: post.karma > 0, redKarma: post.karma < 0 }">
                {{ post.karma }}
            </div>
            <GrayAnimatedButton style="align-self: end; margin: 10px" @click="$router.push('/posts/view/' + post.id)"> Читать </GrayAnimatedButton>
        </div>
    </div>
</template>

<script>
export default {
    emits: {},
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        console.log("post = ", this.post);
    },
};
</script>

<style scoped>
.btns-cont {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.desc-cont {
    width: 70%;
}
.img-cont {
    width: 30%;
}
.post-image {
    max-width: 100%;
    max-height: 100%;
}
.post-card {
    background-color: white;
    box-shadow: 0px 0px 3px 2px lightgray;
}
.bg-gray {
    background-color: rgb(236, 234, 234);
}
.greenKarma {
    color: green;
}
.redKarma {
    color: lightcoral;
}
</style>
