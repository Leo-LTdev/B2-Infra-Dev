<script setup lang="ts">

import { watchEffect } from 'vue';

    defineProps ({
        bien : {
            type :Object,
            required: true
        }
    })
</script>

<template>
    <section class="bien-card">
        <img src="" alt="image de maison" class="bien-card_img">
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
</style>