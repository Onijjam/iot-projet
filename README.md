# Projet IoT - Gestion d’Imprimantes 3D

## Aperçu
Ce projet est une application basée sur React et Tailwind CSS conçue pour la gestion et la surveillance des imprimantes 3D dans un environnement IoT. Il offre une interface simple et efficace permettant d’interagir avec les imprimantes, surveiller leur statut et effectuer diverses opérations.

## Fonctionnalités
- **Liste d'Imprimantes**: Affiche une liste des imprimantes 3D disponibles avec leur statut actuel.
- **Information sur l'Imprimante**: Fournit des informations détaillées sur une imprimante sélectionnée.
- **Changement des températures**: Permet de pré-chauffé la buse ou le plateau avant une impression.
- **Lecture des fichiers sur la carte SD**: Propose directement une sélection des différents fichier d'impression mis sur l'imprimante.
- **Système de Notification**: Envoie des notifications aux utilisateurs après certaines actions.
- **Design Réactif**: Propose une mise en page réactive adaptée à divers appareils.

## Fonctionnement
1. **Page de Lancement**: L’application démarre avec le composant `App` qui initialise l'application et dirige vers la liste des imprimantes.
2. **Liste d'Imprimantes**: Le composant `PrinterList` récupère et affiche une liste d’imprimantes. Les utilisateurs peuvent sélectionner une imprimante pour voir plus de détails.
3. **Information sur l'Imprimante**: Le composant `Overlay` affiche, grâce à `Outlet` (voir [react-dom-router](https://reactrouter.com/en/main)),  `InfoPage` qui montre des informations détaillées sur l'imprimante sélectionnée, y compris son statut et les actions disponibles.
4. **Lancement d'impression**: Si l'imprimante est "Disponible", on peut venir sur le composant `LaunchPage` qui permet de choisir le fichier provenant de la carte SD et de lancer l'impression.
5. **Pause et Arrêt de l'impression** : Il est tout à fait possible de mettre en pause ou arrêter une impression à l'aide des boutons disponibles dans `InfoPage` (seulement disponible si l'imprimante a le statut "Running").


## Utilisation de DataContext
`DataContext` est utilisé pour transmettre des données à travers l'application :

- **Initialisation** : `App.jsx` initialise `DataContext` et avec `useState` fournit l'état `data` à tous les composants.
- **Utilisation** : Des composants tels que `LaunchPage` et `InfoPage` utilisent `useContext(DataContext)` pour consommer l'état `data` et les fonctions `setOpen` ainsi que `setShow`.
- **Manipulation de Données** : Le composant `App` met à jour régulièrement l'état `data` en utilisant `setData`, et ces changements sont reflétés sur tous les composants utilisant `DataContext`.

## Services
- `changeStatus.js`: Service pour mettre en pause ou stopper l'imprimante.
- `changeTemp.js`: Service pour ajuster la température de la buse et du plateau d’une imprimante.
- `fetchData.js`: Service pour récupérer les données des imprimantes.
- `fetchFiles.js`: Service pour récupérer les fichiers d'une carte SD liés à une imprimante.
- `printing.js`: Service pour lancer une impression.

## Améliorations
- **Gestion d'Erreur Améliorée**: Mettre en œuvre des mécanismes de gestion d'erreur plus sophistiqués pour mieux guider les utilisateurs.
- **Gestion d'Imprimantes Améliorée**: Ajouter des fonctionnalités pour gérer de manière plus efficace plusieurs imprimantes simultanément.
- **Authentification des Utilisateurs**: Introduire l’authentification et l’autorisation des utilisateurs pour un accès sécurisé aux imprimantes.
- **Ajout d'Imprimante**: Implementer l'ajout dynamique d'imprimante à la base de données stocké dans le backend via possiblement une interface administrateur.

## Déploiement
1. Clonez le dépôt sur votre machine locale.
2. Naviguez vers le répertoire du projet.
3. Installez les dépendances requises avec `npm install`.
4. Mettez à jour le fichier `package.json` avec la bonne adresse ip. Vous devez modifier cette ligne : ``"scripts": {
   "dev": "vite --host 10.40.208.48", ...}``, vous pouvez remplacer par un `0.0.0.0` si vous voulez déployer la solution sur toutes vos IP disponibles.
5. Modifiez les fichiers dans `services` pour mettre la bonne IP du serveur backend.
4. Démarrez l’application avec `npm run dev`.

