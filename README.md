# 📚 TD-Mediatheque API

🎯 **API REST** pour la gestion d'une médiathèque, développée en **Node.js** avec **Express** et **MongoDB**.

---

## 🚀 Fonctionnalités

- 👤 **CRUD utilisateurs** — Créer, lire, mettre à jour et supprimer des utilisateurs
- 📚 **Gestion des ressources** — Livres, jeux, films avec disponibilité
- 🔁 **Système d’emprunts / retours** — Suivi des prêts et retours de ressources
- 💲 **Connexion MongoDB** — Base de données locale ou container Docker
- ✅ **Validation des données** — Validation robuste avec Zod
- 📘 **Documentation Swagger** — Interface de documentation interactive pour tester l’API
- ❗ **Gestion des erreurs** — Classe AppError centralisée avec ajout de la StackTrace
- 📋 **Logs intelligents** — Middleware de logging des requêtes HTTP
- 📊 **Analyse de code avec SonarQube** — Détection des bugs, duplications, vulnérabilités
- 🧱 **Architecture modulaire** — Organisation en couches avec pattern Repository
- 🄐 **Identifiants sécurisés** — UUID pour éviter les collisions ou devinettes
- 🗓️ **Formatage des dates en 🇫🇷** — Dates retournées en JJ-MM-AAAA côté client
- 🔁 **CI/CD & Déploiement Kubernetes** — Déploiement automatique via GitHub Actions et fichiers K8s
- 👨‍💻 **Logs avancés avec Winston** — niveaux, couleurs, fichiers et loggers dédiés injectés dans services et controllers pour un suivi précis.

---

## 🛠️ Technologies

- 🗾 **Node.js (TypeScript)** — Serveur et logique de l’API
- 🚂 **Express** — Framework web léger et rapide
- 🍃 **MongoDB + Mongoose** — Base NoSQL + ORM pour modélisation
- ✨ **Zod** — Validation typée et élégante des données
- 📈 **SonarQube** — Contrôle qualité du code (lint, vulnérabilités)
- 🐳 **Docker, dockerhub & Kubernetes** — Conteneurisation et déploiement orchestré
- 📖 **Swagger UI** — Documentation de l’API RESTful
- 👨‍💻 **Wintson** — Gestion des logs avec niveaux et formats personnalisables


---

## ⚙️ Lancer le projet en environnement de développement

```bash
git clone https://github.com/OoFlowoO34/Mediatheque-API.git
cd TD-Mediatheque
npm install
```

Créer un fichier `.env` :
```
SERVER_PORT=3000
DEVELOPMENT_SERVER_HOSTNAME=0.0.0.0
PRODUCTION_SERVER_HOSTNAME="localhost""
```

Lancer MongoDB (Docker) :
```bash
docker run -d --name mongo-db -p 27777:27017 mongo:6.0
```

Démarrer le projet en local

```bash
npm run dev
```

🔍 Swagger Docs : [http://localhost:1337/api-docs](http://localhost:1337/api-docs)

---

## ☸️ Déploiement K8s

### Installation k8s:
▶️ Sur macOS :

```bash
brew install minikube
brew install kubectl
```

▶️ Sur Windows :
Télécharger Minikube : https://minikube.sigs.k8s.io/docs/start/
Télécharger kubectl : https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/

### Démarrage:

#### 🚀 Démarre le cluster Minikube
```bash
minikube start
```

#### 🌐 Crée un tunnel pour accéder aux services LoadBalancer (ex : accès local à l’API)
```bash
minikube tunnel
```

#### 🖥️ Lance l’interface graphique (dashboard) de Kubernetes dans le navigateur
```bash
minikube dashboard
```

#### 📦 Déploie les ressources de la base de données
```bash
kubectl apply -f kubernetes-configuration/database/
```
#### 📦 Déploie les ressources de l’API
```bash
kubectl apply -f kubernetes-configuration/api/
```
🔁 Relancer les déploiements "kubectl apply" une seconde fois si les namespaces n’existaient pas encore lors du premier lancement

###  Mise en place du tunnel d’accès local
Sous Linux / macOS :
```bash
sudo nano /etc/hosts
```
Sous Windows :
Sous Linux / macOS :
```bash
C:\Windows\System32\drivers\etc\hosts
```
Ajouter la ligne suivante à la fin du fichier :
```bash
127.0.0.1 mediatheque.local
```

Démarrer le tunnel et le dashboard (si nécessaire):
```bash
kubectl tunnel
```

Pour accéder au dashboard:
```bash
kubectl dashboard
```

**Accès local à l’API** : http://mediatheque.local/api

Pour déploiement personnalisé utiliser l'image latest de l'api :
https://hub.docker.com/repository/docker/docflodev/td-mediatheque/tags

---

## 🧭 Architecture

```
TD-Mediatheque/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── schemas/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── config/
│   ├── interfaces/
│   └── app.ts
├── kubernetes-configuration/
│   ├── api/
│   └── database/
```

---

## 📬 Endpoints API

### 👥 Utilisateurs

| Méthode | URL | Description |
|--------|-----|-------------|
| POST   | /api/users | ➕ Créer |
| GET    | /api/users | 📄 Liste |
| GET    | /api/users/:id | 🔍 Détail |
| PUT    | /api/users/:id | ✏️ Modifier |
| DELETE | /api/users/:id | ❌ Supprimer |

### 📚 Ressources

| Méthode | URL | Description |
|--------|-----|-------------|
| POST   | /api/ressources | ➕ Créer |
| GET    | /api/ressources | 📄 Liste |
| GET    | /api/ressources/:id | 🔍 Détail |
| PUT    | /api/ressources/:id | ✏️ Modifier |
| DELETE | /api/ressources/:id | ❌ Supprimer |

### 🔄 Emprunts

| Méthode | URL | Description |
|--------|-----|-------------|
| POST   | /api/emprunts | ➕ Créer |
| GET    | /api/emprunts | 📄 Liste |
| GET    | /api/emprunts/:id | 🔍 Détail |
| PUT    | /api/emprunts/:id/return | ✅ Retourner |
| DELETE | /api/emprunts/:id | ❌ Supprimer |

---

## 📂 Modèles

### 👤 Utilisateur

- `userId`: UUID
- `nom`, `prenom`, `mail`, `telephone`, `nationalite`

### 📖 Ressource

- `ressourceId`: UUID
- `titre`, `type`, `auteur`, `disponible`

### 📦 Emprunt

- `empruntId`: UUID
- `utilisateurId`, `ressourceId`
- `dateEmprunt`, `dateRetour`, `retourne`
