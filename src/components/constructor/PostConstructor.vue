<template>
    <div>Post Constructor</div>
    <div class="post-title-block">
        <div class="">Заголовок поста:</div>
        <MyInput style="margin-left: 15px; width: 80%" v-model:value="post_title"></MyInput>
    </div>
    <div class="post-desc-block">
        <div class="" style="margin-top: 15px">Краткое описание поста:</div>
        <MyTextarea style="margin-top: 5px; width: 80%" v-model:value="post_desc"></MyTextarea>
    </div>
    <div class="bricks-container">
        <div class="dropzone" :class="isDragging ? 'active' : ''" @dragenter.prevent @dragover.prevent @drop="onDropTop($event)"></div>
        <div v-for="brick in bricks">
            <div class="drag-container">
                <div class="drag-anchor" draggable="true" @dragstart="startDrag($event, brick.id)" @dragend="endDrag()" @drag="onDrag($event)">
                    <img src="../../assets/drag-vertical.svg" />
                </div>
                <ConstructorBrick :brick="brick" :key="brick.id" @onDelete="onBrickDelete" />
            </div>
            <div class="dropzone" :class="isDragging ? 'active' : ''" @dragenter.prevent @dragover.prevent @drop="onDrop($event, brick)"></div>
        </div>
    </div>
    <WhiteAnimatedButton @click="addNewBrick" class="">Add Brick</WhiteAnimatedButton>
    <button @click="dump_bricks()">dump_bricks</button>
</template>

<script>
import ConstructorBrick from "./ConstructorBrick.vue";

export default {
    data() {
        return {
            id: 0,
            bricks: [],
            post_title: "",
            post_desc: "",
            isDragging: false,
        };
    },
    methods: {
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
            //console.log("bricks = ", this.bricks);
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
    computed: {},
    components: { ConstructorBrick },
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
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
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
