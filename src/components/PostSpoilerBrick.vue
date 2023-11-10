<template>
    <div class="brick-container">
        <div class="data">
            <!-- TEXT -->
            <div v-if="brick.type == 'text'">
                <div class="text">{{ brick.data.text }}</div>
            </div>
            <!-- HEADING -->
            <div v-else-if="brick.type == 'heading'">
                <div class="heading">{{ brick.data.heading }}</div>
            </div>
            <!-- QUOTE -->
            <div v-else-if="brick.type == 'quote'" class="d-flex flex-row justify-content-center">
                <div class="quote">"{{ brick.data.quote }}"</div>
                <div class="author">- {{ brick.data.author }}</div>
            </div>
            <!-- IMAGE -->
            <div v-else-if="brick.type == 'image'" class="row">
                <div class="col-12 d-flex flex-row justify-content-center">
                    <div class="d-flex flex-column justify-content-center align-items-center">
                        <img :src="brick.data.imageUrl" />
                        <div class="caption">{{ brick.data.caption }}</div>
                    </div>
                </div>
            </div>
            <div v-else-if="brick.type == 'image'">
                <img :src="brick.data.imageUrl" />
                <div class="caption">{{ brick.data.caption }}</div>
            </div>
            <!-- VIDEO -->
            <div v-else-if="brick.type == 'video'" class="brick-video">
                <YTFrame :url="brick.data.video" style="align-self: center; margin: 15px 0px"></YTFrame>
            </div>
            <!-- LIST -->
            <div v-else-if="brick.type == 'list'" class="brick-list">
                <div v-for="(item, i) in brick.data.list" style="margin-bottom: 5px" class="d-flex flex-row justify-content-start">
                    <div v-if="brick.data.list[i].listType == 'dots'">dot.</div>
                    <div v-else>{{ i + 1 }}.</div>
                    {{ brick.data.list[i] }}
                </div>
            </div>
            <!-- NONE -->
            <div v-else>choose a brick type</div>
        </div>
    </div>
</template>

<script>
import YTFrame from "./constructor/YTFrame.vue";
const BRICK_TYPES = ["text", "heading", "quote", "image", "video", "list", "spoiler"];
const BRICK_CODES = [8, 0, 1, 5, 4, 2, 7];
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
            isHidden: true,
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
            //console.log("OnYoutubeVideoTryClick");
            if (this.brick.data.video == "") {
                //console.log("empty");
                this.brickError = "";
                this.brick.data.valid = false;
                return;
            }
            if (this.brick.data.video && matchYoutubeUrl(this.brick.data.video)) {
                // let tmp = this.brick.data.video;
                // this.brick.data.video = "";
                // this.brick.data.video = tmp;
                //console.log("valid");
                this.brickError = "";
                this.brick.data.valid = false;
                await this.$nextTick();
                this.brick.data.valid = true;
            } else {
                //console.log("invalid");
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
        //console.log(this.brick);
        this.selectedType = this.brick.type;
        //console.log("selected type = ", this.selectedType);
        //if (this.selectedType == null || this.selectedType == undefined || this.selectedType == "") this.selectedType = "text";
    },
    watch: {
        selectedType(new_val, old_val) {
            //console.log("watch : selectedType : new_val = " + new_val + "; old_val = " + old_val + "; this.brick.type = " + this.brick.type + ";");
            let dragflag = false;
            if (this.brick.type == new_val) dragflag = true;
            if (new_val != old_val) {
                this.brick.type = new_val;
                // this.brick.data = {};
                this.brickError = "";

                if (!dragflag) {
                    if (new_val == "spoiler") {
                        //console.log("selectedType: spoiler!");
                        this.brick.data.bricks = [];
                    } else if (new_val == "list") {
                        //console.log("selectedType: list!");
                        this.brick.data.listType = "dots";
                        this.brick.data.list = [];
                    }
                }
            }
        },
    },
    components: { YTFrame },
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
.data img {
    max-width: 100%;
    padding: 15px 0px;
    max-height: 40vh;
}
.brick-container {
    border-radius: 15px;
    padding: 10px;
    margin: 5px;
    width: 100%;
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
}
.heading {
    font-size: 25px;
    font-weight: bold;
}
.quote {
    font-style: italic;
}
.author {
    width: 100%;
}
.spoiler-toggle {
    background-color: lightgray;
    cursor: pointer;
}
.spoiler {
    background-color: lightblue;
}
</style>
