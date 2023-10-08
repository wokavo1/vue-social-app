<template>
    <div class="brick-container">
        <div class="head d-flex flex-row w-100 justify-content-between align-items-center">
            <div class="props-group">
                <div class="props-group-item">brick#{{ this.brick.id }}</div>
                <div class="props-group-item"><MySelect v-model:value="selectedType" :options="BRICK_TYPES"></MySelect></div>
            </div>
            <div class="btns-group">
                <button @click="onDelete">Delete</button>
            </div>
        </div>
        <div class="data">
            <!-- TEXT -->
            <div v-if="selectedType == 'text'">
                <MyTextarea class="text" v-model:value="brick.data.text" placeholder="text"></MyTextarea>
            </div>
            <!-- HEADING -->
            <div v-else-if="selectedType == 'heading'">
                <MyInput class="heading" style="width: 100%" v-model:value="brick.data.heading" placeholder="heading"></MyInput>
            </div>
            <!-- QUOTE -->
            <div v-else-if="selectedType == 'quote'">
                <MyTextarea class="quote" v-model:value="brick.data.quote" placeholder="quote"></MyTextarea>
                <MyInput class="author" v-model:value="brick.data.author" placeholder="author"></MyInput>
            </div>
            <!-- IMAGE -->
            <div v-else-if="selectedType == 'image'" class="row">
                <div :class="{ 'col-3': brick.data.image, 'col-12': !brick.data.image }" style="padding: 15px 0px">
                    <MyFileSelector style="width: 100%" v-model:value="brick.data.image" @fileUrl="onImageUrl" accept="image/*"></MyFileSelector>
                </div>
                <div v-if="brick.data.image" class="col-9 image-preview">
                    <img :src="brick.data.imageUrl" />
                    <MyInputSm class="caption" v-model:value="brick.data.caption" placeholder="caption"></MyInputSm>
                </div>
            </div>
            <!-- VIDEO -->
            <div v-else-if="selectedType == 'video'" class="brick-video">
                <div v-if="brickError != ''" class="error-message">{{ brickError }}</div>
                <MyInput v-model:value="brick.data.video" placeholder="enter a youtube video link"></MyInput>
                <YTFrame
                    v-model:url="brick.data.video"
                    v-if="brick.data.valid == true"
                    :url="brick.data.video"
                    style="align-self: center; margin: 15px 0px"
                ></YTFrame>
                <WhiteAnimatedButton @click="OnYoutubeVideoTryClick">Try</WhiteAnimatedButton>
            </div>
            <!-- LIST -->
            <div v-else-if="selectedType == 'list'" class="brick-list">
                <MyInput v-for="(item, i) in brick.data.list" style="margin-bottom: 5px" v-model:value="brick.data.list[i]"></MyInput>
                <div>
                    <MySelect v-model:value="brick.data.listType" :options="LIST_TYPES"></MySelect>
                    <WhiteAnimatedButton @click="addListItem">Add List Item</WhiteAnimatedButton>
                </div>
            </div>
            <!-- SPOILER -->
            <div v-else-if="selectedType == 'spoiler'">
                <SpoilerConstructorBrick
                    v-for="_brick in brick.data.bricks"
                    :brick="_brick"
                    @onDelete="onSpoilerBrickDelete"
                ></SpoilerConstructorBrick>
                <WhiteAnimatedButton @click="spoilerAddNewBrick" class="">Add Brick</WhiteAnimatedButton>
            </div>
            <!-- NONE -->
            <div v-else>choose a brick type</div>
            <button @click="dump()">dump</button>
        </div>
    </div>
</template>

<script>
import SpoilerConstructorBrick from "./SpoilerConstructorBrick.vue";
import YTFrame from "./YTFrame.vue";
const BRICK_TYPES = ["text", "heading", "quote", "image", "video", "list", "spoiler"];
const LIST_TYPES = ["dots", "numbers"];

export default {
    emits: ["onDelete"],
    props: {
        brick: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            selectedType: "",
            BRICK_TYPES: BRICK_TYPES,
            LIST_TYPES: LIST_TYPES,
            brickError: "",
            id: 0,
        };
    },
    methods: {
        onDelete() {
            this.$emit("onDelete", this.brick);
        },
        dump() {
            console.log("brick #" + this.brick.id + " = ", this.brick);
        },
        onImageUrl(url) {
            this.brick.data.imageUrl = url;
        },
        async OnYoutubeVideoTryClick() {
            console.log("OnYoutubeVideoTryClick");
            if (this.brick.data.video == "") {
                console.log("empty");
                this.brickError = "";
                this.brick.data.valid = false;
                return;
            }
            if (this.brick.data.video && matchYoutubeUrl(this.brick.data.video)) {
                // let tmp = this.brick.data.video;
                // this.brick.data.video = "";
                // this.brick.data.video = tmp;
                console.log("valid");
                this.brickError = "";
                this.brick.data.valid = false;
                await this.$nextTick();
                this.brick.data.valid = true;
            } else {
                console.log("invalid");
                this.brickError = "this is not a valid youtube link";
                this.brick.data.valid = false;
            }
        },
        spoilerAddNewBrick() {
            this.brick.data.bricks.push({
                id: this.id,
                data: {},
            });
            this.id++;
        },
        onSpoilerBrickDelete(brick) {
            this.brick.data.bricks = this.brick.data.bricks.filter((element) => {
                return element.id != brick.id;
            });
        },
        addListItem() {
            this.brick.data.list.push("");
        },
    },
    computed: {},
    mounted() {
        //console.log("constructor-brick mounted");
        this.selectedType = "text";
    },
    watch: {
        selectedType(new_val, old_val) {
            if (new_val != old_val) {
                this.brick.type = new_val;
                this.brick.data = {};
                this.brickError = "";

                if (new_val == "spoiler") {
                    console.log("selectedType: spoiler!");
                    this.brick.data.bricks = [];
                } else if (new_val == "list") {
                    console.log("selectedType: list!");
                    this.brick.data.listType = "dots";
                    this.brick.data.list = [];
                }
            }
        },
    },
    components: { SpoilerConstructorBrick, YTFrame },
};

function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return url.match(p) ? true : false;
}
</script>

<style scoped>
.brick-video {
    display: flex;
    flex-direction: column;
}
.brick-list {
    display: flex;
    flex-direction: column;
}
.error-message {
    background-color: rgb(236, 155, 155);
    border: 1px solid red;
    color: red;
    padding: 5px;
    margin: 5px;
    border-radius: 5px;
}
.image-preview .caption {
    width: 100%;
    margin: 0px 15px;
}
.image-preview {
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 15px;
}
.image-preview img {
    max-width: 100%;
    padding: 15px 0px;
}
.brick-container {
    background-color: white;
    border-radius: 15px;
    padding: 10px;
    margin: 5px;
    border: 2px solid wheat;
}
.props-group {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.props-group-item {
    margin: 0px 10px;
}
.data {
    border-top: 1px solid black;
    margin-top: 5px;
    padding: 5px 10px;
}
.heading {
    font-weight: bold;
    font-size: 18px;
}
.quote {
    font-style: italic;
}
.author {
    width: 100%;
}
</style>
