# Backend API - B2 Immobilier

API Node.js pour la gestion immobilière avec authentification JWT, gestion des utilisateurs, des biens, des agences et des ventes.

## 📋 Vue d'ensemble

Le backend fournit une API REST pour :
- **Authentification** : enregistrement et connexion des utilisateurs avec JWT
- **Gestion des utilisateurs** : CRUD des profils utilisateurs
- **Gestion des biens** : création, consultation et gestion des biens immobiliers avec upload d'images
- **Gestion des agences** : création des agences et assignation des utilisateurs
- **Gestion des ventes** : enregistrement des transactions immobilières

## 🏗️ Structure du projet

```
back/
├── docker-compose.yml          # Configuration Docker Compose
├── README.md                   # Ce fichier
├── db/
│   └── init.sql               # Script d'initialisation MySQL
└── server/
    ├── Dockerfile             # Image Docker du serveur Node.js
    ├── package.json           # Dépendances et scripts
    └── src/
        ├── server.js          # Point d'entrée de l'application
        ├── config/
        │   └── db.js          # Configuration Sequelize
        ├── controllers/        # Logique métier
        ├── middlewares/        # Middlewares (authentification)
        ├── models/            # Modèles de données (Sequelize)
        ├── routes/            # Définition des routes API
        ├── uploads/           # Stockage des images téléchargées
        └── test/              # Fichiers de test API
```

## 🚀 Installation et démarrage

### Prérequis

- Docker et Docker Compose installés
- Un terminal bash ou équivalent

### Installation

1. **Clonez le repository ou naviguez vers le dossier `back/`**

   ```bash
   cd back
   ```

2. **Créez le fichier `.env`** à la racine du dossier `back/` avec les variables d'environnement :

   ```bash
   cp .env.example .env  # (ou créez le fichier manuellement)
   ```

   **Contenu du fichier `.env` :**

   ```env
   # Configuration MySQL
   MYSQL_HOST=db
   MYSQL_DATABASE=b2_immobilier
   MYSQL_ROOT_PASSWORD=root_password_change_me
   MYSQL_USER=app_user
   MYSQL_PASSWORD=app_password_change_me
   
   # Configuration JWT
   JWT_SECRET=your_secret_key_here
   
   # Configuration du serveur Node.js
   NODE_LOCAL_PORT=5000
   NODE_DOCKER_PORT=5000
   ```

   ⚠️ **Important** : Modifiez les mots de passe par défaut en production.

### Démarrage du projet

Depuis le dossier `back/`, exécutez :

```bash
docker compose up --build
```

**Cela démarre :**
- 🗄️ **Base de données MySQL** sur le port `3306`
- 🖥️ **Serveur Node.js** sur le port défini par `NODE_LOCAL_PORT` (par défaut `5000`)

L'API sera accessible sur : `http://localhost:5000`

### Arrêt du projet

```bash
docker compose down
```

## 🔌 Routes API

### 🔐 Authentification (non protégée)

| Méthode | Route | Description | Paramètres |
|---------|-------|-------------|-----------|
| `POST` | `/api/auth/register` | Créer un compte utilisateur | `{ email, password, confirmPassword, lastName, firstName }` |
| `POST` | `/api/auth/login` | Se connecter et obtenir un JWT | `{ email, password }` |

**Réponse login :**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "email": "user@example.com" }
}
```

---

### 👥 Gestion des utilisateurs (protégée)

Toutes les routes ci-après nécessitent un token JWT dans l'en-tête :
```
Authorization: Bearer <YOUR_JWT_TOKEN>
```

| Méthode | Route | Description | Paramètres |
|---------|-------|-------------|-----------|
| `GET` | `/api/user` | Récupérer tous les utilisateurs | - |
| `GET` | `/api/user/:id` | Récupérer un utilisateur par ID | - |
| `PUT` | `/api/user/:id` | Mettre à jour un utilisateur | `{ email, nom, prenom, ... }` |
| `DELETE` | `/api/user/:id` | Supprimer un utilisateur | - |

---

### 🏠 Gestion des biens immobiliers (protégée)

| Méthode | Route | Description | Paramètres |
|---------|-------|-------------|-----------|
| `POST` | `/api/bien` | Créer un bien immobilier | `FormData: { image, titre, description, prix, ... }` |
| `GET` | `/api/bien` | Récupérer tous les biens | - |
| `GET` | `/api/bien/:id` | Récupérer un bien par ID | - |

**Notes :**
- L'upload d'image utilise `multipart/form-data` avec `multer`
- Les images sont stockées dans `server/uploads/`

---

### 🏢 Gestion des agences (protégée)

| Méthode | Route | Description | Paramètres |
|---------|-------|-------------|-----------|
| `GET` | `/api/agencies` | Récupérer toutes les agences | - |
| `POST` | `/api/agencies` | Créer une nouvelle agence | `{ nom, adresse, telephone, ... }` |
| `PUT` | `/api/agencies/users/:id/agency` | Assigner un utilisateur à une agence | `{ agencyId }` |

---

### 💰 Gestion des ventes (protégée)

| Méthode | Route | Description | Paramètres |
|---------|-------|-------------|-----------|
| `POST` | `/api/sales` | Créer une vente | `{ bienId, userId, prix, dateVente, ... }` |

---

## 🔒 Sécurité

### Authentification JWT

Tous les endpoints (sauf `/api/auth/*`) sont protégés par un middleware d'authentification qui vérifie la présence et la validité du JWT.

**Comment ajouter le token dans les requêtes :**

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/user
```

**Ou en utilisant Postman/Insomnia :**
1. Aller dans l'onglet "Headers"
2. Ajouter : `Authorization: Bearer YOUR_TOKEN`

### Mots de passe

- Les mots de passe sont hashés avec `bcrypt` avant stockage
- Jamais de mots de passe en clair en réponse API

---

## 🛠️ Stack technique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| Runtime | Node.js | - |
| Framework web | Express | 4.18.2 |
| ORM | Sequelize | 6.37.8 |
| Base de données | MySQL | 8.0 |
| Authentification | JWT | 9.0.3 |
| Hash mot de passe | Bcrypt | 6.0.0 |
| Upload fichiers | Multer | 2.1.1 |
| CORS | cors | 2.8.5 |
| Variables d'env | dotenv | 16.3.1 |

---

## 📁 Fichiers importants

- **`db/init.sql`** : Initialisation de la base de données avec données de test
- **`server/src/config/db.js`** : Configuration Sequelize et connexion MySQL
- **`server/src/middlewares/authMiddleware.js`** : Vérification JWT
- **`server/src/models/`** : Définitions des tables (User, Bien, Agency, Sale, etc.)

---

## 🐛 Troubleshooting

### Erreur de connexion MySQL
Assurez-vous que le service MySQL démarre correctement :
```bash
docker compose logs db
```

### Port déjà utilisé
Si le port 5000 est occupé, changez `NODE_LOCAL_PORT` dans le fichier `.env`

### Volumes Docker
Pour nettoyer et reconstruire les volumes :
```bash
docker compose down -v
docker compose up --build
```
