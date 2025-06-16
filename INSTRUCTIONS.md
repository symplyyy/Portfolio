# Instructions pour finaliser l'installation de FluidGlass

Pour que le composant FluidGlass fonctionne correctement, vous devez :

1. Ajouter les fichiers 3D suivants dans le dossier `public/assets/3d/` :
   - `bar.glb` - Un modèle 3D d'une barre horizontale pour la navigation
   - `lens.glb` - Un modèle 3D d'une lentille (optionnel, pour le mode lens)
   - `cube.glb` - Un modèle 3D d'un cube (optionnel, pour le mode cube)

2. Ajouter la police dans le dossier `public/assets/fonts/` :
   - `figtreeblack.ttf` - La police Figtree Black

Vous pouvez obtenir ces fichiers :
- Pour les modèles 3D : Créez-les dans Blender ou un autre logiciel 3D, ou téléchargez-les depuis un site de modèles 3D
- Pour la police : Téléchargez Figtree Black depuis Google Fonts

En attendant d'avoir ces fichiers, le composant FluidGlass ne fonctionnera pas correctement. Vous pouvez temporairement revenir à l'ancienne navigation en commentant le code FluidGlass dans Navbar.tsx. 