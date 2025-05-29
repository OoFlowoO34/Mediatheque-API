# TD-Mediatheque API

API REST pour la gestion d’une médiathèque, développée en Node.js avec Express et MongoDB.

---

## Fonctionnalités

- Création, lecture, mise à jour et suppression (CRUD) des utilisateurs 
- Connexion à une base MongoDB (locale ou container Docker) 
- Middleware CORS configuré selon l’environnement (dev/prod) 
- Middleware de logging des requêtes HTTP 
- API documentée avec exemples Postman fournis 

---

## Technologies utilisées

- Node.js (TypeScript) 
- Express 
- MongoDB + Mongoose 
- Docker (optionnel pour MongoDB) 
- Postman (pour tests API) 

---

## Installation

1. Cloner le dépôt :
   ```bash 
   git clone <url_du_depot> 
   cd TD-Mediatheque 

2. Installer les dépendances 
    npm install

3. Créer un fichier .env à la racine et ajouter la variable suivante : 
SERVER_PORT=1337 
SERVER_HOSTNAME="localhost"

4. (Optionnel) Lancer MongoDB dans un container Docker sur le port 27777 : 
docker run -d --name mongo-db -p 27777:27017 mongo:6.0

## Installation
npm run dev

### Appels API 
Pour faire les appels API aves des requêtes pré-construites, importer la collection "Mediatheque User API"
(TD-Mediateque-API.json)

#### users
Méthode	URL	Description	Corps (JSON) requis 
POST	/api/users	Créer un nouvel utilisateur	{ nom, prenom, mail, telephone, nationalite } 
GET	/api/users	Récupérer tous les utilisateurs	- 
GET	/api/users/:id	Récupérer un utilisateur par ID	- 
PUT	/api/users/:id	Mettre à jour un utilisateur	{ nom, prenom, mail, telephone, nationalite } 
DELETE	/api/users/:id	Supprimer un utilisateur	- 

