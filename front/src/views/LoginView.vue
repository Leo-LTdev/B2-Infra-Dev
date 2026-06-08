<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, inject } from 'vue'
import type { AxiosInstance } from 'axios'
import { error } from 'console'

const router = useRouter()

const email = ref('')          // détecté comme type 'string'
const password = ref('')       // détecté comme type 'string'
const errorMessage = ref('')   // détecté comme type 'string'
const isLoading = ref(false)   // détecté comme type 'boolean'

const api = inject<AxiosInstance>('api')

const handleLogin = async () => {
  try {

    if (!api) {
      errorMessage.value = 'API instance is not available.'
      return
    }
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    });

    const token = response.data.token;
    if (!token) { console.log("le token n'a pas été trouver"); return }
    
    localStorage.setItem('userToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    router.push('/home');


  } catch (error: any) {
    errorMessage.value = error?.response?.data?.message || 'Une erreur est survenue lors de la connexion.'
    console.error('Erreur lors de la connexion', error?.response?.data?.message)
  }
}

function goToRegister(){
  router.push('/register')
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Connexion — Ymmo</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Adresse Email</label>
          <input v-model="email" type="email" id="email" required placeholder="exemple@ymmo.fr" />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input v-model="password" type="password" id="password" required placeholder="••••••••" />
        </div>
        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
        <span @click="goToRegister()" class="login-card_link">pas de compte ?</span>
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
  /* --- Container Principal --- */
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--bg-container);
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    padding: 20px;
  }

  /* --- Carte de Connexion --- */
  .login-card {
    background: var(--bg-card);
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    width: 100%;
    max-width: 400px;
  }

  .login-card_link{
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }




  .login-card h2 {
    margin-top: 0;
    margin-bottom: 24px;
    color: var(--text-main);
    font-size: 24px;
    font-weight: 600;
    text-align: center;
  }

  /* --- Formulaire --- */
  .form-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
  }

  .form-group label {
    margin-bottom: 6px;
    color: var(--text-muted);
    font-size: 14px;
    font-weight: 500;
  }

  .form-group input {
    padding: 10px 14px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 15px;
    color: var(--text-main);
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }

  /* --- Message d'erreur --- */
  .error-text {
    color: var(--error-color);
    font-size: 14px;
    margin-top: -10px;
    margin-bottom: 15px;
    font-weight: 500;
  }

  /* --- Bouton --- */
  button {
    width: 100%;
    padding: 12px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 10px;
  }

  button:hover:not(:disabled) {
    background-color: var(--primary-hover);
  }

  /* Style quand le bouton est désactivé (isLoading) */
  button:disabled {
    background-color: var(--border-color);
    color: var(--text-muted);
    cursor: not-allowed;
    opacity: 0.7;
  }

</style>