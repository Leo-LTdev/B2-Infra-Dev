import { ref, onMounted, inject } from 'vue';
import type { AxiosInstance } from 'axios'

export interface Agency {
  id: number;
  name: string;
  city: string;
  address: string;
  isHeadquarter: boolean;
}

export interface User {
  id: number;
  lastname: string;
  firstname: string;
  role: string;
}

export interface ApiResponse {
  message?: string;
  error?: string;
}

export function useAssignAgency() {
  const API_URL = 'http://localhost:5000/api';

  const api = inject<AxiosInstance>('api')

  const agencies = ref<Agency[]>([]);
  const users = ref<User[]>([]);
  const agentId = ref<number | ''>('');
  const selectedAgencyId = ref<number | ''>('');
  const message = ref<string>('');
  const messageType = ref<'success' | 'error' | ''>('');
  const isLoading = ref<boolean>(false);

  const showMessage = (msg: string, type: 'success' | 'error') => {
    message.value = msg;
    messageType.value = type;
    setTimeout(() => {
      message.value = '';
    }, 5000);
  };

  const fetchAgencies = async () => {
    try {
      const response = await api.get('/agencies'); 
      
      agencies.value = response.data as Agency[];

    } catch (error) {
      console.error("Erreur de chargement :", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/user');

      users.value = response.data.users
    } catch (error) {
      console.error("erreur de chargement:", error);
      showMessage("Impossible de charger les utilisateurs", "error");
    }
  };

  const assignAgency = async () => {
    isLoading.value = true;
    message.value = '';

    try {
      if (!api) throw new Error("L'instance API n'est pas disponible.");

      const response = await api.put(`/agencies/users/${agentId.value}/agency`, {
        agencyId: Number(selectedAgencyId.value)
      });

      const data = response.data as ApiResponse;

      showMessage(`Succès : ${data.message}`, "success");
    } catch (error) {
      console.error("erreur d'assignation:", error);
      showMessage("Erreur de connexion au serveur", "error");
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchAgencies();
    fetchUsers();
  });

  return {
    agencies,
    users,
    agentId,
    selectedAgencyId,
    message,
    messageType,
    isLoading,
    assignAgency
  };
}
