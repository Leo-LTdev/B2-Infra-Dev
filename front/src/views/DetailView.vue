<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router'
  import { inject, ref, onMounted } from 'vue'
  import type { AxiosInstance } from 'axios'

  const router = useRouter()
  const route = useRoute()

  const bienId = route.params.id;

  const api = inject<AxiosInstance>('api')
  const bien = ref<any>(null)

  const getBien = async () => {
    if (!api) {throw new Error('API instance not provided via injection')}
    try {

        const response = await api.get(`/bien/${bienId}`)

        bien.value = response.data.bien
    } catch (error) {
        console.error('Erreur lors de la récupération des biens :', error)
    }
  }

  const returnToHome = () => {
    router.back();
  }

  onMounted(() => {
    getBien()
  })

</script>

<template>
    <section v-if="bien" class="detail">
        <div class="detail-container">

            <div class="detail-header">
                <h2>{{ bien.title }}</h2>
                <button @click="returnToHome()" class="detail-header_btn"> Retour </button>
            </div>
            <img 
            :src="`http://localhost:5000${bien.image_url}`"
            alt="image de maison" 
            class="detail_img">
            <div class="detail-footer">
                <h3>{{ bien.price }} €</h3>
                <h3>Type : {{ bien.type }}</h3>
                <h3>{{ bien.description }}</h3>
                <h3>Addresse : {{ bien.city }}  {{ bien.postal_code }}</h3>
                <h3>Nombres de pièce : {{ bien.rooms }}</h3>
                <h3></h3>
            </div>
            
        </div>
    </section>

</template>

<style scoped>
    .detail{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 5%;
    }

    .detail-container{
        border: 1px solid black;
        border-radius: 15px;

        display: flex;
        flex-direction: column;
    }

    .detail-header{
        padding: 1rem;
        display: flex;
        justify-content: space-between;
    }

    .detail-header_btn{
        padding: 10px ;

        background-color: red;

        border: 2px solid black;
        border-radius: 5px;
    }

    .detail_img {
        max-width: 600px;
        border-style: solid;
        border-color: black;
        border-width: 1px 0px 1px 0px;
    }

    .detail-footer{
        padding: 1rem;

        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>