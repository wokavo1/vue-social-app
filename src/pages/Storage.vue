<template>
     <div class="container">
         <div class="row">
             <div class="col-9">
                 <div class="mt-5">
                     <ImageCard class="mb-3" v-for="post in posts" :post="post"></ImageCard>
                 </div>
             </div>
         </div>
     </div>
 </template>
 
 <script>
 import ImageCard from "../components/ImageCard.vue";
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
                 const res = await fetch(app_cfg.backend_url + "/storage", {
                     method: "GET",
                     cors: app_cfg.cors_mode,
                     headers: {
                         "Content-Type": "application/json",
                     },
                 });
 
                 const response = await res.json();
 
                 console.log("fetched images: ", response);
 
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
                 const res = await fetch(app_cfg.backend_url + "/storage", {
                     method: "GET",
                     cors: app_cfg.cors_mode,
                     headers: {
                         "Content-Type": "application/json",
                     },
                 });
 
                 const response = await res.json();
 
 
                 this.posts = response.imageCards.map((element) => {
                     return {
                         id: element.id,
                         title: element.originalName,
                         description: element.description,
                         img: app_cfg.backend_url + "/storage/" + element.id,
                         karma: 0,
                     };
                 });
             } catch (e) {
                 console.error(e);
             }
         },
     },
     components: { ImageCard, PostFilters },
     async mounted() {
         await this.getPosts();
     },
 };
 </script>
 
 <style scoped></style>
 