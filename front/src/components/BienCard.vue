<script setup lang="ts">

    defineProps ({
        bien : {
            type :Object,
            required: true
        }
    })
</script>

<template>
    <section class="bien-card">
        <img 
            :src="`http://localhost:5000${bien.image_url}`" 
            alt="image de maison" 
            class="bien-card_img">
        <h3 class="bien-card_price">{{ bien.price }} €</h3>
        <p class="bien-card_p" >{{bien.surface_sqm}} m²</p>
        <p class="bien-card_p" >{{bien.city}}</p>
    </section>
</template>

<style scoped>
    .bien-card{
        border: 1px, solid, black;
        border-radius: 10px;

        display: flex;
        flex-direction: column;
        gap: 5px;

        padding: 10px;
        max-width: 300px;
    }

    .bien-card_img{
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
    }
</style>