# Beldi Chic - Site E-commerce

Un site e-commerce complet pour la vente de vêtements marocains "Beldi Chic" développé en HTML, CSS et JavaScript pur, sans base de données.

## 🌟 Caractéristiques

### Fonctionnalités Principales
- **Page d'accueil** avec affichage élégant des produits
- **Système de panier** fonctionnel avec gestion des quantités
- **Commandes via WhatsApp** avec génération automatique de messages
- **Panneau d'administration** sécurisé pour gérer les produits
- **Design responsive** adapté à tous les appareils
- **Stock management** avec prévention des ventes en rupture

### Fonctionnalités Techniques
- **LocalStorage** pour la persistance des données côté client
- **Pas de base de données** requise
- **Filtres et tri** des produits par catégorie et prix
- **Animations et transitions** modernes
- **Design chic marocain** avec palette de couleurs élégante

## 🚀 Démarrage Rapide

### Installation
1. Clonez ou téléchargez les fichiers du projet
2. Placez les fichiers dans un serveur web (Apache, Nginx, ou Live Server)
3. Accédez à `index.html` dans votre navigateur

### Structure des Fichiers
```
beldichic/
├── index.html          # Page principale du site
├── admin.html          # Panneau d'administration
├── styles.css          # Styles CSS complets
├── script.js           # Logique JavaScript
└── README.md           # Documentation
```

## 👤 Accès Administration

### Identifiants par Défaut
- **Nom d'utilisateur**: `admin`
- **Mot de passe**: `beldi123`

### Fonctionnalités Admin
- Ajouter/Modifier/Supprimer des produits
- Gérer le stock
- Voir les statistiques des ventes
- Tableau de bord avec métriques

## 🛒 Fonctionnalités E-commerce

### Gestion des Produits
- Ajout de produits avec image, nom, description, prix
- Gestion des catégories (Caftan, Djellaba, Accessoires)
- Suivi du stock en temps réel
- Prévention des ventes en rupture de stock

### Panier d'Achat
- Ajout/suppression de produits
- Modification des quantités
- Calcul automatique du total
- Persistance via LocalStorage

### Commandes WhatsApp
- Génération automatique de messages de commande
- Formatage professionnel des détails
- Lien direct vers WhatsApp
- Numéro configurable

## 🎨 Design et Personnalisation

### Palette de Couleurs
- **Primaire**: `#8B4513` (Brun marron)
- **Secondaire**: `#D2691E` (Chocolat)
- **Accent**: `#FFD700` (Or)
- **Arrière-plan**: `#FFF8F0` (Crème)

### Polices
- **Titres**: Playfair Display (élégant, serif)
- **Texte**: Poppins (moderne, sans-serif)

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px, 480px
- Menu hamburger pour mobile
- Grilles adaptatives

## ⚙️ Configuration

### Numéro WhatsApp
Modifiez le numéro WhatsApp dans `script.js` (ligne ~220):
```javascript
const phoneNumber = '+212612345678'; // Remplacez par votre numéro
```

### Produits par Défaut
Les produits initiaux sont automatiquement créés au premier chargement. Vous pouvez les modifier via l'admin.

## 🔄 Personnalisation Avancée

### Ajouter de Nouvelles Catégories
1. Modifiez `script.js` pour ajouter la catégorie
2. Mettez à jour les options dans `admin.html`
3. Ajoutez les filtres correspondants dans `index.html`

### Modifier le Design
- Toutes les couleurs sont définies dans `:root` dans `styles.css`
- Les animations sont personnalisables via les keyframes
- Les breakpoints responsive sont modifiables

## 📱 Compatibilité

### Navigateurs Supportés
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Appareils
- Desktop (1920x1080 et plus)
- Tablettes (768px - 1024px)
- Mobile (320px - 768px)

## 🔧 Maintenance

### Sauvegarde des Données
Les données sont stockées dans LocalStorage du navigateur. Pour sauvegarder:
1. Ouvrez les outils de développement du navigateur
2. Allez dans Application > Local Storage
3. Exportez les données si nécessaire

### Mise à Jour
Pour mettre à jour le site:
1. Remplacez les fichiers sur le serveur
2. Les données utilisateur sont préservées (LocalStorage)
3. Les nouvelles fonctionnalités seront disponibles immédiatement

## 🚨 Sécurité

### Points d'Attention
- L'admin utilise des identifiants en dur (à modifier en production)
- Les données sont stockées côté client (LocalStorage)
- Pas de validation serveur des données

### Recommandations
- Changez les identifiants admin par défaut
- Utilisez HTTPS en production
- Considérez une validation côté serveur pour la production

## 📞 Support

### Configuration WhatsApp
Pour configurer votre numéro WhatsApp:
1. Modifiez la variable `phoneNumber` dans `script.js`
2. Testez le lien généré
3. Vérifiez la réception des messages

### Personnalisation
Pour toute personnalisation avancée:
- Modifiez les variables CSS dans `styles.css`
- Adaptez les fonctions JavaScript dans `script.js`
- Personnalisez le HTML selon vos besoins

## 📄 Licence

Ce projet est fourni tel quel pour usage personnel ou commercial. 
N'hésitez pas à le modifier selon vos besoins spécifiques.

---

**Beldi Chic** - L'élégance marocaine moderne 🌸
