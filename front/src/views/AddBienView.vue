<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { AxiosInstance } from 'axios'


export interface Agency {
  id: number;
  name: string;
  city: string;
  address: string;
  isHeadquarter: boolean;
}

const API_URL = 'http://localhost:5000/api';

const api = inject<AxiosInstance>('api')

const router = useRouter()
  
const agencies = ref<Agency[]>([]);


const title = ref<string>('');
const description = ref<string>('');
const type = ref<string>('Residentiel');
const category = ref<string>('Maison');
const price = ref<number | typeof NaN>(NaN);
const surface = ref<number | typeof NaN>(NaN);
const rooms = ref<number | typeof NaN>(NaN);
const city = ref<string>('');
const postalCode = ref<string>('');
const agentId = ref<number | typeof NaN>(NaN);
const imageFichier = ref<File | null>(null);

const surChangementImage = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    imageFichier.value = target.files[0] 
  }
}

const ajouterAnnonce = async () => {
  if (!api || !imageFichier.value) return

  try {
 
    const formData = new FormData()
    
    formData.append('title', title.value || '')
    formData.append('description', description.value || '')
    formData.append('type', type.value)
    formData.append('category', category.value)
    formData.append('price', price.value ? String(price.value) : '')
    formData.append('surface', surface.value ? String(surface.value) : '')
    formData.append('rooms', rooms.value ? String(rooms.value) : '')
    formData.append('city', city.value || '')
    formData.append('postalCode', postalCode.value || '')
    formData.append('agentId', agentId.value ? String(agentId.value) : '')
    formData.append('image', imageFichier.value) 

    await api.post('/bien', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' 
      }
    })

    router.push('/home')
  } catch (error) {
    console.error(error)
  }
}

const fetchAgencies = async () => {
  try {
    const response = await api.get('/agencies'); 
    
    agencies.value = response.data as Agency[];

  } catch (error) {
    console.error("Erreur de chargement :", error);
  }
};

  onMounted(() => {
      fetchAgencies();
    });

</script>

<template>
  <form class="form" @submit.prevent="ajouterAnnonce">
    <input class="form-control" v-model="title" type="text" placeholder="Titre de l'annonce" required />
    <input class="form-control" v-model="description" type="text" placeholder="Description"/>
    <select class="form-control" v-model="type" required>
      <option value="Residentiel">Residentiel</option>
      <option value="Commercial">Commercial</option>
    </select>
    <select class="form-control" v-model="category" required>
      <option value="Maison">Maison</option>
      <option value="Appartement">Appartement</option>
      <option value="Bureau">Bureau</option>
      <option value="Local commercial">Local commercial</option>
    </select>
    <input class="form-control" v-model.number="price" type="number" placeholder="Prix" required />
    <input class="form-control" v-model.number="surface" type="number" placeholder="Surface" required />
    <input class="form-control" v-model.number="rooms" type="number" placeholder="Nombre de pièces" required />
    <input class="form-control" v-model="city" type="text" placeholder="Ville" required />
    <input class="form-control" v-model="postalCode" type="text" placeholder="Code postal" required maxlength="5" pattern="[0-9]{5}" />
    <select class="form-control" v-model.number="agentId" type="number" placeholder="ID de l'agent" required>
      <option v-for="agencie in agencies" :key="agencie.id" :value="agencie.id">{{ agencie.name }}</option>
    </select>
    <input class="form-control" type="file" @change="surChangementImage" accept="image/*" required />
    
    <button class="form-btn" type="submit">Créer l'annonce</button>
  </form>
</template>

<style scoped>

    .form {
    --primary-color: #3b82f6;      
    --primary-hover: #2563eb;      
    --bg-input: #f8fafc;            
    --border-color: #cbd5e1;       
    --text-color: #334155;          
    --text-placeholder: #94a3b8;    
    
    max-width: 600px;
    margin: 40px auto;
    padding: 32px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 20px; 
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    .form-control {
    width: 100%;
    padding: 12px 16px;
    font-size: 0.95rem;
    color: var(--text-color);
    background-color: var(--bg-input);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-sizing: border-box;
    transition: all 0.2s ease-in-out;
    outline: none;
    }

    .form-control:focus {
    border-color: var(--primary-color);
    background-color: #ffffff;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
    }

    .form-control::placeholder {
    color: var(--text-placeholder);
    }

    .form-control[type="file"] {
    padding: 8px 12px;
    cursor: pointer;
    background: #ffffff;
    }

    .form-control[type="file"]::file-selector-button {
    padding: 6px 12px;
    border-radius: 6px;
    border: 1px solid var(--border-color);
    background: var(--bg-input);
    color: var(--text-color);
    font-weight: 500;
    cursor: pointer;
    margin-right: 12px;
    transition: background 0.2s;
    }

    .form-control[type="file"]::file-selector-button:hover {
    background: #e2e8f0;
    }

    .form-btn {
    margin-top: 10px;
    padding: 14px;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    background-color: var(--primary-color);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
    }

    .form-btn:hover {
    background-color: var(--primary-hover);
    transform: translateY(-1px);
    box-shadow: 0 6px 12px -2px rgba(59, 130, 246, 0.3);
    }

    .form-btn:active {
    transform: translateY(1px);
    }

    @media (max-width: 640px) {
    .form {
        margin: 20px 15px;
        padding: 20px;
        border-radius: 12px;
    }
    }
</style>