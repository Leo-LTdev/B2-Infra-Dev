# Frontend - Application Vue 3

Application frontend moderne construite avec **Vue 3**, **TypeScript**, **Vite** et **Vue Router**.

##  Architecture

```
src/
├── components/          # Composants réutilisables
│   ├── BienCard.vue    # Carte affichant les biens
│   └── Agencies/       # Composants pour les agences
├── views/              # Pages/routes
│   ├── HomeView.vue
│   ├── LoginView.vue
│   ├── RegisterView.vue
│   ├── AddBienView.vue
│   ├── DetailView.vue
│   └── AboutView.vue
├── router/             # Configuration Vue Router
├── services/           # Services API et utilitaires
│   └── api.ts         # Client Axios configuré
├── stores/             # État global Pinia
├── assets/             # Images, styles globaux
├── App.vue            # Composant racine
└── main.ts            # Point d'entrée
```

##  Dépendances principales

### Runtime
- **Vue 3** (^3.5.32) - Framework frontend
- **Vue Router** (^5.0.7) - Routeur côté client
- **Pinia** (^3.0.4) - Gestion d'état
- **Axios** (^1.16.1) - Client HTTP

### Développement
- **Vite** (^8.0.8) - Bundler et serveur de dev ultra-rapide
- **TypeScript** (^6.0.0) - Typage statique
- **ESLint** - Linting du code
- **Oxlint** - Linting haute performance
- **Prettier** - Formatage du code
- **Vue TSC** - Vérification TypeScript

## 🔐 Authentification

L'authentification utilise des **tokens JWT**. À la mise en démarrage, le token sauvegardé dans `localStorage` est automatiquement ajouté aux headers des requêtes API :

```typescript
// main.ts
const savedToken = localStorage.getItem('userToken');
if (savedToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
}
```

## 🌐 Communication avec le backend

Les appels API sont centralisés dans `src/services/api.ts` via une instance Axios configurée.

```typescript
import api from '@/services/api'

const response = await api.get('/endpoint')
```

## 📱 Vues disponibles

| Vue | Route | Description |
|-----|-------|-------------|
| HomeView | `/` | Page d'accueil |
| LoginView | `/login` | Connexion utilisateur |
| RegisterView | `/register` | Inscription nouvel utilisateur |
| AddBienView | `/add-bien` | Ajout d'un bien immobilier |
| DetailView | `/bien/:id` | Détails d'un bien |

## 🛠️ Configuration

### TypeScript
- Configuration globale : `tsconfig.json`
- Configuration app : `tsconfig.app.json`
- Configuration build : `tsconfig.node.json`

### Build
- Configuration Vite : `vite.config.ts`

### Linting
- Configuration ESLint : `eslint.config.ts`

## 🐳 Docker

Une configuration Docker Compose est disponible pour conteneuriser l'application :

```bash
docker-compose up --build
```

Voir `docker-compose.yml` pour plus de détails.

## 📝 Conventions de code

- **TypeScript** : Tous les fichiers utilisent TypeScript
- **Format** : Code formaté avec Prettier
- **Linting** : Code validé par ESLint et Oxlint
- **Composants** : Utilisation de la syntaxe `<script setup>` de Vue 3

## 💻 Setup IDE recommandé

- **Éditeur** : [VS Code](https://code.visualstudio.com/)
- **Extension Vue** : [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (désactiver Vetur)
- **Extensions recommandées** : ESLint, Prettier, TypeScript Vue Plugin

## 🔍 Développement

### Ajouter une nouvelle page

1. Créer un nouveau fichier dans `src/views/`
2. Définir la route dans `src/router/index.ts`
3. Importer et utiliser le composant

### Ajouter un nouveau composant

1. Créer le fichier dans `src/components/`
2. Importer et utiliser dans les vues appropriées

### Ajouter une nouvelle route API

1. Créer une fonction dans `src/services/api.ts`
2. Utiliser via `api.get()`, `api.post()`, etc.

## ✨ Fonctionnalités

- ✅ Authentification JWT
- ✅ Gestion d'état centralisée avec Pinia
- ✅ Routage côté client avec Vue Router
- ✅ Communication API avec Axios
- ✅ TypeScript pour plus de sécurité au compile-time
- ✅ HMR (Hot Module Replacement) en développement
- ✅ Linting et formatage automatiques

## 📄 Licence

Ce projet fait partie de l'infrastructure B2-Infra-Dev.
