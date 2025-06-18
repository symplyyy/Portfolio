# Portfolio - Timéo Soëte

Portfolio personnel développé avec Next.js, présentant mes compétences et projets en développement web.

## 🚀 Démarrage rapide

### Prérequis
- Node.js (version 22 ou supérieure)
- npm ou yarn

### Installation

1. **Clonez le projet**
   ```bash
   git clone [URL_DU_REPO]
   cd Portfolio
   ```

2. **Installez les dépendances**
   ```bash
   npm install
   ```

3. **Lancez le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrez votre navigateur**
   Rendez-vous sur [http://localhost:3000](http://localhost:3000)

## 📦 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile le projet pour la production
- `npm run start` - Lance le serveur de production
- `npm run lint` - Vérifie la qualité du code

## 🛠️ Technologies utilisées

### Frontend
- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **TailwindCSS 4** - Framework CSS
- **Framer Motion** - Animations
- **GSAP** - Animations avancées

### 3D & Animations
- **Three.js** - Rendu 3D
- **React Three Fiber** - Three.js pour React
- **React Three Drei** - Helpers pour Three.js
- **Lenis** - Smooth scroll

### UI/UX
- **Material-UI** - Composants
- **Lucide React** - Icônes
- **HTML2Canvas** - Capture d'écran

## 📁 Structure du projet

```
Portfolio/
├── components/           # Composants réutilisables
│   ├── magicui/         # Composants d'animation
│   └── ui/              # Composants d'interface
├── hooks/               # Hooks personnalisés
├── lib/                 # Utilitaires
├── pages/               # Pages Next.js
├── public/              # Assets statiques
│   ├── images/          # Images du portfolio
│   ├── assets/          # Modèles 3D
│   └── fonts/           # Polices personnalisées
└── styles/              # Styles globaux
```

## 🎨 Personnalisation

### Modifier le contenu
1. **Informations personnelles** : Editez `pages/index.tsx`
2. **Projets** : Modifiez le tableau `projects` dans `pages/index.tsx`
3. **Images** : Remplacez les fichiers dans `public/images/`

### Changer les couleurs
Les couleurs principales sont définies dans `tailwind.config.js` et peuvent être modifiées selon vos préférences.

### Ajouter des sections
Créez de nouveaux composants dans le dossier `components/` et importez-les dans `pages/index.tsx`.

## 🌐 Déploiement

### Vercel (recommandé)
1. Connectez votre repo GitHub à Vercel
2. Le déploiement se fait automatiquement

### Serveur personnel
```bash
npm run build
npm run start
```

## 🖼️ Assets requis

Assurez-vous d'avoir ces éléments dans `public/images/` :
- `avatar.png` - Photo de profil
- `logo_portfolio.png` - Logo principal
- `header/background.png` - Image de fond
- `projects/mockups/` - Captures d'écran des projets

## ⚡ Optimisations

### Performance
- Images optimisées avec Next.js Image
- Lazy loading des composants
- Animations hardware-accelerated

---

Développé par Timéo Soëte
