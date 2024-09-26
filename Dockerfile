# Étape 1 : Utiliser une image Node.js pour la compilation
FROM node:18 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les fichiers sources de l'application dans le répertoire de travail
COPY . .

# Construire l'application Angular
RUN npm run build --prod

# Étape 2 : Utiliser une image NGINX pour servir l'application
FROM nginx:alpine

# Copier les fichiers construits dans le répertoire NGINX par défaut
COPY --from=build /app/dist/medhead-front /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]