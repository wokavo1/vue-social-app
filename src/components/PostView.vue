<template>
    <div class="post-title-block">
        <div class="">Заголовок поста:</div>
        <div>{{ post_title }}</div>
    </div>
    <!-- <div class="post-desc-block">
        <div class="" style="margin-top: 15px">Краткое описание поста:</div>
        <div>{{ post_desc }}</div>
    </div> -->
    <div class="bricks-container">
        <div v-for="brick in bricks">
            <PostBrick :brick="brick" :key="brick.id" />
        </div>
    </div>
</template>

<script>
import app_cfg from "../app_config.js";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import PostBrick from "./PostBrick.vue";

const BRICK_TYPES = ["text", "heading", "quote", "image", "video", "list", "spoiler"];
const BRICK_CODES = [8, 0, 1, 5, 4, 2, 7];
function getTypeIndexByName(name) {
    return BRICK_TYPES.findIndex((e) => {
        return e == name;
    });
}
function getTypeIndexByCode(code) {
    return BRICK_CODES.findIndex((e) => {
        return e == code;
    });
}

export default {
    props: {
        post_id: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            id: 0,
            bricks: [],
            post_title: "s",
            post_desc: "",
            isDragging: false,
        };
    },
    async mounted() {
        if (this.post_id) {
            console.log("post_id = ", this.post_id);
            // get post and parse it to bricks with flag modified set to false as default

            try {
                const res = await fetch(app_cfg.backend_url + "/posts/" + this.post_id, {
                    method: "GET",
                    cors: app_cfg.cors_mode,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const response = await res.json();
                console.log("response = ", response);
                const P = response.body.post[0];
                console.log("P = ", P);

                // parse it to bricks with flag modified set to false as default
                this.post_title = P.title;

                let tmp_bricks = [];
                for (let i = 0; i < P.body.length; i++) {
                    let tmp = {};
                    let bdy = P.body[i].content;
                    tmp.type = bdy.type;
                    tmp.data = bdy;
                    tmp.order = bdy.order;
                    if (tmp.type == "image") {
                        tmp.data.imageUrl = app_cfg.backend_url + "/storage/" + tmp.data.image_id;
                    }
                    tmp_bricks.push(tmp);
                }

                this.bricks = tmp_bricks;
            } catch (e) {
                console.error(e);
            }
        } else {
            console.log("no post id!");
        }
    },
    methods: {
        async POST() {
            let formated_data = [];
            for (let i = 0; i < this.bricks.length; i++) {
                let serialized = JSON.parse(JSON.stringify(this.bricks[i]));
                console.log(serialized);

                let tmp = {};
                tmp.data = serialized.data;
                tmp.data.order = serialized.order;

                tmp.contentType = BRICK_CODES[getTypeIndexByName(serialized.type)];

                console.log(tmp);
                formated_data.push(tmp);
            }

            try {
                const res = await fetch(app_cfg.backend_url + "/posts/upload", {
                    method: "POST",
                    cors: app_cfg.cors_mode,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + this.token,
                    },
                    body: JSON.stringify({
                        title: this.post_title,
                        type: 0,
                        format: 1,
                        body: formated_data,
                    }),
                });

                const response = await res.json();

                console.log("response = ", response);
            } catch (e) {
                console.error(e);
            }
        },
        onBrickDelete(brick) {
            this.bricks = this.bricks.filter((element) => {
                return element.id != brick.id;
            });
        },
        addNewBrick() {
            this.bricks.push({
                id: this.id,
                data: {},
                order: this.bricks.length,
                type: "text",
            });
            this.id++;
        },
        dump_bricks() {
            console.log("bricks = ", this.bricks);
        },
        onDrop(event, afterElement) {
            this.isDragging = false;
            const itemID = event.dataTransfer.getData("itemID");
            const item = this.bricks.find((item) => {
                return item.id == itemID;
            });
            //console.log("onDrop: item = ", item);
            const itemOrder = item.order;
            const indexAfter = this.bricks.indexOf(afterElement);
            const orderAfter = this.bricks[indexAfter].order;
            //console.log("itemOrder = ", itemOrder);
            //console.log("orderAfter = ", orderAfter);
            if (itemOrder < orderAfter) {
                //console.log("itemOrder < orderAfter");
                for (let i = 0; i < this.bricks.length; i++) {
                    //console.log("i = " + i + "; order = " + this.bricks[i].order);
                    if (this.bricks[i].id == itemID) {
                        this.bricks[i].order = orderAfter;
                    } else if (this.bricks[i].order >= itemOrder && this.bricks[i].order <= orderAfter) {
                        //console.log("inside");
                        if (this.bricks[i].order <= orderAfter) {
                            //console.log("order--");
                            this.bricks[i].order--;
                        } else {
                            //console.log("order++");
                            this.bricks[i].order++;
                        }
                    } else {
                    }
                }
            } else if (itemOrder > orderAfter) {
                //console.log("itemOrder > orderAfter");
                for (let i = 0; i < this.bricks.length; i++) {
                    //console.log("i = " + i + "; order = " + this.bricks[i].order);
                    if (this.bricks[i].id == itemID) {
                        this.bricks[i].order = orderAfter + 1;
                    } else if (this.bricks[i].order > orderAfter && this.bricks[i].order <= itemOrder) {
                        //console.log("inside");
                        if (this.bricks[i].order <= itemOrder) {
                            //console.log("order++");
                            this.bricks[i].order++;
                        } else {
                            //console.log("order--");
                            this.bricks[i].order--;
                        }
                    } else {
                    }
                }
            }

            this.bricks.sort((a, b) => {
                if (a.order < b.order) {
                    return -1;
                } else if (a.order > b.order) {
                    return 1;
                } else {
                    return 0;
                }
            });
        },
        onDropTop(event) {
            this.isDragging = false;
            const itemID = event.dataTransfer.getData("itemID");
            const item = this.bricks.find((item) => {
                return item.id == itemID;
            });
            //console.log("onDrop: item = ", item);
            const itemOrder = item.order;
            for (let i = 0; i < this.bricks.length; i++) {
                if (this.bricks[i].id == itemID) {
                    this.bricks[i].order = 0;
                } else {
                    if (this.bricks[i].order < itemOrder) this.bricks[i].order++;
                }
            }

            this.bricks.sort((a, b) => {
                if (a.order < b.order) {
                    return -1;
                } else if (a.order > b.order) {
                    return 1;
                } else {
                    return 0;
                }
            });
        },
        startDrag(event, itemID) {
            //console.log("item drag: ", itemID);
            event.dataTransfer.dropEffect = "move";
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("itemID", itemID);
            this.isDragging = true;
        },
        endDrag() {
            this.isDragging = false;
        },
        onDrag(e) {
            const dScrol = 65;
            if (e.clientY < 150) {
                //console.log("-" + dScrol);
                window.scroll({
                    top: window.scrollY - dScrol,
                });
            }

            if (e.clientY > $(window).height() - 150) {
                //console.log("+" + dScrol);
                window.scroll({
                    top: window.scrollY + dScrol,
                });
            }
        },
    },
    computed: {
        ...mapState({
            isAuth: (state) => state.auth.isAuth,
            token: (state) => state.auth.token,
        }),
    },
    components: { PostBrick },
};
</script>

<style scoped>
.drag-anchor {
    min-width: 10px;
    min-height: 30px;
    max-height: 50px;
}
.drag-anchor img {
    min-width: 10px;
    min-height: 30px;
    max-height: 50px;
}
.drag-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.post-title-block {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    margin-bottom: 15px;
    font-size: 50px;
    font-style: bold;
}
.post-desc-block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 15px;
}
.dropzone {
    border: 1px solid blue;
    background-color: aqua;
    border-radius: 10px;
    height: 0px;
    margin: 5px;
    opacity: 0;
    transition-duration: 200ms;
}

.dropzone.active {
    opacity: 1;
    height: 40px;
    transition-duration: 200ms;
}
</style>
