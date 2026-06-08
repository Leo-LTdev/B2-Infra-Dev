<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import type { AxiosInstance } from 'axios'

const router = useRouter()
const api = inject<AxiosInstance>('api')

const lastname = ref('')
const firstname = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const errorMessage = ref('')
const successMessage = ref('')

// Fonction d'envoi du formulaire
const handleRegister = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Les mots de passe ne correspondent pas."
    return
  }

  try {
    if (!api) throw new Error("L'instance API n'est pas injectée.")

    const response = await api.post('/auth/register', {
      lastname: lastname.value,
      firstname: firstname.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    })
    
    router.push('/login')

  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = "Une erreur est survenue lors de l'inscription."
    }
    console.error(error)
  }
}

function goToLogin(){
    router.back()
}

</script>

<template>
  <div class="register-wrapper">
    <div class="form-card">
      <h2 class="form-title">Créer un compte</h2>

      <div v-if="errorMessage" class="message error-message">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="message success-message">
        {{ successMessage }}
      </div>

      <form @submit.prevent="handleRegister" class="register-form">
        
        <div class="form-field">
          <label for="lastname">Nom</label>
          <input 
            id="lastname"
            v-model="lastname" 
            type="text" 
            placeholder="Votre nom" 
            required 
          />
        </div>

        <div class="form-field">
          <label for="firstname">Prénom</label>
          <input 
            id="firstname"
            v-model="firstname" 
            type="text" 
            placeholder="Votre prénom" 
            required 
          />
        </div>

        <div class="form-field">
          <label for="email">Adresse email</label>
          <input 
            id="email"
            v-model="email" 
            type="email" 
            placeholder="exemple@mail.com" 
            required 
          />
        </div>

        <div class="form-field">
          <label for="password">Mot de passe</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="********" 
            required 
          />
        </div>

        <div class="form-field">
          <label for="confirmPassword">Confirmer le mot de passe</label>
          <input 
            id="confirmPassword"
            v-model="confirmPassword" 
            type="password" 
            placeholder="********" 
            required 
          />
        </div>
        <span class="form_link" @click="goToLogin()" >Se connecter</span>

        <button type="submit" class="submit-btn">S'inscrire</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Conteneur principal pour centrer le formulaire sur l'écran */
.register-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 1rem;
  font-family: sans-serif;
}

/* La carte du formulaire */
.form-card {
  width: 100%;
  max-width: 450px;
  background-color: #ffffff;
  padding: 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.form-title {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #1a202c;
  font-size: 1.75rem;
  text-align: center;
}

.form_link{
    color: blue;
    text-decoration: underline;
    cursor: pointer;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-field label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #4a5568;
}

.form-field input {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-field input:focus {
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.submit-btn {
  margin-top: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #3182ce;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-btn:hover {
  background-color: #2b6cb0;
}

.submit-btn:active {
  background-color: #2c5282;
}

.message {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
  font-weight: 500;
}

.error-message {
  background-color: #fff5f5;
  color: #c53030;
  border: 1px solid #feb2b2;
}

.success-message {
  background-color: #f0fff4;
  color: #2f855a;
  border: 1px solid #9ae6b4;
}
</style>