# Image node légère
FROM node:18-alpine

# Dossier de travail
WORKDIR /app

# Copie des dépendances et installation
COPY package*.json ./

# pour le hot reload du serveur
RUN npm install -g nodemon 
RUN npm install

# Code source
COPY . .

# Cmd de démarrage
CMD ["npm", "run", "dev"]