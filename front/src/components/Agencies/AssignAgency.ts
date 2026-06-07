import { ref, onMounted } from 'vue';

export interface Agency {
  id: number;
  name: string;
  city: string;
  address: string;
  isHeadquarter: boolean;
}

export interface ApiResponse {
  message?: string;
  error?: string;
}

export function useAssignAgency() {
  const API_URL = 'http://localhost:5000/api';

  const agencies = ref<Agency[]>([]);
  const agentId = ref<number>(1);
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
      const response = await fetch(`${API_URL}/agencies`);
      if (!response.ok) throw new Error('Erreur réseau');
      
      agencies.value = await response.json() as Agency[];
    } catch (error) {
      console.error("erreur de chargement:", error);
      showMessage("Impossible de charger les agences", "error");
    }
  };

  const assignAgency = async () => {
    isLoading.value = true;
    message.value = '';

    try {
      const response = await fetch(`${API_URL}/agencies/users/${agentId.value}/agency`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agencyId: Number(selectedAgencyId.value) })
      });

      const data = await response.json() as ApiResponse;

      if (response.ok) {
        showMessage(`Succès : ${data.message}`, "success");
      } else {
        showMessage(`Erreur : ${data.error || data.message || 'Une erreur est survenue'}`, "error");
      }
    } catch (error) {
      console.error("erreur d'assignation:", error);
      showMessage("Erreur de connexion au serveur", "error");
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchAgencies();
  });

  return {
    agencies,
    agentId,
    selectedAgencyId,
    message,
    messageType,
    isLoading,
    assignAgency
  };
}